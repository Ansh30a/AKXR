export interface User {
    _id: string;
    firstName: string;
    lastName?: string;
    email: string;
    password?: string;
    age: number;
    gender: string;
    photoUrl?: string;
    bio: string;
    skills: string[];
    createdAt?: string;
    updatedAt?: string;
}
