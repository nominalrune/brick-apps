var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { FiMoreVertical } from "react-icons/fi/index.esm.js";
import { I as Input } from "./Input-6578b9f1.js";
import { BiCog, BiX } from "react-icons/bi/index.esm.js";
import { useReducer, useState } from "react";
import { M as Modal } from "./Modal-3b54e95e.js";
import { B as Button } from "./Button-2648093d.js";
import { P as PrimaryButton } from "./PrimaryButton-f2ecf4c3.js";
import { i as icons } from "./app_icons-5c38da98.js";
import { MdDelete } from "react-icons/md/index.esm.js";
function Palette({ items, name }) {
  return /* @__PURE__ */ jsx(Droppable, { droppableId: name, children: (provided) => /* @__PURE__ */ jsxs("div", { ref: provided.innerRef, ...provided.droppableProps, children: [
    items.map((item, i) => /* @__PURE__ */ jsx(Draggable, { draggableId: item, index: i, children: (provided2) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "m-1 p-1 py-2 border-[1px] border-slate-100 rounded bg-slate-50 cursor-grab flex flex-shrink items-center",
        ref: provided2.innerRef,
        ...provided2.draggableProps,
        ...provided2.dragHandleProps,
        children: [
          /* @__PURE__ */ jsx(FiMoreVertical, { className: "p-1 text-2xl text-slate-500" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: item,
              name: item + "-" + i.toString(),
              value: "",
              placeholder: item,
              disabled: true,
              className: "max-w-[9rem]"
            }
          )
        ]
      }
    ) }, item + "-" + (i - items.length).toString())),
    provided.placeholder
  ] }) });
}
const inputItems = ["text", "textarea", "number", "select", "radio", "checkbox", "datetime-local", "year", "month", "date", "time", "reference", "file"];
const valueTypeItems = ["varchar", "text", "integer", "double", "boolean", "json", "blob", "date", "time", "datetime", "reference"];
const defaultValueTypeMap = {
  "text": "varchar",
  "textarea": "text",
  "number": "double",
  "select": "varchar",
  "radio": "varchar",
  "checkbox": "boolean",
  "datetime-local": "datetime",
  "year": "date",
  "month": "date",
  "date": "date",
  "time": "time",
  "reference": "reference",
  "file": "blob"
};
function InputSettingModal({ inputData, onClose, onSubmit }) {
  if (!inputData) {
    return /* @__PURE__ */ jsx(Fragment, {});
  }
  return /* @__PURE__ */ jsx(Modal, { show: !!inputData, onClose, children: /* @__PURE__ */ jsx(InputSettingForm, { inputData, close: onClose, onSubmit }) });
}
function InputSettingForm({ inputData, close, onSubmit }) {
  const [state, reducer] = useReducer((state2, action) => {
    if (!state2) {
      return inputData;
    }
    const newData = state2.update(action.key, action.value);
    console.log("update", newData);
    return newData;
  }, inputData == null ? void 0 : inputData.clone());
  function handleChange(e) {
    const element = e.target;
    const value = element.type === "checkbox" ? element.checked : element.value;
    reducer({ key: element.name, value });
  }
  return /* @__PURE__ */ jsxs("form", { onSubmit, className: "p-4 flex flex-col justify-start gap-4", children: [
    /* @__PURE__ */ jsx(Input, { prefix: "入力タイプ: ", name: "type", type: "select", value: state.type, onChange: handleChange, options: inputItems.map((i) => [i]) }),
    /* @__PURE__ */ jsx(Input, { prefix: "DBカラム: ", name: "valueType", type: "select", value: state.valueType, onChange: handleChange, options: valueTypeItems.map((i) => [i]) }),
    /* @__PURE__ */ jsx(Input, { prefix: "表示名: ", name: "label", type: "text", onChange: handleChange, value: state.label }),
    /* @__PURE__ */ jsx(Input, { prefix: "名前: ", name: "code", type: "text", onChange: handleChange, value: state.code }),
    /* @__PURE__ */ jsx("div", { className: "flex gap-4" }),
    /* @__PURE__ */ jsx(Input, { prefix: "デフォルト値: ", name: "defaultValue", type: state.type, onChange: handleChange, value: state.defaultValue }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
      /* @__PURE__ */ jsx(Input, { prefix: "プリフィックス: ", name: "prefix", type: "text", onChange: handleChange, value: state.prefix }),
      /* @__PURE__ */ jsx(Input, { prefix: "サフィックス: ", name: "suffix", type: "text", onChange: handleChange, value: state.suffix })
    ] }),
    /* @__PURE__ */ jsx("input", { name: "oldName", type: "hidden", value: inputData.code }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
      /* @__PURE__ */ jsx(PrimaryButton, { type: "submit", children: "ok" }),
      /* @__PURE__ */ jsx(Button, { type: "button", onClick: close, children: "cancel" })
    ] })
  ] });
}
function AppForm({ table, update, remove }) {
  const [selectedInput, setSelectedInput] = useState(void 0);
  function handleConfigChange(e) {
    e.preventDefault();
    if (!selectedInput) {
      return;
    }
    const form = e.currentTarget;
    if (!(form instanceof HTMLFormElement)) {
      return;
    }
    const { code, label, type, valueType, defaultValue, prefix, suffix } = Object.fromEntries(new FormData(form).entries());
    const newInput = selectedInput.input.update("type", type).update("valueType", valueType).update("code", code).update("label", label).update("defaultValue", defaultValue).update("prefix", prefix).update("suffix", suffix);
    console.log({ newInput });
    update(selectedInput.addr, newInput);
    setSelectedInput(void 0);
  }
  const extraRow = /* @__PURE__ */ jsx(
    AppFormRow,
    {
      row: [],
      rowIndex: table.length + 1,
      select: (param) => setSelectedInput(param),
      remove
    },
    table.length + 1
  );
  const rows = table.map((row, i) => /* @__PURE__ */ jsx(
    AppFormRow,
    {
      row,
      rowIndex: i,
      select: (param) => setSelectedInput(param),
      remove
    },
    i
  )).concat(extraRow);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      InputSettingModal,
      {
        inputData: selectedInput == null ? void 0 : selectedInput.input,
        onClose: () => setSelectedInput(void 0),
        onSubmit: handleConfigChange
      }
    ),
    rows
  ] });
}
function AppFormRow({ row, rowIndex, select, remove }) {
  return /* @__PURE__ */ jsx(Droppable, { droppableId: rowIndex.toString(), direction: "horizontal", children: (provided) => /* @__PURE__ */ jsxs("div", { className: "p-1 border-b-2 border-slate-200 h-28 last:flex-grow flex", ref: provided.innerRef, ...provided.droppableProps, children: [
    row.map((item, col) => /* @__PURE__ */ jsxs(
      AppFormItem,
      {
        index: col,
        id: item.code,
        onConfig: () => {
          select({ addr: [rowIndex, col], input: item });
        },
        remove: () => remove([rowIndex, col]),
        children: [
          /* @__PURE__ */ jsx(Input, { label: item.label || "(no name)", disabled: true, type: item.type, name: item.code, value: item.defaultValue, className: "opacity-90 text-slate-700" }),
          /* @__PURE__ */ jsx("div", { className: "text-red-500", children: item.error })
        ]
      },
      item.code
    )),
    provided.placeholder
  ] }) });
}
function AppFormItem({ index, id, children, onConfig, remove }) {
  return /* @__PURE__ */ jsx(Draggable, { draggableId: id, index, children: (provided) => /* @__PURE__ */ jsxs(
    "div",
    {
      className: "border-[1px] border-sky-400 border-dashed h-24 p-1 m-1 flex",
      ref: provided.innerRef,
      ...provided.draggableProps,
      ...provided.dragHandleProps,
      children: [
        /* @__PURE__ */ jsx("div", { className: "bg-slate-200 rounded p-1 m-1 cursor-grab" }),
        children,
        /* @__PURE__ */ jsxs("div", { className: "m-1 p-1 grid", children: [
          /* @__PURE__ */ jsx(BiCog, { className: "transition-colors duration-500 text-2xl text-slate-600 hover:text-slate-900 cursor-pointer", onClick: () => onConfig() }),
          /* @__PURE__ */ jsx(BiX, { className: "transition-colors duration-500 text-2xl text-slate-600 hover:text-slate-900 cursor-pointer", onClick: remove })
        ] })
      ]
    }
  ) });
}
class AppTable {
  constructor(_form) {
    __publicField(this, "form");
    this.form = _form.filter((row) => row.length !== 0);
  }
  get formKeys() {
    return this.form.flat().map((item) => item.code);
  }
  map(callbackfn) {
    return this.form.map(callbackfn);
  }
  at(row) {
    return this.form[row] ?? [];
  }
  get([row, col]) {
    var _a;
    return (_a = this.form[row]) == null ? void 0 : _a[col];
  }
  insert([x, y], inputData) {
    if (!this.form[x]) {
      this.form[x] = [];
    }
    const newInputs = this.at(x).toSpliced(y, 0, inputData);
    return new AppTable(this.map((row, i) => i === x ? newInputs : row).filter((row) => row && row.length !== 0));
  }
  update([x, y], value) {
    const updatedRow = this.at(x).toSpliced(y, 1, value);
    const newInstance = new AppTable(
      this.map((row, i) => i === x ? updatedRow : row).filter((row) => row && row.length !== 0)
    );
    return newInstance;
  }
  move([fromRow, fromCol], [toRow, toCol]) {
    if (fromRow === toRow) {
      const clone = Array.from(this.at(fromRow));
      const [removed] = clone.splice(fromCol, 1);
      clone.splice(toCol, 0, removed);
      return new AppTable(
        this.form.map((row, i) => i === fromRow ? clone : row).filter((row) => row && row.length !== 0)
      );
    }
    const item = this.get([fromRow, fromCol]);
    if (!item) {
      return this;
    }
    return new AppTable(
      this.form.map((row, i) => i === fromRow ? row.toSpliced(fromCol, 1) : i === toRow ? row.toSpliced(toCol, 0, item) : row).filter((row) => row && row.length !== 0)
    );
  }
  remove([x, y]) {
    return new AppTable(
      this.form.map((row, i) => i === x ? row.toSpliced(y, 1) : row).filter((row) => row && row.length !== 0)
    );
  }
  toDTO() {
    return {
      form: this.form.map((row) => row.map((col) => col.toDTO())),
      form_keys: this.formKeys
    };
  }
}
class AppInput {
  constructor(type, code, valueType, defaultValue, label = "", prefix = "", suffix = "", rules = {}, referringAppCode) {
    __publicField(this, "_error", "");
    __publicField(this, "defaultValue");
    __publicField(this, "referringAppCode");
    this.type = type;
    this.code = code;
    this.valueType = valueType;
    this.label = label;
    this.prefix = prefix;
    this.suffix = suffix;
    this.rules = rules;
    this.defaultValue = defaultValue;
    if (this.type === "reference") {
      this.referringAppCode = referringAppCode;
    }
  }
  get error() {
    return this._error;
  }
  updateValue(value) {
    return new AppInput(this.type, this.code, this.valueType, value, this.label, this.prefix, this.suffix, this.rules, this.referringAppCode);
  }
  update(key, value) {
    return AppInput.fromDTO({ ...this.toDTO(), [key]: value });
  }
  clone() {
    return new AppInput(this.type, this.code, this.valueType, this.defaultValue, this.label, this.prefix, this.suffix, this.rules, this.referringAppCode);
  }
  toDTO() {
    return {
      type: this.type,
      code: this.code,
      valueType: this.valueType,
      defaultValue: this.defaultValue,
      label: this.label,
      prefix: this.prefix,
      suffix: this.suffix,
      rules: this.rules,
      referringAppCode: this.referringAppCode
    };
  }
  static fromDTO(dto) {
    return new AppInput(dto.type, dto.code, dto.valueType, dto.defaultValue, dto.label, dto.prefix, dto.suffix, dto.rules, dto.referringAppCode);
  }
  // toJSON() {
  //     return JSON.stringify(this.toDTO());
  // }
}
function useInputsTable(initialTable) {
  const [table, setTable] = useState(initialTable ? new AppTable(initialTable.map((i) => i.map((j) => AppInput.fromDTO(j)))) : new AppTable([]));
  function get([row, col]) {
    return table.get([row, col]);
  }
  function insert([x, y], inputData) {
    setTable(table.insert([x, y], inputData));
  }
  function update([x, y], value) {
    setTable((table2) => table2.update([x, y], value));
  }
  function move(from, to) {
    setTable((table2) => table2.move(from, to));
  }
  function remove([x, y]) {
    setTable((table2) => table2.remove([x, y]));
  }
  return { table, get, insert, move, update, remove };
}
function useDnDAppEditor(paletteName, paletteItems, initialTable) {
  const { table, get, insert, move, update, remove } = useInputsTable(initialTable);
  function onDragEnd({ draggableId, destination, source }) {
    console.log({ draggableId, destination, source });
    if (!destination || destination.droppableId === paletteName) {
      return;
    }
    const destRow = Number(destination.droppableId);
    const destCol = destination.index;
    if (source.droppableId === paletteName) {
      const type = paletteItems[source.index];
      const code = type + "-" + (1 + Math.max(0, ...table.form.flat().map((item) => Number(item.code.split("-").at(-1))).filter(Number.isFinite)));
      insert([destRow, destCol], new AppInput(type, code, defaultValueTypeMap[type]));
      return;
    }
    const sourceRow = Number(source.droppableId);
    const sourceCol = source.index;
    if (!isFinite(destRow) || !isFinite(sourceRow)) {
      return;
    }
    if (destRow === sourceRow && destCol === sourceCol) {
      return;
    }
    move([sourceRow, sourceCol], [destRow, destCol]);
  }
  return { table, update, remove, onDragEnd };
}
function AppIconSelect({ value, name, label, onChange, className }) {
  return /* @__PURE__ */ jsx(
    Input,
    {
      label,
      type: "select",
      name,
      className,
      value,
      onChange,
      options: Object.entries(icons).map(([key, url]) => [key, /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { children: url }),
        /* @__PURE__ */ jsx("img", { src: url, className: "w-6 h-6" })
      ] })])
    }
  );
}
function AppEditHeader({ data, submitLabel, onChange, onCancel, onSubmit, onDelete }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex gap-4 items-end", children: [
    /* @__PURE__ */ jsx(AppIconSelect, { value: data.icon, name: "icon", className: "max-w-6", onChange }),
    /* @__PURE__ */ jsx(Input, { label: "アプリ名", type: "text", name: "name", className: "text-3xl", value: data.name, onChange }),
    /* @__PURE__ */ jsx(Input, { label: "アプリコード", required: true, type: "text", name: "code", value: data.code, onChange }),
    /* @__PURE__ */ jsxs("div", { className: "flex-grow flex gap-4 justify-end", children: [
      /* @__PURE__ */ jsx(PrimaryButton, { type: "button", onClick: onSubmit, children: submitLabel }),
      /* @__PURE__ */ jsx(Button, { type: "button", onClick: onCancel, children: "キャンセル" }),
      /* @__PURE__ */ jsx(Button, { className: "pl-2 pr-2 text-white bg-red-600 hover:bg-red-500 hover:box-shadow", onClick: onDelete, children: /* @__PURE__ */ jsx(MdDelete, { className: "text-xl", title: "削除" }) })
    ] })
  ] });
}
export {
  AppEditHeader as A,
  Palette as P,
  AppForm as a,
  inputItems as i,
  useDnDAppEditor as u
};
