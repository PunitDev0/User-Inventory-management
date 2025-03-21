import{a as ae,r as l,j as e}from"./app-Bw4RPTGd.js";import{L as te}from"./Layout-Dw-g_BaE.js";import{c as B,I as b,B as d}from"./input-BghB8tjP.js";import{T as re,a as ne,b as P,c,d as le,e as i}from"./table-CDB0GGbI.js";import{D as _,a as D,b as S,c as z,d as I,e as O}from"./dialog-DZyNKFxF.js";import{y as m}from"./index-DJHspNCS.js";import{o as U}from"./orders-Dm_l4mPq.js";import{I as x}from"./index-C4TIeR8g.js";import{C as ie}from"./circle-check-big-BIV5_61q.js";import{E as $}from"./eye-BD84yCNf.js";import"./index-B-Grpkj4.js";/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const de=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]],ce=B("CircleX",de);/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xe=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]],oe=B("Clock",xe),me="https://ims.nikatby.in/user/public/api/PayPendingPayment",ge={PendingPayment:async(N,g)=>ae.post(me,{order_id:N,payment_amount:g})};function he(){const[N,g]=l.useState([]),[h,R]=l.useState(""),[q,H]=l.useState(!0),[A,Q]=l.useState(null),[a,f]=l.useState(null),[X,u]=l.useState(!1),[Y,y]=l.useState(!1),[G,k]=l.useState(!1),[o,F]=l.useState(""),[v,J]=l.useState(""),[w,K]=l.useState(""),[C,V]=l.useState("All");l.useEffect(()=>{(async()=>{try{const n=(await U.getUserOrders()).orders.map(r=>({...r,products:typeof r.products=="string"?JSON.parse(r.products):r.products}));g(n||[])}catch(t){console.error("Error fetching orders:",t),Q("Failed to fetch orders. Please try again later.")}finally{H(!1)}})()},[]);const M=s=>{const t=new Date(s);return t.setHours(23,59,59,999),t},p=N.filter(s=>{const t=!h||s.user_name.toLowerCase().includes(h.toLowerCase())||s.products.some(se=>se.product_name.toLowerCase().includes(h.toLowerCase())),n=C==="All"||s.status===C.toLowerCase(),r=s.delivered_date?new Date(s.delivered_date):null,ee=(!v||r&&r>=new Date(v))&&(!w||r&&r<=M(w));return t&&n&&ee}),j=s=>s?new Date(s).toLocaleString("en-GB",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}):"Not Delivered",L=s=>{f(s),F(""),u(!0)},T=s=>{f(s),y(!0)},E=s=>{f(s),k(!0)},W=async()=>{var s,t;if(!a||!o||Number(o)<=0){m.error("Please enter a valid payment amount.");return}try{await ge.PendingPayment(a.id,o),m.success("Payment successful!"),g(n=>n.map(r=>r.id===a.id?{...r,pending_payment:String(Number(r.pending_payment)-Number(o)),status:Number(r.pending_payment)-Number(o)<=0?"paid":r.status}:r)),u(!1)}catch(n){m.error(((t=(s=n.response)==null?void 0:s.data)==null?void 0:t.error)||"Payment failed. Please try again.")}},Z=async()=>{var s,t;if(a)try{await U.cancelOrder(a.id),g(n=>n.map(r=>r.id===a.id?{...r,status:"canceled"}:r)),m.success("Order canceled successfully!"),y(!1)}catch(n){m.error(((t=(s=n.response)==null?void 0:s.data)==null?void 0:t.error)||"Failed to cancel the order.")}};return q?e.jsx("div",{className:"flex justify-center items-center min-h-screen text-gray-500",children:"Loading..."}):A?e.jsx("div",{className:"flex justify-center items-center min-h-screen text-red-500",children:A}):e.jsxs("div",{className:"p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-800 dark:to-gray-900 min-h-screen",children:[e.jsx("h1",{className:"text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6",children:"Your Orders"}),e.jsx("div",{className:"flex flex-col gap-4 mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md",children:e.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 items-start sm:items-center",children:[e.jsx(b,{placeholder:"Search by User Name or Product...",value:h,onChange:s=>R(s.target.value),className:"w-full sm:w-64 rounded-lg shadow-sm border-gray-300 dark:border-gray-600"}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 w-full sm:w-auto",children:[e.jsxs("div",{className:"flex flex-col w-full sm:w-40",children:[e.jsx("label",{className:"text-sm font-medium text-gray-700 dark:text-gray-300",children:"Start Date"}),e.jsx(b,{type:"date",value:v,onChange:s=>J(s.target.value),className:"rounded-lg shadow-sm border-gray-300 dark:border-gray-600"})]}),e.jsxs("div",{className:"flex flex-col w-full sm:w-40",children:[e.jsx("label",{className:"text-sm font-medium text-gray-700 dark:text-gray-300",children:"End Date"}),e.jsx(b,{type:"date",value:w,onChange:s=>K(s.target.value),className:"rounded-lg shadow-sm border-gray-300 dark:border-gray-600"})]}),e.jsxs("div",{className:"flex flex-col w-full sm:w-40",children:[e.jsx("label",{className:"text-sm font-medium text-gray-700 dark:text-gray-300",children:"Status"}),e.jsxs("select",{value:C,onChange:s=>V(s.target.value),className:"w-full border p-2 rounded-lg shadow-sm bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200",children:[e.jsx("option",{value:"All",children:"All"}),e.jsx("option",{value:"Pending",children:"Pending"}),e.jsx("option",{value:"Canceled",children:"Canceled"}),e.jsx("option",{value:"Paid",children:"Paid"})]})]})]})]})}),e.jsx("div",{className:"hidden lg:block bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden",children:e.jsxs(re,{children:[e.jsx(ne,{children:e.jsxs(P,{className:"bg-gray-100 dark:bg-gray-700",children:[e.jsx(c,{className:"font-semibold text-gray-700 dark:text-gray-200",children:"Order ID"}),e.jsx(c,{className:"font-semibold text-gray-700 dark:text-gray-200",children:"Client Name"}),e.jsx(c,{className:"font-semibold text-gray-700 dark:text-gray-200",children:"Delivered Date"}),e.jsx(c,{className:"font-semibold text-gray-700 dark:text-gray-200",children:"Products"}),e.jsx(c,{className:"font-semibold text-gray-700 dark:text-gray-200",children:"Quantity"}),e.jsx(c,{className:"font-semibold text-gray-700 dark:text-gray-200",children:"Address"}),e.jsx(c,{className:"font-semibold text-gray-700 dark:text-gray-200",children:"Total"}),e.jsx(c,{className:"font-semibold text-gray-700 dark:text-gray-200",children:"Pending"}),e.jsx(c,{className:"font-semibold text-gray-700 dark:text-gray-200",children:"Paid"}),e.jsx(c,{className:"font-semibold text-gray-700 dark:text-gray-200",children:"Status"}),e.jsx(c,{className:"font-semibold text-gray-700 dark:text-gray-200 text-right",children:"Actions"})]})}),e.jsx(le,{children:p.length>0?p.map(s=>e.jsxs(P,{className:"hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",children:[e.jsxs(i,{className:"text-gray-800 dark:text-gray-200",children:["ARYAN",s.id]}),e.jsx(i,{className:"text-gray-800 dark:text-gray-200",children:s.user_name}),e.jsx(i,{className:"text-gray-600 dark:text-gray-400",children:j(s.delivered_date)}),e.jsxs(i,{className:"text-gray-800 dark:text-gray-200",children:[s.products.length," Products"]}),e.jsx(i,{className:"text-gray-800 dark:text-gray-200",children:s.products.reduce((t,n)=>t+n.quantity,0)}),e.jsxs(i,{className:"text-gray-600 dark:text-gray-400",children:[s.user_address,", ",s.user_city,", ",s.user_zip]}),e.jsx(i,{className:"text-gray-800 dark:text-gray-200",children:e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(x,{size:14})," ",Number(s.total_amount).toFixed(2)]})}),e.jsx(i,{className:"text-gray-800 dark:text-gray-200",children:e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(x,{size:14})," ",Number(s.pending_payment).toFixed(2)]})}),e.jsx(i,{className:"text-gray-800 dark:text-gray-200",children:e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(x,{size:14})," ",Number(s.paid_payment).toFixed(2)]})}),e.jsx(i,{children:e.jsxs("span",{className:`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${s.status==="pending"?"bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200":s.status==="canceled"?"bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-200":"bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200"}`,children:[s.status==="pending"?e.jsx(oe,{size:12}):s.status==="canceled"?e.jsx(ce,{size:12}):e.jsx(ie,{size:12}),s.status.charAt(0).toUpperCase()+s.status.slice(1)]})}),e.jsx(i,{className:"text-right",children:e.jsxs("div",{className:"flex gap-2 justify-end",children:[e.jsx(d,{size:"sm",className:`px-3 ${s.status==="pending"?"bg-red-600 hover:bg-red-700":s.status==="canceled"?"bg-orange-500":"bg-green-600"} text-white`,onClick:()=>s.status==="pending"&&L(s),disabled:s.status!=="pending",children:s.status==="pending"?"Pay":s.status==="canceled"?"Canceled":"Paid"}),e.jsx(d,{size:"sm",variant:"outline",onClick:()=>E(s),children:e.jsx($,{size:16})}),e.jsx(d,{size:"sm",className:"bg-yellow-600 hover:bg-yellow-700 text-white",onClick:()=>T(s),disabled:s.status==="canceled"||s.status==="paid",children:"Cancel"})]})})]},s.id)):e.jsx(P,{children:e.jsx(i,{colSpan:11,className:"text-center py-6 text-gray-500 dark:text-gray-400",children:"No orders found."})})})]})}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4",children:p.length>0?p.map(s=>e.jsxs("div",{className:"bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-600",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsxs("h3",{className:"font-semibold text-lg text-gray-800 dark:text-gray-100",children:["Order #",s.id]}),e.jsxs("p",{className:"text-sm text-gray-600 dark:text-gray-400",children:[e.jsx("strong",{children:"Client:"})," ",s.user_name]}),e.jsxs("p",{className:"text-sm text-gray-600 dark:text-gray-400",children:[e.jsx("strong",{children:"Delivered:"})," ",j(s.delivered_date)]}),e.jsxs("p",{className:"text-sm text-gray-600 dark:text-gray-400",children:[e.jsx("strong",{children:"Products:"})," ",s.products.length]}),e.jsxs("p",{className:"text-sm text-gray-600 dark:text-gray-400",children:[e.jsx("strong",{children:"Quantity:"})," ",s.products.reduce((t,n)=>t+n.quantity,0)]}),e.jsxs("p",{className:"text-sm text-gray-600 dark:text-gray-400",children:[e.jsx("strong",{children:"Total:"})," ₹",Number(s.total_amount).toFixed(2)]}),e.jsxs("p",{className:"text-sm text-gray-600 dark:text-gray-400",children:[e.jsx("strong",{children:"Pending:"})," ₹",Number(s.pending_payment).toFixed(2)]}),e.jsxs("p",{className:"text-sm",children:[e.jsx("strong",{children:"Status:"})," ",e.jsx("span",{className:`font-semibold ${s.status==="pending"?"text-red-600":s.status==="canceled"?"text-orange-600":"text-green-600"}`,children:s.status.charAt(0).toUpperCase()+s.status.slice(1)})]})]}),e.jsxs("div",{className:"mt-4 flex gap-2 flex-wrap",children:[e.jsx(d,{size:"sm",className:`flex-1 ${s.status==="pending"?"bg-red-600 hover:bg-red-700":s.status==="canceled"?"bg-orange-500":"bg-green-600"} text-white`,onClick:()=>s.status==="pending"&&L(s),disabled:s.status!=="pending",children:s.status==="pending"?"Pay":s.status==="canceled"?"Canceled":"Paid"}),e.jsx(d,{size:"sm",variant:"outline",className:"flex-1",onClick:()=>E(s),children:e.jsx($,{size:16})}),e.jsx(d,{size:"sm",className:"flex-1 bg-yellow-600 hover:bg-yellow-700 text-white",onClick:()=>T(s),disabled:s.status==="canceled"||s.status==="paid",children:"Cancel"})]})]},s.id)):e.jsx("div",{className:"col-span-full text-center text-gray-500 dark:text-gray-400 py-6",children:"No orders found."})}),e.jsx(_,{open:X,onOpenChange:u,children:e.jsxs(D,{className:"sm:max-w-md bg-white dark:bg-gray-800",children:[e.jsxs(S,{children:[e.jsx(z,{className:"text-gray-800 dark:text-gray-100",children:"Confirm Payment"}),e.jsxs(I,{className:"text-gray-600 dark:text-gray-400",children:["Pay the pending amount for Order #",a==null?void 0:a.id,"."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 dark:text-gray-300",children:"Pending Amount"}),e.jsxs("p",{className:"flex items-center gap-1 text-gray-800 dark:text-gray-200",children:[e.jsx(x,{size:15})," ",Number(a==null?void 0:a.pending_payment).toFixed(2)]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 dark:text-gray-300",children:"Enter Amount"}),e.jsx(b,{type:"number",value:o,onChange:s=>{const t=Number(s.target.value);t>=0&&t<=Number(a==null?void 0:a.pending_payment)?F(s.target.value):m.error("Amount must be between 0 and pending payment.")},className:"mt-1 border-gray-300 dark:border-gray-600",min:"0",max:a==null?void 0:a.pending_payment,step:"0.01"})]})]}),e.jsxs(O,{className:"mt-4",children:[e.jsx(d,{variant:"outline",onClick:()=>u(!1),children:"Cancel"}),e.jsx(d,{onClick:W,className:"bg-blue-600 hover:bg-blue-700",disabled:!o||Number(o)<=0,children:"Confirm Payment"})]})]})}),e.jsx(_,{open:Y,onOpenChange:y,children:e.jsxs(D,{className:"sm:max-w-md bg-white dark:bg-gray-800",children:[e.jsxs(S,{children:[e.jsx(z,{className:"text-gray-800 dark:text-gray-100",children:"Confirm Cancellation"}),e.jsxs(I,{className:"text-gray-600 dark:text-gray-400",children:["Are you sure you want to cancel Order #",a==null?void 0:a.id,"? This action cannot be undone."]})]}),e.jsxs(O,{className:"mt-4",children:[e.jsx(d,{variant:"outline",onClick:()=>y(!1),children:"Keep Order"}),e.jsx(d,{onClick:Z,className:"bg-red-600 hover:bg-red-700",children:"Cancel Order"})]})]})}),e.jsx(_,{open:G,onOpenChange:k,children:e.jsxs(D,{className:"sm:max-w-lg bg-white dark:bg-gray-800",children:[e.jsx(S,{children:e.jsxs(z,{className:"text-gray-800 dark:text-gray-100",children:["Order Details - #",a==null?void 0:a.id]})}),a&&e.jsxs("div",{className:"space-y-3 text-gray-700 dark:text-gray-300",children:[e.jsxs("div",{children:[e.jsx("strong",{children:"Created:"})," ",j(a.created_at)]}),e.jsxs("div",{children:[e.jsx("strong",{children:"Phone:"})," ",a.user_phone]}),e.jsxs("div",{children:[e.jsx("strong",{children:"Delivered:"})," ",j(a.delivered_date)]}),e.jsxs("div",{children:[e.jsx("strong",{children:"Address:"})," ",a.user_address,", ",a.user_city,", ",a.user_zip]}),e.jsxs("div",{children:[e.jsx("strong",{children:"Total Amount:"})," ",e.jsxs("span",{className:"flex items-center gap-1",children:[e.jsx(x,{size:15})," ",Number(a.total_amount).toFixed(2)]})]}),e.jsxs("div",{children:[e.jsx("strong",{children:"Pending:"})," ",e.jsxs("span",{className:"flex items-center gap-1",children:[e.jsx(x,{size:15})," ",Number(a.pending_payment).toFixed(2)]})]}),e.jsxs("div",{children:[e.jsx("strong",{children:"Paid:"})," ",e.jsxs("span",{className:"flex items-center gap-1",children:[e.jsx(x,{size:15})," ",Number(a.paid_payment).toFixed(2)]})]}),e.jsxs("div",{children:[e.jsx("strong",{children:"Status:"})," ",e.jsx("span",{className:`font-semibold ${a.status==="pending"?"text-red-600":a.status==="canceled"?"text-orange-600":"text-green-600"}`,children:a.status.charAt(0).toUpperCase()+a.status.slice(1)})]}),e.jsxs("div",{children:[e.jsx("strong",{children:"Products:"}),e.jsx("ul",{className:"list-disc pl-5 mt-2 space-y-1",children:a.products.map((s,t)=>e.jsxs("li",{className:"flex flex-col sm:flex-row sm:items-center sm:gap-2",children:[e.jsxs("span",{className:"flex items-center",children:[s.product_name," - ",s.quantity," x ",e.jsx(x,{size:14})," ",Number(s.product_price).toFixed(2)," ="," ",e.jsx(x,{size:14})," ",Number(s.total_price).toFixed(2)]}),e.jsxs("span",{className:"text-gray-500 dark:text-gray-400 text-sm",children:["(From: ",s.From,")"]})]},t))})]})]}),e.jsx(O,{className:"mt-4",children:e.jsx(d,{onClick:()=>k(!1),className:"bg-gray-600 hover:bg-gray-700",children:"Close"})})]})})]})}function Pe(){return e.jsx(te,{children:e.jsx(he,{})})}export{Pe as default};
