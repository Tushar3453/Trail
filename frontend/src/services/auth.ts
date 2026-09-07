import { apiRequest } from "./api";
import type { ApiResponse } from "../types/api";
import type { LoginData, SignupData } from "../schemas/auth";

interface LoginPayload {
    message: string;
    token: string;
}

interface SignupPayload {
    message: string;
}

const login = async (
    data: LoginData
): Promise<ApiResponse<LoginPayload>> => {
    const response = await apiRequest<ApiResponse<LoginPayload>>('/auth/login', {
        method: 'POST',
        body: data,
    });
    return response;
};

const signup = async (
    data: SignupData
): Promise<ApiResponse<SignupPayload>> => {
    const response = await apiRequest<ApiResponse<SignupPayload>>('/auth/register', {
        method: 'POST',
        body: data,
    });
    return response;
};

export {
    login,
    signup
};