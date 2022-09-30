export interface IChangePassword {
    token: string;
    email: string;
    oldPassword: string;
    newPassword: string;
}