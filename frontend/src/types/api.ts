export interface ApiResponse<T> {
    status: number | string;
    data: T;
}