import api from './api'

const GetProductsInCartByUserId = async(userId)=>{
    return await api.get(`ProductInCart/GetProductsInCartByUserId/${userId}`).then(res => res.data);
}

const GetCartById = async(id) => {
return await api.get(`ProductInCart/${id}`).then(res => res.data);
//`$ {} `-> יצירה של מחרוזת עם התוכן של המשתנה
}

const AddProductToCart = async(produc) => {
    // api.post('Category/AddCategory', category) - מקבל category כי בפונקציה של הקונטרולר הוא fromBody 
return await api.post('ProductInCart', produc).then(res => res);
}

const RemoveProductFromCart = async (id) => {
    return await api.delete(`ProductInCart/${id}`).then(res => res.data);
}

const ClearCart = async (userId)=>{
    return await api.delete(`ProductInCart/clearCart/${userId}`).then(res => res.data);
}


// const RemoveProduct = async(id) => {
// return await api.delete(`ProductInCart/${id}`).then(res => res.data);
// }

const UpdateProduct = async(id, productUpdate) => {
return await api.put(`ProductInCart/${id}`, productUpdate).then(res => res);
}

export {GetProductsInCartByUserId,GetCartById, AddProductToCart,RemoveProductFromCart, UpdateProduct,ClearCart};

