import { jsx } from "react/jsx-runtime";
import { i as icons } from "./app_icons-5c38da98.js";
function AppIcon({ src, className = "w-12 h-12 rounded" }) {
  console.log({ src, icons });
  const _src = icons[src] ?? "http://localhost:8088/icons/mail.webp";
  return /* @__PURE__ */ jsx("img", { src: _src, className });
}
export {
  AppIcon as A
};
