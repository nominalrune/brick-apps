import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-c667fe1b.js";
import { useForm, Head } from "@inertiajs/react";
import { u as useDnDAppEditor, A as AppEditHeader, P as Palette, i as inputItems, a as AppForm } from "./AppEditHeader-30f8d12d.js";
import { DragDropContext } from "react-beautiful-dnd";
import "react";
import "./ApplicationLogo-5a041bc9.js";
import "@headlessui/react";
import "react-icons/fi/index.esm.js";
import "./Input-6578b9f1.js";
import "react-icons/bi/index.esm.js";
import "./Modal-3b54e95e.js";
import "./Button-2648093d.js";
import "./PrimaryButton-f2ecf4c3.js";
import "./app_icons-5c38da98.js";
import "react-icons/md/index.esm.js";
function Create({ auth }) {
  const { table, update, remove, onDragEnd } = useDnDAppEditor("palette", inputItems);
  const { data, setData, transform, reset, errors, post, processing } = useForm({
    name: "新しいアプリ",
    code: "",
    description: "説明をここに書く",
    icon: "1",
    ...table.toDTO()
  });
  function handleChange(e) {
    setData(e.target.name, e.target.value);
  }
  async function handleSubmit(e) {
    console.log(table.toDTO());
    const _confirm = confirm("アプリを作成しますか？");
    if (!_confirm) {
      return;
    }
    transform((data2) => ({
      ...data2,
      ...table.toDTO()
    }));
    post("/app/create", { onBefore: (e2) => {
      console.log("data", e2.data);
    } });
  }
  function handleCancel() {
    window.history.back();
  }
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx(
        AppEditHeader,
        {
          submitLabel: "作成",
          data,
          onChange: handleChange,
          onCancel: handleCancel,
          onSubmit: handleSubmit
        }
      ),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "create new app" }),
        errors && /* @__PURE__ */ jsx("div", { children: Object.entries(errors).map(([key, msg]) => /* @__PURE__ */ jsxs("div", { className: "text-red-600", children: [
          key,
          ":",
          msg
        ] }, key)) }),
        /* @__PURE__ */ jsx(DragDropContext, { onDragEnd, children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-4 h-screen", children: [
          /* @__PURE__ */ jsx("div", { className: "col-span-1 bg-white", children: /* @__PURE__ */ jsx(Palette, { items: inputItems, name: "palette" }) }),
          /* @__PURE__ */ jsx("div", { className: "col-span-3 flex flex-col", children: /* @__PURE__ */ jsx(AppForm, { table: table.form, update, remove }) })
        ] }) })
      ]
    }
  );
}
export {
  Create as default
};
