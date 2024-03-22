import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-c667fe1b.js";
import { useForm, Head } from "@inertiajs/react";
import { DragDropContext } from "react-beautiful-dnd";
import { u as useDnDAppEditor, i as inputItems, A as AppEditHeader, P as Palette, a as AppForm } from "./AppEditHeader-30f8d12d.js";
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
function Edit({ auth, app }) {
  const { table, update, remove, onDragEnd } = useDnDAppEditor("palette", inputItems, app.form);
  const { data, setData, transform, delete: destroy, errors, post, processing } = useForm({
    name: app.name,
    code: app.code,
    description: app.description,
    icon: app.icon,
    ...table.toDTO()
  });
  function handleChange(e) {
    setData(e.target.name, e.target.value);
  }
  function handleCancel() {
    window.history.back();
  }
  async function handleSubmit(e) {
    const form = table.toDTO();
    console.log(form);
    if (!confirm("アプリを更新しますか？")) {
      return;
    }
    transform((data2) => ({
      // TODO ここの更新がうまく行かない
      ...data2,
      ...form
    }));
    post(`/app/${app.code}/edit`, { onBefore: (e2) => {
      console.log("data", e2.data);
    } });
  }
  function handleDelete() {
    if (!confirm("本当に削除しますか？")) {
      return;
    }
    destroy(`/app/${app.code}`);
  }
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
        AppEditHeader,
        {
          submitLabel: "更新",
          data,
          onChange: handleChange,
          onCancel: handleCancel,
          onSubmit: handleSubmit,
          onDelete: handleDelete
        }
      ) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "edit app: " + data.name }),
        /* @__PURE__ */ jsx(DragDropContext, { onDragEnd, children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-4 h-screen", children: [
          /* @__PURE__ */ jsx("div", { className: "col-span-1 bg-white", children: /* @__PURE__ */ jsx(Palette, { items: inputItems, name: "palette" }) }),
          /* @__PURE__ */ jsx("div", { className: "col-span-3 flex flex-col", children: /* @__PURE__ */ jsx(AppForm, { table: table.form, update, remove }) })
        ] }) })
      ]
    }
  );
}
export {
  Edit as default
};
