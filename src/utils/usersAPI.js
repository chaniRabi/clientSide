import api from './api'

const GetUsers = async()=>{
    return await api.get('User/getUsers').then(res => res.data);
}

const GetUserById = async(id) => {
return await api.get(`User/getUserById/${id}`).then(res => res.data);
//`$ {} `-> יצירה של מחרוזת עם התוכן של המשתנה
}

const Login = async(userLogin) => {
return await api.post('User/login', userLogin).then(res => res);
}

const AddUser = async(user) => {
    // api.post('User/addUser', user) - מקבל user כי בפונקציה של הקונטרולר הוא fromBody 
return await api.post('User/addUser', user).then(res => res);
}

const RemoveUser = async(id) => {
return await api.delete(`User/${id}`).then(res => res.data);
}

const UpdateUser = async(id, userUpdate) => {
    // api.put(`User/${id}`, userUpdate) - מקבל user כי בפונקציה של הקונטרולר הוא fromBody 
return await api.put(`User/${id}`, userUpdate).then(res => res.data);
}

export {GetUsers,GetUserById,Login, AddUser, RemoveUser, UpdateUser}



