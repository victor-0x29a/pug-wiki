import {
    object,
    string
} from 'yup'

export const ICategorySchema = object().shape({
    label: string().max(20).required('A label é obrigatória.').typeError('Confira a label, ela é obrigatória e deve ser um texto.'),
    slug: string().max(30).required('O slug é obrigatório.').typeError('Confira o slug, ele é obrigatório e deve ser um texto.')
})