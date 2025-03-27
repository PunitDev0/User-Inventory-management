import{r,j as e,a as T}from"./app-CR_XZUGx.js";import{L as P}from"./Layout-BLOXkY28.js";import{C as N,a as w,d as S,b as v}from"./card-tyBzIEp5.js";import{a as B,b as F,I as h,B as C}from"./input-C7Kh-61c.js";import{L as c}from"./label-BKWT13mP.js";import{S as H,a as _,b as M,c as V,d as x}from"./select-DKfdbBLH.js";import{T as A,a as U,b as D,c as i,d as Y,e as n}from"./table-Cy1SyrVF.js";import{D as $,f as G,a as J,b as K,c as O,d as Q}from"./dialog-C8ZAIBXt.js";import"./index-BUcGEKml.js";import"./index-DsiNpN2M.js";import"./index-DzOMFqeF.js";/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]],X=B("Send",W),I=r.forwardRef(({className:a,...l},d)=>e.jsx("textarea",{className:F("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",a),ref:d,...l}));I.displayName="Textarea";const L="/api/support",Z=async a=>{try{return(await T.post(`${L}`,a,{headers:{"Content-Type":"application/json"}})).data}catch(l){throw l}},R=async()=>{try{return(await T.get(`${L}`)).data}catch(a){throw a}};function ee(){const[a,l]=r.useState({name:"",email:"",subject:"",priority:"medium",message:""}),[d,g]=r.useState(!1),[u,p]=r.useState(null),[j,y]=r.useState([]),[f,q]=r.useState(null);r.useEffect(()=>{(async()=>{try{const t=await R();t.success?y(t.data):console.error("Failed to fetch support requests:",t.message)}catch(t){console.error("Error fetching support requests:",t)}})()},[]);const m=s=>{const{name:t,value:o}=s.target;l(k=>({...k,[t]:o}))},z=s=>{l(t=>({...t,priority:s}))},E=async s=>{s.preventDefault(),g(!0),p(null);try{const t=await Z(a);if(t.success){p({type:"success",message:"Support request submitted successfully!"}),l({name:"",email:"",subject:"",priority:"medium",message:""});const o=await R();o.success&&y(o.data)}else throw new Error(t.message||"Failed to submit support request")}catch(t){p({type:"error",message:t.message||"Failed to submit support request. Please try again."})}finally{g(!1)}},b=s=>s?new Date(s).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}):"N/A";return e.jsx("div",{className:"container mx-auto mt-8 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-b from-gray-100 to-gray-200",children:e.jsxs("div",{className:"max-w-4xl mx-auto space-y-8",children:[e.jsxs(N,{className:"w-full shadow-2xl rounded-2xl bg-white",children:[e.jsx(w,{children:e.jsx(S,{className:"text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight",children:"Contact Support"})}),e.jsx(v,{children:e.jsxs("form",{onSubmit:E,className:"space-y-6",children:[e.jsxs("div",{className:"grid gap-6 sm:grid-cols-2",children:[e.jsxs("div",{children:[e.jsx(c,{htmlFor:"name",className:"text-sm font-medium text-gray-700",children:"Name"}),e.jsx(h,{id:"name",name:"name",type:"text",value:a.name,onChange:m,required:!0,className:"mt-1 w-full",placeholder:"Your name"})]}),e.jsxs("div",{children:[e.jsx(c,{htmlFor:"email",className:"text-sm font-medium text-gray-700",children:"Email"}),e.jsx(h,{id:"email",name:"email",type:"email",value:a.email,onChange:m,required:!0,className:"mt-1 w-full",placeholder:"your.email@example.com"})]})]}),e.jsxs("div",{children:[e.jsx(c,{htmlFor:"subject",className:"text-sm font-medium text-gray-700",children:"Subject"}),e.jsx(h,{id:"subject",name:"subject",type:"text",value:a.subject,onChange:m,required:!0,className:"mt-1 w-full",placeholder:"Brief description of your issue"})]}),e.jsxs("div",{children:[e.jsx(c,{htmlFor:"priority",className:"text-sm font-medium text-gray-700",children:"Priority"}),e.jsxs(H,{value:a.priority,onValueChange:z,children:[e.jsx(_,{id:"priority",className:"mt-1 w-full",children:e.jsx(M,{})}),e.jsxs(V,{children:[e.jsx(x,{value:"low",children:"Low"}),e.jsx(x,{value:"medium",children:"Medium"}),e.jsx(x,{value:"high",children:"High"}),e.jsx(x,{value:"urgent",children:"Urgent"})]})]})]}),e.jsxs("div",{children:[e.jsx(c,{htmlFor:"message",className:"text-sm font-medium text-gray-700",children:"Message"}),e.jsx(I,{id:"message",name:"message",value:a.message,onChange:m,required:!0,className:"mt-1 w-full",rows:6,placeholder:"Describe your problem in detail..."})]}),u&&e.jsx("div",{className:F("p-3 rounded-lg",u.type==="success"?"bg-green-100 text-green-800":"bg-red-100 text-red-800"),children:u.message}),e.jsx(C,{type:"submit",disabled:d,className:"w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2",children:d?"Submitting...":e.jsxs(e.Fragment,{children:[e.jsx(X,{size:16}),"Submit Request"]})})]})})]}),e.jsxs(N,{className:"w-full shadow-2xl rounded-2xl bg-white",children:[e.jsx(w,{children:e.jsx(S,{className:"text-2xl font-extrabold text-gray-900 tracking-tight",children:"Your Support Requests"})}),e.jsx(v,{children:j.length===0?e.jsx("p",{className:"text-gray-500 text-center py-4",children:"No support requests found."}):e.jsx("div",{className:"w-full overflow-x-auto rounded-lg border",children:e.jsxs(A,{className:"min-w-[640px]",children:[e.jsx(U,{children:e.jsxs(D,{children:[e.jsx(i,{className:"text-left py-3 px-4",children:"ID"}),e.jsx(i,{className:"text-left py-3 px-4 hidden sm:table-cell",children:"Subject"}),e.jsx(i,{className:"text-left py-3 px-4",children:"Details"}),e.jsx(i,{className:"text-left py-3 px-4 hidden md:table-cell",children:"Priority"}),e.jsx(i,{className:"text-left py-3 px-4 hidden lg:table-cell",children:"Status"}),e.jsx(i,{className:"text-left py-3 px-4 hidden xl:table-cell",children:"Date"})]})}),e.jsx(Y,{children:j.map(s=>e.jsxs(D,{className:"hover:bg-gray-50",children:[e.jsx(n,{className:"py-3 px-4 font-medium align-middle",children:s.id}),e.jsx(n,{className:"py-3 px-4 hidden sm:table-cell align-middle",children:s.subject}),e.jsx(n,{className:"py-3 px-4 align-middle",children:e.jsxs($,{children:[e.jsx(G,{asChild:!0,children:e.jsx(C,{variant:"link",size:"sm",className:"text-indigo-600 hover:text-indigo-900 p-0 h-auto",onClick:()=>q(s),children:"View"})}),f&&f.id===s.id&&e.jsxs(J,{className:"sm:max-w-md w-full",children:[e.jsxs(K,{children:[e.jsx(O,{children:s.subject}),e.jsx(Q,{children:"Support request details"})]}),e.jsxs("div",{className:"grid gap-4 py-4",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-medium text-gray-500",children:"Name"}),e.jsx("p",{className:"text-sm text-gray-900",children:s.name})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-medium text-gray-500",children:"Email"}),e.jsx("p",{className:"text-sm text-gray-900",children:s.email})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-medium text-gray-500",children:"Message"}),e.jsx("p",{className:"text-sm text-gray-900 whitespace-pre-wrap",children:s.message})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-medium text-gray-500",children:"Priority"}),e.jsx("p",{className:"text-sm text-gray-900 capitalize",children:s.priority})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-medium text-gray-500",children:"Status"}),e.jsx("p",{className:"text-sm text-gray-900 capitalize",children:s.status})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-medium text-gray-500",children:"Created"}),e.jsx("p",{className:"text-sm text-gray-900",children:b(s.created_at)})]})]})]})]})}),e.jsx(n,{className:"py-3 px-4 hidden md:table-cell align-middle capitalize",children:s.priority}),e.jsx(n,{className:"py-3 px-4 hidden lg:table-cell align-middle capitalize",children:s.status}),e.jsx(n,{className:"py-3 px-4 hidden xl:table-cell align-middle",children:b(s.created_at)})]},s.id))})]})})})]})]})})}function xe(){return e.jsx(P,{children:e.jsx(ee,{})})}export{xe as default};
