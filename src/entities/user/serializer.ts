import {
    number,
    object,
    string,
    ref
} from 'yup'

const REQUIRED_PASSWORD = 'A senha é obrigatória'
const MIN_PASSWORD = 'A senha deve ter no mínimo 8 caracteres.'
const MAX_PASSWORD = 'A senha deve ter no máximo 50 caracteres.'
const TYPE_ERROR_PASSWORD = 'A senha é obrigatória e deve ser um texto.'

const REQUIRED_REPEATED_PASSWORD = 'A senha de confirmação é obrigatória.'
const TYPE_ERROR_REPEATED_PASSWORD = 'A senha de confirmação é obrigatória e deve ser um texto.'
const DIFF_REPEATED_PASSWORD = 'As senhas não coincidem.'

const REQUIRED_USERNAME = 'O nome de usuário é obrigatório.'
const MIN_USERNAME = 'O nome de usuário deve ter no mínimo 5 caracteres.'
const MAX_USERNAME = 'O nome de usuário deve ter no máximo 20 caracteres.'
const TYPE_ERROR_USERNAME = 'O nome de usuário é obrigatório e deve ser um texto.'

const MAX_USER_AGENT = 'O user_agent deve ter no máximo 255 caracteres.'
const TYPE_ERROR_USER_AGENT = 'O user_agent deve ser textual.'

const INCORRECT_PERMISSION_LEVEL = 'Coloque o nível de permissão correto.'

export const IUserSchema = object().shape({
    username: string().required(REQUIRED_USERNAME).min(5, MIN_USERNAME).max(20, MAX_USERNAME).typeError(TYPE_ERROR_USERNAME),
    password: string().required(REQUIRED_PASSWORD).min(8, MIN_PASSWORD).max(50, MAX_PASSWORD).typeError(TYPE_ERROR_PASSWORD),
    repeatedPassword: string()
        .oneOf([ref('password')], DIFF_REPEATED_PASSWORD)
        .required(REQUIRED_REPEATED_PASSWORD)
        .typeError(TYPE_ERROR_REPEATED_PASSWORD),
    user_agent: string().max(255, MAX_USER_AGENT).optional().nullable().typeError(TYPE_ERROR_USER_AGENT),
    permission: number().oneOf([1, 2], INCORRECT_PERMISSION_LEVEL)
})
