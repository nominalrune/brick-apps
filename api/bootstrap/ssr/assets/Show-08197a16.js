import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
function Show() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Welcome" }),
    /* @__PURE__ */ jsx("h1", { children: "Welcome" }),
    /* @__PURE__ */ jsx("p", { children: 'Hello "", welcome to your first Inertia app!' })
  ] });
}
export {
  Show as default
};
