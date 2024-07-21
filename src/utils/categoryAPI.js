import api from './api'

const GetCategories = async()=>{
    return await api.get('Category/GetCategories').then(res => res.data);
}

const getCategoryById = async(id) => {
return await api.get(`Category/getCategoryById/${id}`).then(res => res.data);
//`$ {} `-> יצירה של מחרוזת עם התוכן של המשתנה
}

const AddCategory = async(category) => {
    // api.post('Category/AddCategory', category) - מקבל category כי בפונקציה של הקונטרולר הוא fromBody 
return await api.post('Category/AddCategory', category).then(res => res.data);
}

const RemoveCategory = async(id) => {
return await api.delete(`Category/${id}`).then(res => res.data);
}

const UpdateCategory = async(id, categoryUpdate) => {
return await api.put(`Category/${id}`, categoryUpdate).then(res => res.data);
}

export {GetCategories,getCategoryById, AddCategory,RemoveCategory, UpdateCategory}



