import { useCallback } from "react";
import { useQuery, useQueryClient, type QueryClient } from "@tanstack/react-query";
import { fetchDesignAssets } from "@/lib/designs";

const DESIGN_ASSET_QUERY_KEY = ["design-assets"];
const STALE_TIME_MS = 1000 * 60 * 5; // 5 minutes
const GC_TIME_MS = 1000 * 60 * 10; // 10 minutes

export const useDesignAssets = () => {
  return useQuery({
    queryKey: DESIGN_ASSET_QUERY_KEY,
    queryFn: fetchDesignAssets,
    staleTime: STALE_TIME_MS,
    gcTime: GC_TIME_MS,
  });
};

export const prefetchDesignAssets = (client: QueryClient) => {
  return client.prefetchQuery({
    queryKey: DESIGN_ASSET_QUERY_KEY,
    queryFn: fetchDesignAssets,
    staleTime: STALE_TIME_MS,
    gcTime: GC_TIME_MS,
  });
};

export const usePrefetchDesignAssets = () => {
  const queryClient = useQueryClient();

  return useCallback(() => {
    void prefetchDesignAssets(queryClient);
  }, [queryClient]);
};
