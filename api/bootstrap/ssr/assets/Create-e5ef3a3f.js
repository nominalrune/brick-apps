import { jsx, jsxs } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-c667fe1b.js";
import { useForm, Link, Head } from "@inertiajs/react";
import { B as Button } from "./Button-2648093d.js";
import { P as PrimaryButton } from "./PrimaryButton-f2ecf4c3.js";
import { A as AppIcon } from "./AppIcon-6ee3ced6.js";
import { Fragment } from "react";
import { I as Input } from "./Input-6578b9f1.js";
import "./ApplicationLogo-5a041bc9.js";
import "@headlessui/react";
import "./app_icons-5c38da98.js";
function RecordForm({ id, form, onSubmit }) {
  return /* @__PURE__ */ jsx("form", { id, className: "m-4 flex flex-col gap-6", onSubmit, children: form.map((inputs, i) => /* @__PURE__ */ jsx("div", { className: "flex gap-4", children: inputs.map((input) => /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    Input,
    {
      label: input.label || "(no name)",
      type: input.type,
      name: input.code,
      defaultValue: input.defaultValue,
      className: "text-slate-800",
      prefix: input.prefix,
      suffix: input.suffix
    }
  ) }, input.code)) }, i)) });
}
function Create({ auth, app }) {
  const { data, setData, reset, transform, errors, post, processing } = useForm();
  async function handleSubmit(e) {
    e.preventDefault();
    if (!confirm("新規レコードを作成しますか？")) {
      return;
    }
    const f = new FormData(e.currentTarget);
    const inputs = Object.fromEntries(f.entries());
    transform((data2) => ({ ...inputs }));
    post(`/web/${app.code}/create`);
  }
  function handleCancel() {
    window.history.back();
  }
  const id = "record-create-form";
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsxs("div", { className: "flex gap-4 items-center", children: [
        /* @__PURE__ */ jsx(AppIcon, { src: app.icon }),
        /* @__PURE__ */ jsx(Link, { href: `/web/${app.code}`, className: "text-xl", children: app.name }),
        /* @__PURE__ */ jsx("span", { children: "新規レコード作成" }),
        /* @__PURE__ */ jsxs("div", { className: "flex-grow flex gap-4 justify-end", children: [
          /* @__PURE__ */ jsx(PrimaryButton, { type: "submit", form: id, children: "作成" }),
          /* @__PURE__ */ jsx(Button, { type: "button", onClick: handleCancel, children: "キャンセル" })
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "create new app" }),
        /* @__PURE__ */ jsx(RecordForm, { id, form: app.form, onSubmit: handleSubmit })
      ]
    }
  );
}
export {
  Create as default
};
