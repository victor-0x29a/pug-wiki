import {
    number,
    object,
    string
} from 'yup'

export const IUserSchema = object().shape({
    username: string().required('O nome de usuário é obrigatório.').min(5, 'O nome de usuário deve ter no mínimo 5 caracteres.').max(20, 'O nome de usuário deve ter no máximo 20 caracteres.').typeError('O nome de usuário é obrigatório e deve ser um valor textual.'),
    password: string().required('A senha é obrigatória').min(8, 'A senha deve ter no mínimo 8 caracteres.').max(50, 'A senha deve ter no máximo 50 caracteres.').typeError('A senha é obrigatória e deve ser um valor textual.'),
    user_agent: string().max(255, 'O user_agent deve ter no máximo 255 caracteres.').optional().nullable().typeError('O user_agent deve ser textual.'),
    permission: number().oneOf([1, 2], 'Coloque o nível de permissão correto.')
})