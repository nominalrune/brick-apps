import{j as e,r as d,W as h}from"./app-e8b3b534.js";import{I as w}from"./InputError-65794a90.js";import{I as j}from"./InputLabel-fc297a5c.js";import{M as b}from"./Modal-853d4080.js";import{I as N}from"./Input-6a53dedd.js";import"./transition-ac1568dd.js";function u({className:r="",disabled:t,children:s,...o}){return e.jsx("button",{...o,className:`inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150 ${t&&"opacity-25"} `+r,disabled:t,children:s})}function v({type:r="button",className:t="",disabled:s,children:o,...n}){return e.jsx("button",{...n,type:r,className:`inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 ${s&&"opacity-25"} `+t,disabled:s,children:o})}function A({className:r=""}){const[t,s]=d.useState(!1),o=d.useRef(),{data:n,setData:m,delete:p,processing:f,reset:c,errors:x}=h({password:""}),y=()=>{s(!0)},g=i=>{i.preventDefault(),p(route("profile.destroy"),{preserveScroll:!0,onSuccess:()=>a(),onError:()=>{var l;return(l=o.current)==null?void 0:l.focus()},onFinish:()=>c()})},a=()=>{s(!1),c()};return e.jsxs("section",{className:`space-y-6 ${r}`,children:[e.jsxs("header",{children:[e.jsx("h2",{className:"text-lg font-medium text-gray-900",children:"Delete Account"}),e.jsx("p",{className:"mt-1 text-sm text-gray-600",children:"Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain."})]}),e.jsx(u,{onClick:y,children:"Delete Account"}),e.jsx(b,{show:t,onClose:a,children:e.jsxs("form",{onSubmit:g,className:"p-6",children:[e.jsx("h2",{className:"text-lg font-medium text-gray-900",children:"Are you sure you want to delete your account?"}),e.jsx("p",{className:"mt-1 text-sm text-gray-600",children:"Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account."}),e.jsxs("div",{className:"mt-6",children:[e.jsx(j,{htmlFor:"password",value:"Password",className:"sr-only"}),e.jsx(N,{id:"password",type:"password",name:"password",ref:o,value:n.password,onChange:i=>m("password",i.target.value),className:"mt-1 block w-3/4",isFocused:!0,placeholder:"Password"}),e.jsx(w,{message:x.password,className:"mt-2"})]}),e.jsxs("div",{className:"mt-6 flex justify-end",children:[e.jsx(v,{onClick:a,children:"Cancel"}),e.jsx(u,{className:"ml-3",disabled:f,children:"Delete Account"})]})]})})]})}export{A as default};
