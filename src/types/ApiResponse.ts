export interface FieldError {
  field: string;
  message: string;
}

export type ApiErrorDetail = null | FieldError[] | Record<string, any>;

export type ApiSuccessResponse<T> = {
  status: 'success';
  data: T;
};

export type ApiErrorResponse = {
  status: 'error';
  error: { message: string };
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface ApiError {
  message: string;
  code?: number | string;
  error?: any;
}


export interface PaginationData<T> {
  content: T[];
  hasNext: boolean;
  page: number;
  size: number;
}

export type InfiniteApiResponse<T> = ApiResponse<PaginationData<T>>;
