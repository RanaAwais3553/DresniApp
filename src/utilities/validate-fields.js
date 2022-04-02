import validator from '../validation/validator'

export const validateFields = async (value, type, func) => {
    let error = await validator(type, value);

    error ? func(error) : func('');
    return error;
}