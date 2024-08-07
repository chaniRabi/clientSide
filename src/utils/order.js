import api from './api'

const GetOrder = async()=>{
    return await api.get('Order/getOrders').then(res => res.data);
}

const getOrderyById = async(id) => {
return await api.get(`Order/getOrderById/${id}`).then(res => res.data);
//`$ {} `-> יצירה של מחרוזת עם התוכן של המשתנה
}

const AddOrder = async(order) => {
return await api.post('Order', order).then(res => res);
}

const RemoveOrder = async(id) => {
return await api.delete(`Order/${id}`).then(res => res.data);
}

const UpdateOrder = async(id, orderUpdate) => {
return await api.put(`Order/${id}`, orderUpdate).then(res => res);
}

export {GetOrder,getOrderyById, AddOrder,RemoveOrder, UpdateOrder}

