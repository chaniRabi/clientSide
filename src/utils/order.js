import api from './api'

const GetOrder = async()=>{
    return await api.get('Order/GetOrder').then(res => res.data);
}

const getOrderyById = async(id) => {
return await api.get(`Order/getOrderById/${id}`).then(res => res.data);
//`$ {} `-> יצירה של מחרוזת עם התוכן של המשתנה
}

const AddOrder = async(order) => {
    // api.post('Category/AddCategory', category) - מקבל category כי בפונקציה של הקונטרולר הוא fromBody 
return await api.post('Order/AddOrder', order).then(res => res.data);
}

const RemoveOrder = async(id) => {
return await api.delete(`Order/${id}`).then(res => res.data);
}

const UpdateOrder = async(id, orderUpdate) => {
return await api.put(`Order/${id}`, orderUpdate).then(res => res.data);
}

export {GetOrder,getOrderyById, AddOrder,RemoveOrder, UpdateOrder}

