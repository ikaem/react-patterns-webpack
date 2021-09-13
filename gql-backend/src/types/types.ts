export type User = {
    username: string;
    password: string;
    email: string;
    privilege: string;
    active: boolean;
};

// NOT Sure how this is good
export type TSequelize = {
    _defaults?: any;
    name?: string;
    options?: any;
    associate?: any;
};
