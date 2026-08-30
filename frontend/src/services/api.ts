const API_URL = import.meta.env.VITE_API_URL;

type RequestOptions = {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: unknown;
    headers?: Record<string, string>;
};

const apiRequest = async <T = unknown>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
    const url = `${API_URL}${endpoint}`;

    const defaultHeaders = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    const response = await fetch(url, {
        method: options.method ?? "GET",
        headers: defaultHeaders,
        body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    });

    // Safely parse JSON or fallback if response is empty/non-JSON
    let data: any = null;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        data = await response.json().catch(() => null);
    }

    if (!response.ok) {
        throw new Error(data?.message || `Request failed with status ${response.status}`);
    }

    return data as T;
};

export {
    apiRequest
};