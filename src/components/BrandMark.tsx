export default function BrandMark({ className = "" }: { className?: string }) {
  return (
    <img
      src="/quickprintz_assets/quickprintz-256.png"
      alt="Quick Printz logo"
      width={128}
      height={128}
      className={className}
      loading="eager"
      decoding="async"
    />
  );
}