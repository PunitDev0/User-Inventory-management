import{a as t}from"./app-Cw4dLWkH.js";const e="https://crm.aryanevents.com/user/public/api/products",s="https://crm.aryanevents.com/user/public/api/categories",a={getAllProducts:async()=>t.get(e),getCategories:async()=>t.get(s),getProductById:async o=>{try{return(await t.get(`${e}/${o}`)).data}catch(r){throw console.error(`Error fetching order ${orderId}:`,r),r}}};export{a as p};
