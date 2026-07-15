export interface LoginForm{
    email:string;
    password:string;
}

export interface RegisterForm {
    name:string;
    email:string;
    password:string;
    confirmPassword:string;
}

export interface AuthResponse {
    token:string;
    user:{
        id:string;
        name:string;
        email:string;
    }
}

export interface ApiError {
    message:string;
    statusCode:number;
}

export interface User {
    id:string;
    name:string;
    email:string;
}

export interface UserProfile {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
}

export interface DashboardData {
    message: string;
    user: UserProfile;
}