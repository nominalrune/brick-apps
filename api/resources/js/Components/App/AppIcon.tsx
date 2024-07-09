import {default as icons} from './app_icons.json';
export default function AppIcon({ src, className = "w-12 h-12 rounded" }: { src: string, className?: string; }) {
    console.log({ src, icons });
    const _src = icons[src] ?? "http://localhost:8088/icons/mail.webp";
    return <img src={_src} className={className} />;
}
