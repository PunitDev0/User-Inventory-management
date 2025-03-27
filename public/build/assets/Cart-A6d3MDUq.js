import{r as y,j as a,$ as k,a as f}from"./app-DE0RJGlJ.js";import{a as q,I,B as m,b as P}from"./input-CyagJO4t.js";import{C as b,b as j,a as L}from"./card-CkZfvHUi.js";import{I as v,S}from"./index-BxsbjBSu.js";import{L as R}from"./Layout-C86nkPD8.js";import"./index-CpY0o7rk.js";/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]],E=q("Trash2",A),F=({cartItems:n})=>{const[s,x]=y.useState([]);y.useEffect(()=>{x(n||[])},[n]);const N=async(r,t)=>{var c,l,i;const e=[...s],o=((l=(c=e[r])==null?void 0:c.product)==null?void 0:l.stock_quantity)||0,d=Math.max(1,Math.min(o,t));e[r].quantity=d,x(e);try{await f.put("https://crm.aryanevents.com/user/public/cart/update",{product_id:(i=s[r])==null?void 0:i.product_id,quantity:d}),console.log("Quantity updated successfully")}catch(g){console.error("Error updating quantity:",g),x(n||[])}},w=async r=>{var e;const t=s.filter((o,d)=>d!==r);x(t);try{await f.delete("https://crm.aryanevents.com/user/public/cart/remove",{params:{product_id:(e=s[r])==null?void 0:e.product_id}}),console.log("Item removed successfully")}catch(o){console.error("Error removing item:",o)}},_=s.reduce((r,t)=>{var e;return r+(parseFloat((e=t==null?void 0:t.product)==null?void 0:e.price)||0)*((t==null?void 0:t.quantity)||0)},0),u=s.some(r=>{var t;return((t=r==null?void 0:r.product)==null?void 0:t.stock_quantity)===0});return a.jsxs("div",{className:"p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-indigo-50 via-gray-100 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 min-h-screen",children:[a.jsx("div",{className:"mb-8",children:a.jsx("h1",{className:"text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 tracking-tight",children:"Your Cart"})}),s.length===0?a.jsxs("div",{className:"text-center text-gray-500 dark:text-gray-400 text-lg py-6 animate-pulse",children:["Your cart is empty."," ",a.jsx(k,{href:"/AllProduct",className:"text-indigo-600 dark:text-indigo-400 hover:underline",children:"Start shopping!"})]}):a.jsxs("div",{className:"space-y-6",children:[s.map((r,t)=>{var e,o,d,c,l,i,g,p,h;return a.jsx(b,{className:"shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",children:a.jsxs(j,{className:"p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800",children:[a.jsxs("div",{className:"flex-1",children:[a.jsx("h2",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100 tracking-tight",children:((e=r==null?void 0:r.product)==null?void 0:e.productName)||"Unknown Product"}),a.jsxs("h2",{className:"  text-gray-800 dark:text-gray-100 tracking-tight",children:["From : ",((o=r==null?void 0:r.product)==null?void 0:o.companyName)||((d=r==null?void 0:r.product)==null?void 0:d.shop_name)]}),a.jsxs("p",{className:"flex items-center text-indigo-600 dark:text-indigo-300 text-lg font-bold mt-1",children:[a.jsx(v,{size:18,className:"mr-1"}),((l=parseFloat((c=r==null?void 0:r.product)==null?void 0:c.price))==null?void 0:l.toFixed(2))||"0.00"]}),((i=r==null?void 0:r.product)==null?void 0:i.stock_quantity)===0?a.jsx("p",{className:"text-red-500 dark:text-red-400 text-sm mt-1 animate-pulse",children:"Out of Stock"}):a.jsxs("p",{className:"text-green-500 dark:text-green-400 text-sm mt-1",children:["In Stock (",(g=r==null?void 0:r.product)==null?void 0:g.stock_quantity," available)"]})]}),a.jsxs("div",{className:"flex items-center gap-4",children:[a.jsx(I,{type:"number",value:(r==null?void 0:r.quantity)||1,onChange:C=>N(t,parseInt(C.target.value)||1),className:"w-20 p-2 rounded-lg shadow-md border-indigo-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 transition-all duration-300 text-center bg-indigo-50 dark:bg-gray-700",min:"1",max:((p=r==null?void 0:r.product)==null?void 0:p.stock_quantity)||1,disabled:((h=r==null?void 0:r.product)==null?void 0:h.stock_quantity)===0}),a.jsx(m,{variant:"ghost",size:"sm",onClick:()=>w(t),className:"text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105",children:a.jsx(E,{className:"h-5 w-5"})})]})]})},r==null?void 0:r.id)}),a.jsxs(b,{className:"shadow-lg rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",children:[a.jsx(L,{className:"bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 p-4",children:a.jsxs("h2",{className:"text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center",children:["Total: ",a.jsx(v,{size:22,className:"ml-2 mr-1 text-indigo-600 dark:text-indigo-300"}),a.jsx("span",{className:"text-2xl text-indigo-600 dark:text-indigo-300",children:_.toFixed(2)})]})}),a.jsx(j,{className:"p-4 flex justify-end",children:a.jsx(k,{href:"checkout",children:a.jsxs(m,{disabled:u,className:P("px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105",u?"bg-gray-500 dark:bg-gray-700 cursor-not-allowed text-gray-300 dark:text-gray-400":"bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"),children:[a.jsx(S,{className:"h-5 w-5 mr-2"}),"Checkout"]})})})]})]})]})};function T({cartItems:n}){return a.jsx(R,{children:a.jsx(F,{cartItems:n})})}export{T as default};
