interface HttpResponse<T> {
    code: string;
    success: boolean;
    message: string;
    response: T;
}

export type {
    HttpResponse
}