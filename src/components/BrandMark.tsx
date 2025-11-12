export default function BrandMark({ className = "" }: { className?: string }) {
  return (
    <img
      src="/td-usa.png"
      alt="TD STUDIOS logo"
      width={64}
      height={96}
      className={className}
      style={{ objectFit: 'contain' }}
      loading="eager"
      decoding="async"
    />
  );
}