const projectUrl = import.meta.env.VITE_BAG_DESIGNS_PROJECT_URL as string | undefined;
const anonKey = import.meta.env.VITE_BAG_DESIGNS_ANON_KEY as string | undefined;
const bucketId = (import.meta.env.VITE_BAG_DESIGNS_BUCKET as string | undefined) ?? 'bag-designs';
export const bagDesignPrefix = (import.meta.env.VITE_BAG_DESIGNS_PREFIX as string | undefined) ?? '';

if (!projectUrl || !anonKey) {
  console.warn('Bag designs Supabase credentials are missing. Listing will fail.');
}

interface StorageListItem {
  name: string;
  id?: string;
  updated_at?: string;
  created_at?: string;
  metadata?: {
    size?: number;
    contentLength?: number;
    lastModified?: string;
    mimetype?: string;
  };
}

export async function listBagDesignObjects(prefix = bagDesignPrefix): Promise<StorageListItem[]> {
  if (!projectUrl || !anonKey) {
    throw new Error('Bag design storage environment variables are not configured.');
  }

  const response = await fetch(
    `${projectUrl}/storage/v1/object/list/${bucketId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
      },
      body: JSON.stringify({
        prefix,
        limit: 1000,
        sortBy: { column: 'name', order: 'asc' as const },
      }),
    },
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Failed to list bag design objects: ${response.status} ${message}`);
  }

  const data = (await response.json()) as StorageListItem[];
  const normalizedPrefix = prefix ? prefix.replace(/\/?$/, '') : '';
  return data?.map((item) => ({
    ...item,
    name: normalizedPrefix ? `${normalizedPrefix}/${item.name}` : item.name,
  })) ?? [];
}

interface ThumbnailOptions {
  width?: number;
  quality?: number;
}

export function buildBagDesignThumbnailPath(path: string, { width = 420, quality = 35 }: ThumbnailOptions = {}) {
  if (!projectUrl) return '';
  const encoded = path
    .split('/')
    .filter(Boolean)
    .map(encodeURIComponent)
    .join('/');

  const params = new URLSearchParams({
    width: String(width),
    quality: String(quality),
    resize: 'contain',
  });

  return `${projectUrl}/storage/v1/render/image/public/${bucketId}/${encoded}?${params.toString()}`;
}

export function readableSize(bytes?: number) {
  if (!bytes) return 'N/A';
  const megabytes = bytes / (1024 * 1024);
  if (megabytes < 0.1) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${megabytes.toFixed(1)} MB`;
}
