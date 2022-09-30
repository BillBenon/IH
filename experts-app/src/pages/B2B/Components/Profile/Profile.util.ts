const invalidURL = "Invalid Meeting URL";
const invalidEmail = "Invalid email address";

const requiredErrorText = (field: string) => `${field} is required`;

export const validateText = (value: any, field: string) => {
    let error;
    if (!value) {
        error = requiredErrorText(field);
    }
    return error;
};

export const validateEmail = (value: any) => {
    let error;
    if (!value) {
        error = requiredErrorText('Email');
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = invalidEmail;
    }
    return error;
};

export const validateURL = (value: string) => {
    let error;
    if (!value) {
        error = requiredErrorText('Meeting URL');
    } else if (!/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i.test(value)) {
        error = invalidURL;
    }
    return error;
}