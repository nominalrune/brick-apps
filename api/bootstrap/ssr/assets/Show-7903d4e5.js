import { jsx, jsxs, Fragment as Fragment$1 } from "react/jsx-runtime";
import { A as AppIcon } from "./AppIcon-6ee3ced6.js";
import { B as Button } from "./Button-2648093d.js";
import { Fragment, useState } from "react";
import { I as Input } from "./Input-6578b9f1.js";
import { A as Authenticated } from "./AuthenticatedLayout-c667fe1b.js";
import { useForm, Link } from "@inertiajs/react";
import { MdDelete } from "react-icons/md/index.esm.js";
import "./app_icons-5c38da98.js";
import "./ApplicationLogo-5a041bc9.js";
import "@headlessui/react";
function RecordShow({ id, form, record, onSubmit, edit }) {
  return /* @__PURE__ */ jsx("form", { id, className: "m-4 flex flex-col gap-6", onSubmit, children: form.map((inputs, i) => /* @__PURE__ */ jsx("div", { className: "flex gap-4", children: inputs.map((input) => /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    Input,
    {
      label: input.label || "(no name)",
      type: input.type,
      name: input.code,
      value: record[input.code],
      className: "text-slate-800",
      prefix: input.prefix,
      suffix: input.suffix,
      readOnly: !edit
    }
  ) }, input.code)) }, i)) });
}
function Show({ auth, app, record }) {
  const [isEdit, setIsEdit] = useState(false);
  function edit() {
    setIsEdit(true);
  }
  const { transform, post, errors, delete: destroy } = useForm();
  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    if (!(form instanceof HTMLFormElement)) {
      return;
    }
    const formData = Object.fromEntries(new FormData(form).entries());
    transform((data) => formData);
    post(`/web/${app.code}/${record.id}/edit`, { onSuccess: (e2) => {
      setIsEdit(false);
    } });
  }
  function handleDelete() {
    if (!confirm("本当に削除しますか？")) {
      return;
    }
    destroy(`/web/${app.code}/${record.id}`);
  }
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsxs("div", { className: "flex gap-4 items-center", children: [
        /* @__PURE__ */ jsx(AppIcon, { src: app.icon }),
        /* @__PURE__ */ jsx(Link, { href: `/web/${app.code}`, className: "text-xl", children: app.name }),
        /* @__PURE__ */ jsxs("div", { className: "flex-grow flex gap-4 justify-end", children: [
          !isEdit && /* @__PURE__ */ jsx(Button, { type: "button", onClick: () => edit(), children: "編集" }),
          isEdit && /* @__PURE__ */ jsx(Button, { type: "submit", form: record.id.toString(), children: "保存" }),
          /* @__PURE__ */ jsxs(Button, { className: "pl-2 pr-2 text-white bg-red-600 hover:bg-red-500 hover:box-shadow", onClick: handleDelete, children: [
            /* @__PURE__ */ jsx(MdDelete, { className: "text-xl" }),
            "削除"
          ] })
        ] })
      ] }),
      children: [
        errors && /* @__PURE__ */ jsx(Fragment$1, { children: Object.entries(errors).map(([key, value]) => /* @__PURE__ */ jsxs("div", { className: "text-red-600", children: [
          key,
          ":",
          value
        ] }, key)) }),
        /* @__PURE__ */ jsx(RecordShow, { id: record.id.toString(), record, form: app.form, onSubmit: handleSubmit, edit: isEdit })
      ]
    }
  );
}
export {
  Show as default
};
