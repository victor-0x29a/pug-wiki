import {
    object,
    string
} from 'yup'

const REQUIRED_LABEL = 'A label é obrigatória.'
const TYPE_ERROR_LABEL = 'Confira a label, ela é obrigatória e deve ser um texto.'

const REQUIRED_SLUG = 'O slug é obrigatório.'
const TYPE_ERROR_SLUG = 'Confira o slug, ele é obrigatório e deve ser um texto.'

const labelSchema = string().max(20).required(REQUIRED_LABEL).typeError(TYPE_ERROR_LABEL)
const slugSchema = string().max(30).required(REQUIRED_SLUG).typeError(TYPE_ERROR_SLUG)

export const ICategorySchema = object().shape({
    label: labelSchema,
    slug: slugSchema
})

export const ICategoryFindSchema = object().shape({
    slug: slugSchema
})