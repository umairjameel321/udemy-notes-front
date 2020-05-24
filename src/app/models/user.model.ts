export interface RegisterUser {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
}

export interface RegisterUserResponse {
    email: string;
    firstname: string;
    id: string;
    lastname: string;
    role: string;
    username: string;
}

export interface LoginUser {
    email: string;
    password: string;
}

export interface LoginResponse {
    created: string;
    emailVerified: boolean;
    id: string;
    responseCode: number;
    role: string;
    superuser: {
        id :string;
        rootUserId: string;
        username: string;
    },
    superuserId: string;
    ttl:number;
    userId: string;
}