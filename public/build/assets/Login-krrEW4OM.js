import{r as o,j as e,a as E}from"./app-BO-pgh5r.js";import{u as P}from"./index.esm-DAg1saw4.js";import{c as S,P as C,a as b,b as k,I as y,B as M}from"./input-CrpobbBN.js";import{C as I,a as U,d as q,b as F}from"./card-DxyWOg7F.js";import{L as R,E as z,y as D}from"./index-Cw9JN88N.js";import{d as A}from"./index-B906Ms1P.js";/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],O=S("EyeOff",B);var V="Label",j=o.forwardRef((a,t)=>e.jsx(C.label,{...a,ref:t,onMouseDown:s=>{var r;s.target.closest("button, input, select, textarea")||((r=a.onMouseDown)==null||r.call(a,s),!s.defaultPrevented&&s.detail>1&&s.preventDefault())}}));j.displayName=V;var w=j;const _=k("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),l=o.forwardRef(({className:a,...t},s)=>e.jsx(w,{ref:s,className:b(_(),a),...t}));l.displayName=w.displayName;function H({className:a,...t}){const{register:s,handleSubmit:n,formState:{errors:r}}=P(),[d,c]=o.useState(!1),[m,x]=o.useState(null),[u,N]=o.useState(!1),v=()=>{N(i=>!i)},L=async i=>{var p,g;x(null),c(!0);try{const h=await E.post("https://event.nikatby.in/user/public/Userlogin",{email:i.email,password:i.password});console.log("Login successful:",h),A.Inertia.visit(h.data.redirect)}catch(f){x("Invalid email or password."),console.error("Login error:",(g=(p=f.response)==null?void 0:p.data)==null?void 0:g.message),D.error("Unauthorized User")}finally{c(!1)}};return e.jsxs("div",{className:b("flex flex-col items-center justify-center min-h-screen bg-gray-100",a),...t,children:[e.jsx(R,{}),e.jsxs(I,{className:"w-full max-w-md shadow-lg rounded-lg p-6 bg-white",children:[e.jsx(U,{className:"text-center",children:e.jsx(q,{className:"text-3xl font-bold text-gray-800",children:"Aryan Event User Panel"})}),e.jsx(F,{children:e.jsxs("form",{onSubmit:n(L),className:"space-y-6",children:[e.jsxs("div",{className:"grid gap-2",children:[e.jsx(l,{htmlFor:"email",className:"text-gray-700 font-medium",children:"Email"}),e.jsx(y,{id:"email",type:"email",placeholder:"m@example.com",className:"border border-gray-300 rounded-lg px-4 py-2",...s("email",{required:"Email is required"})}),r.email&&e.jsx("span",{className:"text-sm text-red-500",children:r.email.message})]}),e.jsxs("div",{className:"grid gap-2 relative",children:[e.jsx(l,{htmlFor:"password",className:"text-gray-700 font-medium",children:"Password"}),e.jsxs("div",{className:"relative",children:[e.jsx(y,{id:"password",type:u?"text":"password",className:"border border-gray-300 rounded-lg px-4 py-2 pr-10",...s("password",{required:"Password is required"})}),e.jsx("button",{type:"button",onClick:v,className:"absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800",children:u?e.jsx(O,{size:20}):e.jsx(z,{size:20})})]}),r.password&&e.jsx("span",{className:"text-sm text-red-500",children:r.password.message})]}),e.jsx(M,{type:"submit",className:"w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700",disabled:d,children:d?"Logging in...":"Login"}),m&&e.jsx("div",{className:"text-red-500 text-center",children:m})]})})]})]})}function W(){return e.jsx("div",{className:"flex justify-center items-center h-screen",children:e.jsx(H,{})})}export{W as default};
