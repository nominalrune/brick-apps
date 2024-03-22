import { jsx } from "react/jsx-runtime";
function Button({ className = "", disabled, children, ...props }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      className: `inline-flex items-center p-2 px-4 rounded bg-gray-200 border border-transparent text-slate-900 hover:bg-gray-100 hover:shadow focus:bg-gray-100 active:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:drop-shadow-md transition-colors duration-200  ease-in-out ${disabled && "opacity-25"} ` + className,
      disabled,
      children
    }
  );
}
export {
  Button as B
};
