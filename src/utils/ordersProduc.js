import api from './api'

const GetOrdersProduct = async()=>{
    return await api.get('OrdersProduct/getOrdersProduct').then(res => res.data);
}

const GetOrdersProductById = async(id) => {
return await api.get(`OrdersProduct/getOrdersProductById/${id}`).then(res => res.data);
//`$ {} `-> יצירה של מחרוזת עם התוכן של המשתנה
}

const AddOrderProduct = async(OrderProduct) => {
    // api.post('Category/AddCategory', category) - מקבל category כי בפונקציה של הקונטרולר הוא fromBody 
return await api.post('OrdersProduct/AddOrderProduct', OrderProduct).then(res => res.data);
}

const RemoveOrdersProduct = async(id) => {
return await api.delete(`OrdersProduct/${id}`).then(res => res.data);
}

const UpdateOrdersProduct = async(id, ordersProductUpdate) => {
return await api.put(`OrdersProduct/${id}`, ordersProductUpdate).then(res => res.data);
}

export {GetOrdersProduct,GetOrdersProductById, AddOrderProduct,RemoveOrdersProduct, UpdateOrdersProduct}

