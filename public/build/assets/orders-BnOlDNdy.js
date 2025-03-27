import{a as t}from"./app-CR_XZUGx.js";const s="/api/order",a={getAllOrders:async()=>{try{return(await t.get(s)).data}catch(r){throw console.error("Error fetching orders:",r),r}},getUserOrders:async()=>{try{return(await t.get(`${s}/user/order`)).data}catch(r){throw console.error("Error fetching user orders:",r),r}},getOrderById:async r=>{try{return(await t.get(`${s}/${r}`)).data}catch(e){throw console.error(`Error fetching order ${r}:`,e),e}},placeOrder:async(r,e)=>{try{return await t.post(s,{...r,type:e})}catch(o){throw console.error("Error placing order:",o),o}},updatePayment:async(r,e)=>{try{return(await t.put(`${s}/${r}`,{payment_amount:e})).data}catch(o){throw console.error(`Error updating payment for order ${r}:`,o),o}},cancelOrder:async r=>{try{return(await t.post(`${s}/${r}`)).data}catch(e){throw console.error(`Error deleting order ${r}:`,e),e}}};export{a as o};
