import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { A as AppIcon } from "./AppIcon-6ee3ced6.js";
import { P as PrimaryButton } from "./PrimaryButton-f2ecf4c3.js";
import { Link } from "@inertiajs/react";
import { A as Authenticated } from "./AuthenticatedLayout-c667fe1b.js";
import { MdSettings } from "react-icons/md/index.esm.js";
import "./app_icons-5c38da98.js";
import "react";
import "./ApplicationLogo-5a041bc9.js";
import "@headlessui/react";
function RecordList({ records, app }) {
  if (records.length === 0) {
    return /* @__PURE__ */ jsx(Fragment, { children: "まだレコードがありません" });
  }
  const columns = app.form_keys;
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("table", { className: "rounded border-separate border-spacing-0", children: [
    /* @__PURE__ */ jsx("thead", { className: "bg-sky-600 text-white", children: /* @__PURE__ */ jsx("tr", { children: columns.map((column) => {
      var _a;
      return /* @__PURE__ */ jsx("th", { className: "p-2 first:rounded-tl last:rounded-tr", children: ((_a = app.form.flat().find((item) => item.code === column)) == null ? void 0 : _a.label) ?? "" }, column);
    }) }) }),
    /* @__PURE__ */ jsx("tbody", { children: records.map((record) => /* @__PURE__ */ jsx("tr", { className: "h hover:bg-sky-400/10 group", children: columns.map((column) => /* @__PURE__ */ jsx("td", { className: "p-2 border-[1px] border-t-0 border-slate-200 group-last:first:rounded-bl group-last:last:rounded-br", children: /* @__PURE__ */ jsx(Link, { href: `/web/${app.code}/${record.id}`, children: record[column] }) }, record.id + column)) }, record.id)) })
  ] }) });
}
function Index({ auth, app, records }) {
  return /* @__PURE__ */ jsx(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsxs("div", { className: "flex gap-4 items-center", children: [
        /* @__PURE__ */ jsx(AppIcon, { src: app.icon }),
        /* @__PURE__ */ jsx(Link, { href: `/web/${app.code}`, className: "text-xl ", children: app.name }),
        /* @__PURE__ */ jsxs("div", { className: "flex-grow flex gap-4 justify-end items-center", children: [
          /* @__PURE__ */ jsx(Link, { href: `/web/${app.code}/create`, children: /* @__PURE__ */ jsx(PrimaryButton, { children: "新規作成" }) }),
          /* @__PURE__ */ jsx(Link, { href: `/app/${app.code}/edit`, children: /* @__PURE__ */ jsx(MdSettings, { className: "text-3xl text-slate-600 hover:text-slate-800 hover:drop-shadow transition-colors" }) })
        ] })
      ] }),
      children: /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx(RecordList, { records, app }) }) })
    }
  );
}
export {
  Index as default
};
