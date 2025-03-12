import{r as x,j as e}from"./app-CmNGHMgD.js";import{L as k}from"./Layout-inlkwQ-H.js";import{u as V}from"./index.esm-DuMQAT87.js";import{P as Z,C as $,S as P}from"./Calendar-Bhi2iQWw.js";import{I as o,B}from"./input-CQIHlvbZ.js";import{C as p,a as j,b as f,c as L}from"./card-BvS_PUES.js";import{p as T}from"./product-DwOrzx4W.js";import{o as U}from"./orders-C9xK-6C1.js";import{d as Q}from"./index-Cy6Hg7Ku.js";import{I as b}from"./indian-rupee-DWpstkXT.js";import"./index-BXoZ3Dc8.js";function R({id:h}){const{register:c,handleSubmit:q,setValue:C,watch:n,formState:{errors:t},reset:S}=V(),[u,N]=x.useState([]),[v,y]=x.useState(""),[r,A]=x.useState({name:"",email:"",phone:"",address:"",city:"",zip:""}),[g,D]=x.useState(new Date);x.useEffect(()=>{(async()=>{try{const l=await T.getProductById(h);N([l.product])}catch(l){console.error(l)}})();const a=JSON.parse(localStorage.getItem("userInfo"));a&&A(a)},[h]);const I=(s,a,l)=>{const d=[...u];l>d[s].stock_quantity?y("Quantity exceeds available stock."):(y(""),d[s][a]=l,N(d),C(`products[${s}].quantity`,l))},m=u.reduce((s,a)=>s+parseFloat(a.price)*a.quantity,0),_=parseFloat(n("paid_amount"))||0,w=Math.max(m-_,0),O=async s=>{try{const a=g.toLocaleDateString("en-US",{weekday:"short",month:"long",day:"2-digit",year:"numeric"}).replace(",",""),l={...s,delivered_date:a,products:u.map(i=>({product_name:i.productName,product_id:i.id,quantity:i.quantity,product_price:i.price,total_price:parseFloat(i.price)*i.quantity,From:i.companyName||i.shop_name})),total_amount:m,pending_payment:w},d=await U.placeOrder(l);console.log("Order placed successfully",d),d.status===201&&(await P.fire({icon:"success",title:"Order Placed Successfully!",text:"Thank you for your order. You will be redirected to the home page.",confirmButtonText:"OK",timer:3e3,timerProgressBar:!0}),Q.Inertia.visit("http://127.0.0.1:8001/Userlogin")),S({name:"",email:"",phone:"",address:"",city:"",zip:"",paid_amount:""}),N([]),y("")}catch(a){console.error("Error placing order",a),P.fire({icon:"error",title:"Oops...",text:"Error placing the order. Please try again."})}};let z=Object.values(n()).filter(s=>s!=="").length,E=u.some(s=>s.quantity>0)?1:0,F=Math.min((z+E)/(Object.keys(n()).length+1)*100,100);return e.jsxs("div",{className:"max-w-3xl mx-auto lg:p-6 p-2",children:[e.jsx("h1",{className:"text-2xl font-semibold mb-4",children:"Complete Your Order"}),e.jsx(Z,{value:F,className:"mb-6"}),u.map((s,a)=>{var l,d;return e.jsxs(p,{className:"mb-4 shadow-lg",children:[e.jsx(j,{className:"bg-blue-100 text-black font-semibold",children:"Order Summary"}),e.jsx(f,{className:"space-y-3",children:e.jsxs("div",{className:"flex items-center justify-between space-x-4",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("h3",{className:"font-semibold",children:s.productName}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("label",{children:"Qty"}),e.jsx(o,{type:"number",value:s.quantity||"",...c(`products[${a}].quantity`,{valueAsNumber:!0,min:1,required:"Quantity is required"}),onChange:i=>I(a,"quantity",parseInt(i.target.value)||1),className:"w-20 text-center"}),v&&e.jsx("p",{className:"text-red-500 text-sm",children:v}),((d=(l=t.products)==null?void 0:l[a])==null?void 0:d.quantity)&&e.jsx("p",{className:"text-red-500 text-sm",children:t.products[a].quantity.message})]})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("span",{className:"font-semibold",children:"Price:"}),e.jsxs("span",{className:"lg:text-xl text-sm font-bold flex items-center",children:[e.jsx(b,{size:15})," ",s.price]})]})]})})]},a)}),e.jsx(p,{className:"mb-4 shadow-lg",children:e.jsxs(L,{className:"flex flex-col space-y-2 font-bold",children:[e.jsxs("div",{className:"flex justify-between w-full",children:[e.jsx("span",{children:"Total Price:"}),e.jsxs("span",{className:"flex items-center",children:[e.jsx(b,{size:15}),m.toFixed(2)]})]}),e.jsxs("div",{className:"flex justify-between w-full",children:[e.jsx("span",{children:"Paid Amount:"}),e.jsx(o,{type:"number",min:"0",max:m,placeholder:"Enter Paid Amount",...c("paid_amount",{valueAsNumber:!0,required:"Paid amount is required",validate:s=>s>=0&&s<=m?!0:`Paid amount must be between 0 and the total amount (${m.toFixed(2)}).`}),className:"w-24 text-center"}),t.paid_amount&&e.jsx("p",{className:"text-red-500 text-sm",children:t.paid_amount.message})]}),e.jsxs("div",{className:"flex justify-between w-full",children:[e.jsx("span",{children:"Remaining Amount:"}),e.jsxs("span",{className:"flex items-center",children:[e.jsx(b,{size:15}),w.toFixed(2)]})]})]})}),e.jsxs(p,{className:"mb-4 shadow-lg",children:[e.jsx(j,{className:"bg-blue-100 text-black font-semibold",children:"Client Details"}),e.jsxs(f,{className:"space-y-3",children:[e.jsx(o,{...c("name",{required:"Name is required"}),placeholder:"Full Name",defaultValue:r.name,className:"border p-2 rounded-lg"}),t.name&&e.jsx("p",{className:"text-red-500 text-sm",children:t.name.message}),e.jsx(o,{...c("email",{required:"Email is required",pattern:{value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,message:"Invalid email address"}}),placeholder:"Email Address",defaultValue:r.email,className:"border p-2 rounded-lg"}),t.email&&e.jsx("p",{className:"text-red-500 text-sm",children:t.email.message}),e.jsx(o,{...c("phone",{required:"Phone number is required",pattern:{value:/^\d{10}$/,message:"Phone number must be 10 digits"}}),placeholder:"Phone Number",defaultValue:r.phone,className:"border p-2 rounded-lg"}),t.phone&&e.jsx("p",{className:"text-red-500 text-sm",children:t.phone.message})]})]}),e.jsxs(p,{className:"mb-4 shadow-lg",children:[e.jsx(j,{className:"bg-blue-100 text-black font-semibold",children:"Shipping Address"}),e.jsxs(f,{className:"space-y-3",children:[e.jsxs("div",{children:[e.jsx(o,{...c("address",{required:"Address is required"}),placeholder:"Street Address",defaultValue:r.address,className:"border p-2 rounded-lg w-full"}),t.address&&e.jsx("p",{className:"text-red-500 text-sm",children:t.address.message})]}),e.jsxs("div",{children:[e.jsx(o,{...c("city",{required:"City is required"}),placeholder:"City",defaultValue:r.city,className:"border p-2 rounded-lg w-full"}),t.city&&e.jsx("p",{className:"text-red-500 text-sm",children:t.city.message})]}),e.jsxs("div",{children:[e.jsx(o,{...c("zip",{required:"ZIP Code is required",pattern:{value:/^[0-9]{5,6}$/,message:"Enter a valid ZIP Code"}}),placeholder:"ZIP Code",defaultValue:r.zip,className:"border p-2 rounded-lg w-full"}),t.zip&&e.jsx("p",{className:"text-red-500 text-sm",children:t.zip.message})]})]})]}),e.jsxs(p,{className:"mb-4 shadow-lg",children:[e.jsx(j,{className:"bg-blue-100 text-black font-semibold",children:"Delivered Date"}),e.jsxs(f,{className:"w-full flex flex-col items-center",children:[e.jsx($,{onChange:D,value:g,className:"border p-2 rounded-lg w-full"}),e.jsx("p",{className:"text-sm text-gray-500 mt-2",children:"Select a date for delivery."})]})]}),e.jsxs("div",{className:"mb-6 p-4 border rounded-lg shadow-lg bg-gray-50",children:[e.jsx("h3",{className:"text-xl font-semibold text-gray-700 mb-4",children:"Preview Your Order"}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"font-semibold",children:"Name:"}),e.jsx("span",{children:n("name")||r.name})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"font-semibold",children:"Email:"}),e.jsx("span",{children:n("email")||r.email})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"font-semibold",children:"Phone:"}),e.jsx("span",{children:n("phone")||r.phone})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"font-semibold",children:"Address:"}),e.jsx("span",{children:n("address")||r.address})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"font-semibold",children:"City:"}),e.jsx("span",{children:n("city")||r.city})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"font-semibold",children:"ZIP Code:"}),e.jsx("span",{children:n("zip")||r.zip})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"font-semibold",children:"Delivery Date:"}),e.jsx("span",{children:g.toLocaleDateString()})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"font-semibold",children:"Total Amount:"}),e.jsxs("span",{children:[e.jsx(b,{size:15})," ",m.toFixed(2)]})]})]})]}),e.jsx("div",{className:"text-center",children:e.jsx(B,{onClick:q(O),className:"w-full",children:"Place Order"})})]})}function te({id:h}){return e.jsx(k,{children:e.jsx(R,{id:h})})}export{te as default};
