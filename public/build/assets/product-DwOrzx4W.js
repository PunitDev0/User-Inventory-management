import{a as t}from"./app-CmNGHMgD.js";const e="/api/products",s="/api/categories",c={getAllProducts:async()=>t.get(e),getCategories:async()=>t.get(s),getProductById:async o=>{try{return(await t.get(`${e}/${o}`)).data}catch(r){throw console.error(`Error fetching order ${orderId}:`,r),r}}};export{c as p};
