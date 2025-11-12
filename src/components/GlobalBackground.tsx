import { useDesignAssets } from "@/hooks/useDesignAssets";
import { isImageAsset } from "@/lib/designs";
import { useEffect, useState, useMemo } from "react";

export default function GlobalBackground() {
  const { data } = useDesignAssets();
  const [currentImageIndices, setCurrentImageIndices] = useState<number[]>([]);

  const imageAssets = useMemo(
    () => data?.filter(isImageAsset) ?? [],
    [data]
  );

  // Initialize with random images for the mosaic grid (25 cells in 5x5 for full coverage)
  useEffect(() => {
    if (imageAssets.length > 0 && currentImageIndices.length === 0) {
      const randomIndices = Array.from({ length: 25 }, () =>
        Math.floor(Math.random() * imageAssets.length)
      );
      setCurrentImageIndices(randomIndices);
    }
  }, [imageAssets, currentImageIndices.length]);

  // Cycle through images - update one random cell every 1.5 seconds
  useEffect(() => {
    if (imageAssets.length === 0 || currentImageIndices.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndices(prev => {
        const newIndices = [...prev];
        const cellToUpdate = Math.floor(Math.random() * 25);
        let newImageIndex;

        // Ensure we don't repeat the same image in the same cell
        do {
          newImageIndex = Math.floor(Math.random() * imageAssets.length);
        } while (newImageIndex === prev[cellToUpdate] && imageAssets.length > 1);

        newIndices[cellToUpdate] = newImageIndex;
        return newIndices;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [imageAssets.length, currentImageIndices.length]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Dynamic Image Mosaic Background */}
      <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 gap-1 opacity-30">
        {currentImageIndices.map((imageIndex, cellIndex) => {
          const asset = imageAssets[imageIndex];
          return (
            <div
              key={`${cellIndex}-${imageIndex}`}
              className="relative overflow-hidden bg-black/50"
              style={{
                animation: `fadeIn 1.5s ease-in-out`,
              }}
            >
              {asset && (
                <img
                  src={asset.publicUrl}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-black/50 to-red-600/30" />
            </div>
          );
        })}
      </div>

    </div>
  );
}
