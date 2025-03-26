import{r as d,j as e,$ as K,a as U}from"./app-Cw4dLWkH.js";import{c as W}from"./index-CePWm4Pi.js";import{B as x,I as b}from"./input-DdtGycOU.js";import{C as X}from"./card-B4EYGXy2.js";import{S as w,a as v,b as C,c as S,d as n}from"./select-Be_PyEE7.js";import{D,a as A,b as _,c as O,d as P}from"./dialog-UAkK8-tI.js";import{L as Y,y as m}from"./index-BUTTr_Bj.js";import{p as q}from"./product-B5R9YA2R.js";import{S as Z,I as h}from"./index-BI5R7KBS.js";import{S as ee}from"./search-BH78IAHL.js";import{F as I}from"./filter-B3-7DXby.js";import{E as te}from"./eye-BsJOQ436.js";import{L as ae}from"./Layout-AK0dPhw6.js";import"./index-DErNz7Lv.js";import"./index-DegpClPq.js";function re(){const[l,L]=d.useState("All Categories"),[p,E]=d.useState("Newest"),[u,F]=d.useState([]),[M,V]=d.useState([]),[a,z]=d.useState(null),[o,y]=d.useState(1),[B,c]=d.useState(!1),[Q,R]=d.useState(!1),[T,$]=d.useState([]),[g,G]=d.useState("");d.useEffect(()=>{(async()=>{var s;try{const i=await q.getAllProducts(),r=await q.getCategories();F(i.data.products||[]),V(r.data.categories||[])}catch(i){console.error("Error fetching data:",((s=i.response)==null?void 0:s.data)||i.message),m.error("Failed to load products or categories")}})()},[]);const f="https://crm.aryanevents.com/user/public/cart",j=()=>{let t=[...u];return l!=="All Categories"&&(t=t.filter(s=>s.category===l)),g&&(t=t.filter(s=>s.productName.toLowerCase().includes(g.toLowerCase()))),t.sort((s,i)=>{const r=new Date(s.created_at),N=new Date(i.created_at);return p==="Newest"?N-r:r-N}),t},H=t=>{z(t),y(1),c(!0)},J=async()=>{var t,s,i;if(!(!a||o<=0))try{const r=await U.post(f,{product_id:a.id,quantity:o});(r==null?void 0:r.status)===201&&($([...T,{...a,quantity:o}]),m.success(`${a.productName} added to cart`,{autoClose:2e3}),c(!1))}catch(r){console.error("Error adding to cart:",((t=r.response)==null?void 0:t.data)||r.message),m.error(((i=(s=r.response)==null?void 0:s.data)==null?void 0:i.error)||"Failed to add product to cart")}},k="https://i.pinimg.com/736x/df/9f/a9/df9fa9eb2ac17ed7794706eb5c7f877c.jpg";return e.jsxs("div",{className:"p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-indigo-50 via-gray-100 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 min-h-screen",children:[e.jsx(Y,{}),e.jsxs("div",{className:"flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8",children:[e.jsx("h1",{className:"text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 tracking-tight",children:"All Products"}),e.jsx(K,{href:f,children:e.jsxs(x,{variant:"outline",className:"flex items-center gap-2 text-indigo-600 dark:text-indigo-300 border-indigo-600 dark:border-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-all duration-300 shadow-md",children:[e.jsx(Z,{className:"h-5 w-5"})," View Cart"]})})]}),e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700",children:[e.jsxs("div",{className:"relative flex-1 max-w-md",children:[e.jsx(b,{placeholder:"Search products...",className:"pl-12 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 transition-all duration-300",value:g,onChange:t=>G(t.target.value)}),e.jsx(ee,{className:"absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-500 dark:text-indigo-300"})]}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-4",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(I,{className:"h-5 w-5 text-indigo-600 dark:text-indigo-300"}),e.jsx("span",{className:"text-sm font-semibold text-gray-700 dark:text-gray-200",children:"Category:"}),e.jsxs(w,{value:l,onValueChange:L,children:[e.jsx(v,{className:"w-[180px] rounded-lg shadow-md bg-indigo-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-indigo-300 dark:border-gray-600",children:e.jsx(C,{placeholder:"All Categories"})}),e.jsxs(S,{className:"bg-white dark:bg-gray-800 shadow-lg rounded-lg",children:[e.jsx(n,{value:"All Categories",className:"text-gray-700 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-gray-700",children:"All Categories"}),M.map(t=>e.jsx(n,{value:t.name,className:"text-gray-700 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-gray-700",children:t.name},t.id))]})]})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(I,{className:"h-5 w-5 text-indigo-600 dark:text-indigo-300"}),e.jsx("span",{className:"text-sm font-semibold text-gray-700 dark:text-gray-200",children:"Sort by Date:"}),e.jsxs(w,{value:p,onValueChange:E,children:[e.jsx(v,{className:"w-[180px] rounded-lg shadow-md bg-indigo-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-indigo-300 dark:border-gray-600",children:e.jsx(C,{placeholder:"Newest"})}),e.jsxs(S,{className:"bg-white dark:bg-gray-800 shadow-lg rounded-lg",children:[e.jsx(n,{value:"Newest",className:"text-gray-700 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-gray-700",children:"Newest"}),e.jsx(n,{value:"Oldest",className:"text-gray-700 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-gray-700",children:"Oldest"})]})]})]})]})]}),u.length===0?e.jsx("div",{className:"text-center text-gray-500 dark:text-gray-400 text-lg py-6 animate-pulse",children:"Loading products..."}):j().length===0?e.jsx("div",{className:"text-center text-gray-500 dark:text-gray-400 text-lg py-6",children:"No products match your filters"}):e.jsx("div",{className:"space-y-6",children:j().map(t=>e.jsx(X,{className:"shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",children:e.jsxs("div",{className:"flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800",children:[e.jsxs("div",{className:"flex-shrink-0 relative",children:[e.jsx("img",{src:t.image||k,alt:t.productName,className:"w-full sm:w-36 h-36 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"}),e.jsx("span",{className:W("absolute top-2 right-2 rounded-full px-2 py-1 text-xs font-semibold shadow-sm",t.status==="Available"&&"bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",t.status==="Low Stock"&&"bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",t.status==="Out"&&"bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"),children:t.status})]}),e.jsxs("div",{className:"flex-1",children:[e.jsx("div",{className:"flex items-start justify-between",children:e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-xl text-gray-800 dark:text-gray-100 tracking-tight",children:t.productName}),e.jsx("p",{className:"text-sm text-gray-500 dark:text-gray-400 italic",children:t.category})]})}),e.jsxs("p",{className:"mt-2 text-xl font-bold flex items-center text-indigo-600 dark:text-indigo-300",children:[e.jsx(h,{size:18,className:"mr-1"}),t.price]}),e.jsxs("p",{className:"text-sm text-gray-600 dark:text-gray-300",children:["Stock: ",e.jsx("span",{className:"font-medium",children:t.stock_quantity})]})]}),e.jsx("div",{className:"flex gap-3 mt-2 sm:mt-0 sm:ml-4",children:e.jsxs(x,{variant:"ghost",size:"sm",onClick:()=>H(t),className:"text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 rounded-lg shadow-md transition-all duration-300",children:[e.jsx(te,{className:"h-5 w-5 mr-2"})," View"]})})]})},t.id))})]}),a&&e.jsx(D,{open:B,onOpenChange:c,children:e.jsxs(A,{className:"max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 border border-indigo-200 dark:border-gray-700 animate-fade-in",children:[e.jsxs(_,{children:[e.jsx(O,{className:"text-2xl font-bold text-gray-800 dark:text-gray-100 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent",children:a.productName}),e.jsx(P,{className:"text-gray-600 dark:text-gray-400",children:"Explore product details below"})]}),e.jsxs("div",{className:"grid gap-4 py-4",children:[e.jsx("img",{src:a.image||k,alt:a.productName,className:"w-full h-56 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300",children:[e.jsx("strong",{className:"text-indigo-600 dark:text-indigo-300",children:"Name:"})," ",a.productName]}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300",children:[e.jsx("strong",{className:"text-indigo-600 dark:text-indigo-300",children:"From:"})," ",a.companyName||a.shop_name]}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300",children:[e.jsx("strong",{className:"text-indigo-600 dark:text-indigo-300",children:"Category:"})," ",a.category]}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300",children:[e.jsx("strong",{className:"text-indigo-600 dark:text-indigo-300",children:"Stock:"})," ",a.stock_quantity]}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 flex items-center",children:[e.jsx("strong",{className:"text-indigo-600 dark:text-indigo-300",children:"Price:"}),e.jsx(h,{size:18,className:"ml-1 mr-1 text-indigo-600 dark:text-indigo-300"}),e.jsx("span",{className:"text-xl font-semibold text-indigo-600 dark:text-indigo-300",children:a.price})]}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300",children:[e.jsx("strong",{className:"text-indigo-600 dark:text-indigo-300",children:"Description:"})," ",a.description||"N/A"]}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300",children:[e.jsx("strong",{className:"text-indigo-600 dark:text-indigo-300",children:"Added On:"})," ",new Date(a.created_at).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"})]})]}),e.jsxs("div",{className:"flex gap-4 mt-4 items-center",children:[e.jsx(b,{type:"number",value:o,onChange:t=>y(Math.max(1,Math.min(a.stock_quantity,parseInt(t.target.value)||1))),min:"1",max:a.stock_quantity,className:"w-24 rounded-lg shadow-md border-indigo-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 transition-all duration-300"}),e.jsx(x,{onClick:J,className:"bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105",disabled:a.stock_quantity===0||o>a.stock_quantity,children:"Add to Cart"})]}),a.stock_quantity===0&&e.jsx("p",{className:"text-red-500 text-sm animate-pulse",children:"This product is out of stock."}),o>a.stock_quantity&&a.stock_quantity>0&&e.jsx("p",{className:"text-red-500 text-sm animate-pulse",children:"Quantity exceeds available stock."})]})]})}),a&&e.jsx(D,{open:Q,onOpenChange:R,children:e.jsxs(A,{className:"max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 border border-indigo-200 dark:border-gray-700 animate-fade-in",children:[e.jsxs(_,{children:[e.jsxs(O,{className:"text-2xl font-bold text-gray-800 dark:text-gray-100 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent",children:["Order ",a.productName]}),e.jsx(P,{className:"text-gray-600 dark:text-gray-400",children:"Place an order for this product"})]}),e.jsxs("div",{className:"grid gap-4 py-4",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300",children:[e.jsx("strong",{className:"text-indigo-600 dark:text-indigo-300",children:"Product:"})," ",a.productName]}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 flex items-center",children:[e.jsx("strong",{className:"text-indigo-600 dark:text-indigo-300",children:"Price:"}),e.jsx(h,{size:18,className:"ml-1 mr-1 text-indigo-600 dark:text-indigo-300"}),e.jsx("span",{className:"text-xl font-semibold text-indigo-600 dark:text-indigo-300",children:a.price})]}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300",children:[e.jsx("strong",{className:"text-indigo-600 dark:text-indigo-300",children:"Stock Available:"})," ",a.stock_quantity]}),e.jsx("div",{className:"flex gap-4 mt-4"})]})]})})]})}function je(){return e.jsx(ae,{children:e.jsx(re,{})})}export{je as default};
