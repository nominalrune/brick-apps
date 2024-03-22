import { jsx } from "react/jsx-runtime";
function PrimaryButton({ children, className, ...attr }) {
  return /* @__PURE__ */ jsx("button", { className: "inline-flex items-center p-2 px-4 rounded bg-sky-700 text-white hover:bg-sky-600 hover:drop-shadow-md active:bg-sky-400 transition-colors duration-200 " + className, ...attr, children });
}
export {
  PrimaryButton as P
};
