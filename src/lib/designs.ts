import { designsSupabase } from "@/integrations/supabase/designsClient";

const DESIGNS_BUCKET = import.meta.env.VITE_BAG_DESIGNS_BUCKET || "designs";

export type DesignAsset = {
  id: string | null;
  name: string;
  path: string;
  publicUrl: string;
  createdAt: string | null;
  updatedAt: string | null;
  lastAccessedAt: string | null;
  size: number | null;
  mimeType: string | null;
};

type StorageObject = {
  id: string | null;
  name: string;
  created_at: string | null;
  updated_at: string | null;
  last_accessed_at: string | null;
  metadata: null | {
    size?: number | string;
    mimetype?: string;
    cacheControl?: string;
    [key: string]: unknown;
  };
};

const normalizeSize = (value: number | string | undefined): number | null => {
  if (value === undefined || value === null) {
    return null;
  }

  if (typeof value === "number") {
    return value;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const normalizeMime = (metadata: StorageObject["metadata"]): string | null => {
  if (!metadata) {
    return null;
  }

  if (typeof metadata.mimetype === "string") {
    return metadata.mimetype;
  }

  const contentType = metadata["contentType"];
  return typeof contentType === "string" ? contentType : null;
};

const getFileUrl = async (path: string): Promise<string> => {
  const { data } = designsSupabase.storage.from(DESIGNS_BUCKET).getPublicUrl(path);

  if (data?.publicUrl) {
    return data.publicUrl;
  }

  const { data: signedData } = await designsSupabase.storage
    .from(DESIGNS_BUCKET)
    .createSignedUrl(path, 60 * 60 * 24);

  return signedData?.signedUrl ?? "";
};

const listRecursive = async (path = ""): Promise<DesignAsset[]> => {
  const allAssets: DesignAsset[] = [];
  let offset = 0;
  const BATCH_SIZE = 100; // Process in batches to handle large directories

  console.log(`Fetching designs from path: "${path}"`);

  while (true) {
    console.log(`Fetching batch: offset=${offset}, limit=${BATCH_SIZE}`);

    const { data, error } = await designsSupabase.storage.from(DESIGNS_BUCKET).list(path, {
      limit: BATCH_SIZE,
      offset,
      sortBy: { column: "name", order: "asc" },
    });

    if (error) {
      console.error("Storage list error:", error);
      throw error;
    }

    console.log(`Batch response: ${data?.length || 0} items received`);

    if (!data || data.length === 0) {
      break; // No more items
    }

    const batchResults = await Promise.all(
      data.map(async (item: StorageObject) => {
        const currentPath = path ? `${path}/${item.name}` : item.name;

        // Folders return metadata as null; recurse into them
        if (!item.metadata) {
          return listRecursive(currentPath);
        }

        const publicUrl = await getFileUrl(currentPath);

        const asset: DesignAsset = {
          id: item.id,
          name: item.name,
          path: currentPath,
          publicUrl,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
          lastAccessedAt: item.last_accessed_at,
          size: normalizeSize(item.metadata.size),
          mimeType: normalizeMime(item.metadata),
        };

        return [asset];
      })
    );

    allAssets.push(...batchResults.flat());

    // If we got fewer items than the batch size, we've reached the end
    if (data.length < BATCH_SIZE) {
      break;
    }

    offset += BATCH_SIZE;
  }

  return allAssets;
};

const sortByRecency = (assets: DesignAsset[]): DesignAsset[] => {
  const toTimestamp = (asset: DesignAsset): number => {
    const candidate = asset.updatedAt ?? asset.createdAt;
    if (!candidate) {
      return 0;
    }

    const parsed = Date.parse(candidate);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  return [...assets].sort((a, b) => {
    const delta = toTimestamp(b) - toTimestamp(a);
    if (delta !== 0) {
      return delta;
    }

    return a.name.localeCompare(b.name);
  });
};

const EXCLUDED_FOLDERS = ["other"];

const isInExcludedFolder = (asset: DesignAsset): boolean => {
  const normalizedPath = asset.path.toLowerCase();
  return EXCLUDED_FOLDERS.some((folder) => {
    const lower = folder.toLowerCase();
    return normalizedPath === lower || normalizedPath.startsWith(`${lower}/`);
  });
};

export const fetchDesignAssets = async (): Promise<DesignAsset[]> => {
  try {
    console.log("Fetching design assets from bucket:", DESIGNS_BUCKET);

    const assets = await listRecursive();
    const filteredAssets = assets.filter((asset) => !isInExcludedFolder(asset));
    const sortedAssets = sortByRecency(filteredAssets);
    console.log("Successfully fetched", filteredAssets.length, "design assets");
    return sortedAssets;
  } catch (error) {
    console.error("Error fetching design assets:", error);
    throw error;
  }
};

export const isImageAsset = (asset: DesignAsset): boolean => {
  if (asset.mimeType && asset.mimeType.startsWith("image/")) {
    return true;
  }

  return /\.(png|jpe?g|gif|bmp|webp|svg)$/i.test(asset.path);
};

export const formatFileSize = (bytes: number | null): string => {
  if (!bytes) {
    return "—";
  }

  const units = ["B", "KB", "MB", "GB"];
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const size = bytes / 1024 ** exponent;
  return `${size.toFixed(size < 10 && exponent > 0 ? 1 : 0)} ${units[exponent]}`;
};
