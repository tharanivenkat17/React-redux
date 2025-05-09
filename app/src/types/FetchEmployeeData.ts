export interface FormDataList{
    id: number;
    name: string;
    email: string;
    employeeID: string | number;
    branch: string;
    designation: string;
}

export interface UsersState {
    data: FormDataList[];
    status: 'idle' | 'loading' | 'success' | 'failed';
    error: string | null;
}

export interface LoginState {
    email: string;
    password: string;
    error: string;
}