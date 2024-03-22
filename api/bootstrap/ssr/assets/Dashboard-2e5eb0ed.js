import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-c667fe1b.js";
import { Link, Head } from "@inertiajs/react";
import { A as AppIcon } from "./AppIcon-6ee3ced6.js";
import { P as PrimaryButton } from "./PrimaryButton-f2ecf4c3.js";
import "react";
import "./ApplicationLogo-5a041bc9.js";
import "@headlessui/react";
import "./app_icons-5c38da98.js";
function AppList({ apps }) {
  return /* @__PURE__ */ jsxs("table", { className: "rounded-lg", children: [
    /* @__PURE__ */ jsxs("thead", { className: "bg-slate-200", children: [
      /* @__PURE__ */ jsx("th", { className: "p-2 rounded-tl-lg", title: "app icon" }),
      /* @__PURE__ */ jsx("th", { className: "p-2", title: "app name", children: "name" }),
      /* @__PURE__ */ jsx("th", { className: "p-2", title: "app description", children: "description" }),
      /* @__PURE__ */ jsx("th", { className: "p-2 rounded-tr-lg", title: "app statistics", children: "statistics" })
    ] }),
    /* @__PURE__ */ jsx("tbody", { children: apps.length === 0 ? /* @__PURE__ */ jsx(Fragment, { children: "まだアプリはありません" }) : apps.map((app) => /* @__PURE__ */ jsx(AppListItem, { app }, app.code)) })
  ] });
}
function AppListItem({ app }) {
  return /* @__PURE__ */ jsxs("tr", { className: "hover:bg-sky-100 group", children: [
    /* @__PURE__ */ jsx("td", { className: "p-2 group-last:rounded-bl-lg border-[1px] border-r-0", children: /* @__PURE__ */ jsx(Link, { href: "/web/" + app.code, children: /* @__PURE__ */ jsx(AppIcon, { className: "w-16 h-16", src: app.icon }) }) }),
    /* @__PURE__ */ jsx("td", { className: "p-2 text-xl border-b-[1px]", children: /* @__PURE__ */ jsx(Link, { href: "/web/" + app.code, children: app.name }) }),
    /* @__PURE__ */ jsx("td", { className: "p-2 w-max border-b-[1px]", children: app.description }),
    /* @__PURE__ */ jsxs("td", { className: "p-2 group-last:rounded-br-lg border-[1px] border-l-0", children: [
      "records:",
      /* @__PURE__ */ jsx("span", { className: "p-1", children: 42 })
    ] })
  ] });
}
function Dashboard({ auth, apps }) {
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsxs("div", { className: "flex gap-4 items-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Dashboard" }),
        /* @__PURE__ */ jsx("div", { className: "flex-grow flex gap-4 justify-end", children: /* @__PURE__ */ jsx(Link, { href: route("app.create"), children: /* @__PURE__ */ jsx(PrimaryButton, { children: "New App" }) }) })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Dashboard" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx(AppList, { apps }) }) })
      ]
    }
  );
}
export {
  Dashboard as default
};
