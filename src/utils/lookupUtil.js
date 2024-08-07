import api from './api';

const GetContcts = async()=> {
    return await api.get('Lookup/GetContcts').then(res => res.data);
}

const AddContct = async(data)=>{
    return await api.post('Lookup/AddContct', data).then(res => res);
}

const GetAllStatus = async()=>{
    return await api.get('Lookup/Status').then(res => res.data);
}

export {GetContcts, AddContct, GetAllStatus}