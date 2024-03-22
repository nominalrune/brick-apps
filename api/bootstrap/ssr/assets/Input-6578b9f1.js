import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState } from "react";
function Input({
  type = "text",
  name,
  id,
  value,
  // TODO controlledもuncontrolledも対応する。valueありonchangeありでcontorolled。どちらもなしでuncontrolled
  label = "",
  prefix = "",
  suffix = "",
  className,
  autoComplete,
  required,
  onChange = () => {
  },
  underlineStyle,
  defaultValue,
  customValidator,
  readOnly,
  options,
  ...rest
}) {
  const [error, setError] = useState("");
  function addError(msg) {
    setError((error2) => !!error2 ? /* @__PURE__ */ jsxs(Fragment, { children: [
      error2,
      /* @__PURE__ */ jsx("br", {}),
      msg
    ] }) : msg);
  }
  function handleChange(e) {
    setError(void 0);
    const { validity, validationMessage } = e.target;
    if (!validity.valid) {
      addError(validationMessage);
    }
    if (customValidator) {
      const { validity: customValidity, errorMessage } = customValidator(e.target.value);
      if (!customValidity) {
        addError(errorMessage);
      } else {
        onChange(e);
      }
    }
    if (validity.valid) {
      onChange(e);
    }
  }
  function isSelect(type2) {
    return type2 === "select";
  }
  return /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1", children: [
    label,
    /* @__PURE__ */ jsxs("div", { className: "inline-flex flex-row gap-1 items-end", children: [
      prefix,
      isSelect(type) ? /* @__PURE__ */ jsx(
        "select",
        {
          ...rest,
          name,
          id: id ?? name,
          value,
          className: (underlineStyle ? `border-0 border-b-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 invalid:border-red-300 focus:invalid:border-red-300 focus:invalid:ring-red-300 backdrop-blur read-only:bg-stone-50 read-only:focus:border-cyan-700/30 read-only:focus:ring-cyan-700/30 ` : `border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 invalid:border-red-300 focus:invalid:border-red-300 focus:invalid:ring-red-300 rounded-md shadow-sm read-only:bg-stone-50 read-only:focus:border-cyan-700/30 read-only:focus:ring-cyan-700/30 `) + className,
          autoComplete,
          required,
          readOnly,
          onChange: handleChange,
          children: options == null ? void 0 : options.map(([value2, label2]) => /* @__PURE__ */ jsx("option", { value: value2, children: label2 ?? value2 }, name + String(value2)))
        }
      ) : /* @__PURE__ */ jsx(
        "input",
        {
          maxLength: 128,
          min: -99999,
          max: 99999,
          ...rest,
          type,
          name,
          id: id ?? name,
          value,
          autoFocus: false,
          className: (underlineStyle ? `border-0 border-b-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 invalid:border-red-300 focus:invalid:border-red-300 focus:invalid:ring-red-300 backdrop-blur read-only:bg-stone-50 read-only:focus:border-cyan-700/30 read-only:focus:ring-cyan-700/30 ` : `border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 invalid:border-red-300 focus:invalid:border-red-300 focus:invalid:ring-red-300 rounded-md shadow-sm read-only:bg-stone-50 read-only:focus:border-cyan-700/30 read-only:focus:ring-cyan-700/30 `) + className,
          autoComplete,
          required,
          readOnly,
          onChange: handleChange
        }
      ),
      suffix
    ] })
  ] });
}
export {
  Input as I
};
