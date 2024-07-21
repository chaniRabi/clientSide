import api from './api';

const GetContcts = async()=> {
    return await api.get('Lookup/GetContcts').then(res => res.data);
}

export {GetContcts}