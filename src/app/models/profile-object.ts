export interface ProfileNavigationObject {
    0?: ProfileObject;
    navigationId?: number;
}

export interface ProfileObject {
    email: string;
    password: string;
    name: string;
    passwordConfirm: string;
    id: number;
}

