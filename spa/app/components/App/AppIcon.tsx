export default function AppIcon({ src, className = "w-12 h-12 rounded" }: { src: string, className?: string; }) {
    return <img src={src} className={className} />;
}
