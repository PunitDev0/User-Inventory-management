import{r as g,a as U,j as e}from"./app-DRc6jId3.js";import{u as Q}from"./index.esm-NMbXdNwJ.js";import{S as u,P as M,C as Y}from"./Calendar-ByPwZo4_.js";import{I as m,B as H}from"./input-CUaMmBEz.js";import{C as p,a as y,b as h}from"./card-CV0Nb20T.js";import{L as J}from"./Layout-Fsu4r7SZ.js";import{o as K}from"./orders-Sc86EWFU.js";import{d as T}from"./index-JP_5TAvt.js";import{I as k,S as G}from"./index-3_mMRDqk.js";function oe({cartItems:D}){const{register:l,handleSubmit:I,setValue:O,watch:n,formState:{errors:t},reset:F}=Q(),[s,P]=g.useState(D||[]),[S,v]=g.useState(""),[i,E]=g.useState({name:"",email:"",phone:"",address:"",city:"",zip:""}),[f,z]=g.useState(new Date),[q,_]=g.useState(!1),[b,C]=g.useState({});g.useEffect(()=>{const a=JSON.parse(localStorage.getItem("userInfo"));a&&E(a),s.length>0&&w(f)},[s]);const B=(a,r,d)=>{const c=[...s];d>c[a].stock_quantity?v("Quantity exceeds available stock."):(v(""),c[a][r]=d,P(c),O(`products[${a}].quantity`,d),w(f))},w=async a=>{if(s.length!==0)try{const r=a.toLocaleDateString("en-US",{weekday:"short",month:"long",day:"2-digit",year:"numeric"}).replace(",",""),d={products:s.map(o=>({product_id:o.product.id,quantity:o.quantity})),delivered_date:r},N=await U.post("https://ims.nikatby.in/user/public/api/check-availability",d);C(N.data)}catch(r){console.error("Error checking availability",r),u.fire({icon:"error",title:"Error",text:"Could not check availability. Please try again."})}},L=a=>{z(a),w(a)};s.reduce((a,r)=>a+parseFloat(r.product.price)*r.quantity,0);const x=parseFloat(n("booking_amount"))||0,j=parseFloat(n("paid_amount"))||0,A=Math.max(x-j,0),R=async a=>{if(Object.values(b).some(r=>!r.available)){u.fire({icon:"warning",title:"Stock Unavailable",text:"Some products are not available on the selected delivery date."});return}if(x<=0){u.fire({icon:"warning",title:"Invalid Booking Amount",text:"Booking amount must be greater than 0."});return}if(j>x){u.fire({icon:"warning",title:"Invalid Paid Amount",text:"Paid amount cannot exceed the booking amount."});return}_(!0);try{const r=f.toLocaleDateString("en-US",{weekday:"short",month:"long",day:"2-digit",year:"numeric"}).replace(",",""),d={...a,delivered_date:r,products:s.map(o=>({product_name:o.product.productName,product_id:o.product.id,quantity:o.quantity,product_price:o.product.price,total_price:parseFloat(o.product.price)*o.quantity,From:o.product.companyName||o.product.shop_name})),total_amount:x,paid_amount:j,pending_payment:A};console.log("Order Data:",d);const c=await K.placeOrder(d,"checkout");console.log("Order placed successfully",c.data),await u.fire({icon:"success",title:"Order Placed Successfully!",text:"Your order has been confirmed. Redirecting to products page...",confirmButtonText:"OK",timer:3e3,timerProgressBar:!0}),F({name:"",email:"",phone:"",address:"",city:"",zip:"",booking_amount:"",paid_amount:""}),P([]),v(""),C({}),T.Inertia.visit("https://event.nikatby.in/user/public/AllProduct")}catch(r){console.error("Error placing order",r),u.fire({icon:"error",title:"Oops...",text:"Error placing the order. Please try again."})}finally{_(!1)}},V=Object.values(n()).filter(a=>a!=="").length,Z=s.some(a=>a.quantity>0)?1:0,$=Math.min((V+Z)/(Object.keys(n()).length+1)*100,100);return e.jsx(J,{children:e.jsxs("div",{className:"max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-indigo-50 via-gray-100 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 min-h-screen",children:[e.jsx("h1",{className:"text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 tracking-tight mb-8",children:"Complete Your Order"}),e.jsx(M,{value:$,className:"mb-8 h-3 rounded-full bg-indigo-200 dark:bg-gray-700 shadow-md"}),s.length===0?e.jsxs("div",{className:"text-center text-gray-500 dark:text-gray-400 text-lg py-6 animate-pulse",children:["No items in cart. ",e.jsx("a",{href:"/AllProduct",className:"text-indigo-600 dark:text-indigo-400 hover:underline",children:"Add some products!"})]}):s.map((a,r)=>{var d,c;return e.jsxs(p,{className:"mb-6 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-indigo-200 dark:border-gray-700",children:[e.jsx(y,{className:"bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 text-gray-800 dark:text-gray-100 font-semibold p-4",children:"Order Summary"}),e.jsx(h,{className:"space-y-4 p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800",children:e.jsxs("div",{className:"flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("h3",{className:"font-semibold text-xl text-gray-800 dark:text-gray-100 tracking-tight",children:a.product.productName}),e.jsx(m,{type:"number",value:a.quantity,...l(`products[${r}].quantity`,{valueAsNumber:!0,min:{value:1,message:"Quantity must be at least 1"},required:"Quantity is required"}),onChange:N=>B(r,"quantity",parseInt(N.target.value)||1),className:"w-24 text-center mt-2 rounded-lg shadow-md border-indigo-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 transition-all duration-300 bg-indigo-50 dark:bg-gray-700"}),S&&e.jsx("p",{className:"text-red-500 dark:text-red-400 text-sm mt-1 animate-pulse",children:S}),((c=(d=t.products)==null?void 0:d[r])==null?void 0:c.quantity)&&e.jsx("p",{className:"text-red-500 dark:text-red-400 text-sm mt-1",children:t.products[r].quantity.message}),b[a.product.id]&&e.jsx("p",{className:`text-sm mt-1 ${b[a.product.id].available?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400 animate-pulse"}`,children:b[a.product.id].message})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"font-semibold text-gray-700 dark:text-gray-300",children:"Price:"}),e.jsxs("span",{className:"text-xl font-bold text-indigo-600 dark:text-indigo-300 flex items-center",children:[e.jsx(k,{size:20})," ",parseFloat(a.product.price).toFixed(2)]})]})]})})]},r)}),s.length>0&&e.jsxs(e.Fragment,{children:[e.jsxs(p,{className:"mb-6 shadow-lg border border-indigo-200 dark:border-gray-700",children:[e.jsx(y,{className:"bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 text-gray-800 dark:text-gray-100 font-semibold p-4",children:"Payment Details"}),e.jsxs(h,{className:"p-6 space-y-6 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800",children:[e.jsxs("div",{className:"flex flex-col sm:flex-row justify-between gap-4",children:[e.jsx("span",{className:"font-semibold text-gray-700 dark:text-gray-300",children:"Booking Amount:"}),e.jsxs("div",{className:"flex flex-col w-full sm:w-32",children:[e.jsx(m,{type:"number",min:"0",step:"0.01",placeholder:"Enter Amount",...l("booking_amount",{valueAsNumber:!0,required:"Booking amount is required",min:{value:.01,message:"Booking amount must be greater than 0"}}),className:"text-center rounded-lg shadow-md border-indigo-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 transition-all duration-300 bg-indigo-50 dark:bg-gray-700"}),t.booking_amount&&e.jsx("p",{className:"text-red-500 dark:text-red-400 text-sm mt-1",children:t.booking_amount.message})]})]}),e.jsxs("div",{className:"flex flex-col sm:flex-row justify-between gap-4",children:[e.jsx("span",{className:"font-semibold text-gray-700 dark:text-gray-300",children:"Paid Amount:"}),e.jsxs("div",{className:"flex flex-col w-full sm:w-32",children:[e.jsx(m,{type:"number",min:"0",step:"0.01",placeholder:"Enter Amount",...l("paid_amount",{valueAsNumber:!0,required:!1,validate:a=>a<0?"Paid amount cannot be negative":a>x?"Paid amount cannot exceed booking amount":!0}),className:"text-center rounded-lg shadow-md border-indigo-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 transition-all duration-300 bg-indigo-50 dark:bg-gray-700"}),t.paid_amount&&e.jsx("p",{className:"text-red-500 dark:text-red-400 text-sm mt-1",children:t.paid_amount.message})]})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"font-semibold text-gray-700 dark:text-gray-300",children:"Remaining Amount:"}),e.jsxs("span",{className:"flex items-center text-indigo-600 dark:text-indigo-300 font-bold text-xl",children:[e.jsx(k,{size:20})," ",A.toFixed(2)]})]})]})]}),e.jsxs(p,{className:"mb-6 shadow-lg border border-indigo-200 dark:border-gray-700",children:[e.jsx(y,{className:"bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 text-gray-800 dark:text-gray-100 font-semibold p-4",children:"Client Details"}),e.jsxs(h,{className:"p-6 space-y-6 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800",children:[e.jsx(m,{...l("name",{required:"Name is required"}),placeholder:"Full Name",defaultValue:i.name,className:"border-indigo-300 dark:border-gray-600 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 transition-all duration-300 bg-indigo-50 dark:bg-gray-700"}),t.name&&e.jsx("p",{className:"text-red-500 dark:text-red-400 text-sm",children:t.name.message}),e.jsx(m,{...l("email",{required:"Email is required",pattern:{value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,message:"Invalid email address"}}),placeholder:"Email Address",defaultValue:i.email,className:"border-indigo-300 dark:border-gray-600 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 transition-all duration-300 bg-indigo-50 dark:bg-gray-700"}),t.email&&e.jsx("p",{className:"text-red-500 dark:text-red-400 text-sm",children:t.email.message}),e.jsx(m,{...l("phone",{required:"Phone number is required",pattern:{value:/^\d{10}$/,message:"Phone number must be 10 digits"}}),placeholder:"Phone Number",defaultValue:i.phone,className:"border-indigo-300 dark:border-gray-600 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 transition-all duration-300 bg-indigo-50 dark:bg-gray-700"}),t.phone&&e.jsx("p",{className:"text-red-500 dark:text-red-400 text-sm",children:t.phone.message})]})]}),e.jsxs(p,{className:"mb-6 shadow-lg border border-indigo-200 dark:border-gray-700",children:[e.jsx(y,{className:"bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 text-gray-800 dark:text-gray-100 font-semibold p-4",children:"Shipping Address"}),e.jsxs(h,{className:"p-6 space-y-6 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800",children:[e.jsx(m,{...l("address",{required:"Address is required"}),placeholder:"Street Address",defaultValue:i.address,className:"border-indigo-300 dark:border-gray-600 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 transition-all duration-300 bg-indigo-50 dark:bg-gray-700"}),t.address&&e.jsx("p",{className:"text-red-500 dark:text-red-400 text-sm",children:t.address.message}),e.jsx(m,{...l("city",{required:"City is required"}),placeholder:"City",defaultValue:i.city,className:"border-indigo-300 dark:border-gray-600 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 transition-all duration-300 bg-indigo-50 dark:bg-gray-700"}),t.city&&e.jsx("p",{className:"text-red-500 dark:text-red-400 text-sm",children:t.city.message}),e.jsx(m,{...l("zip",{required:"ZIP Code is required",pattern:{value:/^\d{6}$/,message:"ZIP Code must be 6 digits"}}),placeholder:"ZIP Code",defaultValue:i.zip,className:"border-indigo-300 dark:border-gray-600 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 transition-all duration-300 bg-indigo-50 dark:bg-gray-700"}),t.zip&&e.jsx("p",{className:"text-red-500 dark:text-red-400 text-sm",children:t.zip.message})]})]}),e.jsxs(p,{className:"mb-6 shadow-lg border border-indigo-200 dark:border-gray-700",children:[e.jsx(y,{className:"bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 text-gray-800 dark:text-gray-100 font-semibold p-4",children:"Delivery Date"}),e.jsxs(h,{className:"p-6 flex flex-col items-center bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800",children:[e.jsx(Y,{onChange:L,value:f,className:"border-indigo-300 dark:border-gray-600 p-4 rounded-lg w-full max-w-md bg-white dark:bg-gray-800 shadow-lg transition-all duration-300",minDate:new Date}),e.jsx("p",{className:"text-sm text-gray-500 dark:text-gray-400 mt-2 italic",children:"Select a date for delivery."})]})]}),e.jsxs(p,{className:"mb-6 shadow-lg border border-indigo-200 dark:border-gray-700",children:[e.jsx(y,{className:"bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 text-gray-800 dark:text-gray-100 font-semibold p-4",children:"Order Preview"}),e.jsxs(h,{className:"p-6 space-y-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"font-semibold text-gray-700 dark:text-gray-300",children:"Name:"}),e.jsx("span",{className:"text-gray-800 dark:text-gray-100",children:n("name")||i.name||"N/A"})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"font-semibold text-gray-700 dark:text-gray-300",children:"Email:"}),e.jsx("span",{className:"text-gray-800 dark:text-gray-100",children:n("email")||i.email||"N/A"})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"font-semibold text-gray-700 dark:text-gray-300",children:"Phone:"}),e.jsx("span",{className:"text-gray-800 dark:text-gray-100",children:n("phone")||i.phone||"N/A"})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"font-semibold text-gray-700 dark:text-gray-300",children:"Address:"}),e.jsx("span",{className:"text-gray-800 dark:text-gray-100",children:n("address")||i.address||"N/A"})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"font-semibold text-gray-700 dark:text-gray-300",children:"City:"}),e.jsx("span",{className:"text-gray-800 dark:text-gray-100",children:n("city")||i.city||"N/A"})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"font-semibold text-gray-700 dark:text-gray-300",children:"ZIP Code:"}),e.jsx("span",{className:"text-gray-800 dark:text-gray-100",children:n("zip")||i.zip||"N/A"})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"font-semibold text-gray-700 dark:text-gray-300",children:"Delivery Date:"}),e.jsx("span",{className:"text-gray-800 dark:text-gray-100",children:f.toLocaleDateString()})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"font-semibold text-gray-700 dark:text-gray-300",children:"Booking Amount:"}),e.jsxs("span",{className:"flex items-center text-indigo-600 dark:text-indigo-300 font-bold",children:[e.jsx(k,{size:20})," ",x.toFixed(2)]})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"font-semibold text-gray-700 dark:text-gray-300",children:"Paid Amount:"}),e.jsxs("span",{className:"flex items-center text-indigo-600 dark:text-indigo-300 font-bold",children:[e.jsx(k,{size:20})," ",j.toFixed(2)]})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"font-semibold text-gray-700 dark:text-gray-300",children:"Remaining Amount:"}),e.jsxs("span",{className:"flex items-center text-indigo-600 dark:text-indigo-300 font-bold",children:[e.jsx(k,{size:20})," ",A.toFixed(2)]})]})]})]}),e.jsx("div",{className:"text-center",children:e.jsxs(H,{onClick:I(R),className:"w-full sm:w-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105",disabled:q||s.length===0||Object.values(b).some(a=>!a.available),children:[e.jsx(G,{className:"h-5 w-5 mr-2"}),q?"Placing Order...":"Place Order"]})})]})]})})}export{oe as default};
