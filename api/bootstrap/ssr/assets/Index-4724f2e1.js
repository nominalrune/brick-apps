import { jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-c667fe1b.js";
import "react";
import "./ApplicationLogo-5a041bc9.js";
import "@inertiajs/react";
import "@headlessui/react";
function Index({ auth, apps }) {
  return /* @__PURE__ */ jsx(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("div", { className: "flex gap-4 items-end" }),
      children: apps.map((app) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("a", { href: `/app/${app.code}`, children: app.name }) }, app.id))
    }
  );
}
export {
  Index as default
};
