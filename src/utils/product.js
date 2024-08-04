import api from './api'


const GetProducts = async()=>{
    return await api.get(`Product/getProducts`).then(res => res.data);
}


const GetproductById = async(id) => {
return await api.get(`Product/getProductById/${id}`).then(res => res.data);
}

const GetProductsByCategoryId = async(categoryId) =>{
 return await api.get(`Product/getProductByCategoryId/${categoryId}`).then(res => res.data);
}

const AddProduct = async(produc) => {
return await api.post('Product', produc).then(res => res.data);
}

const RemoveProduct = async(id) => {
return await api.delete(`Product/${id}`).then(res => res.data);
}

const UpdateProduct = async(id, productUpdate) => {
return await api.put(`Product/${id}`, productUpdate).then(res => res.data);
}

export {AddProduct, GetProducts, RemoveProduct, UpdateProduct, GetProductsByCategoryId, GetproductById}

