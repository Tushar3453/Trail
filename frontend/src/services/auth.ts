import { apiRequest } from "./api";
import type { ApiResponse } from "../types/api";

interface LoginData {
    email: string;
    password: string;
}

interface AuthPayload {
    message: string;
    token: string;
}

const login = async (
    data: LoginData
): Promise<ApiResponse<AuthPayload>> => {
    const response = await apiRequest<ApiResponse<AuthPayload>>('/auth/login', {
        method: 'POST',
        body: data,
    });
    return response;
};

const signup = async () => {

};

export {
    login,
    signup
};