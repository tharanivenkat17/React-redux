export interface User {
    id: number;
    name: string;
    email: string;
}

export interface UserState {
    data: User[];
    status: 'idle' | 'loading' | 'success' | 'failed';
    error: string | null;
    admin : boolean
}