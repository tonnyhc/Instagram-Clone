import { post } from "../api/api"

export const login = async (body) => {
    try{
        const data = await post('accounts/login/', body);
        return data;

    } catch(e){
        throw e;
    }
};

export const register = async (body) => {
    try{
        const data = await post('accounts/register/', body);
        return data;
    } catch(e){
        throw e;
    }
};

export const submitRegisterConfirmationCode = async (code, email) => {
    try{
        const body = {
            'code':code
        }
        const data = await post(`accounts/confirm-email/${email}/`, body);
        return data;
    }
    catch(e){
        throw e;
    };
}