import * as yup from 'yup';

export const validationSchema = yup.object({
    fullname: yup.string().required('Full Name is required'),
    address1: yup.string().required('Address Line 1 is required'),
    address2: yup.string().required(),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    zip: yup.string().required('Zip Code is required'),
    country: yup.string().required('Country is required'),
})
    

