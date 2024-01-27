export const isStaging = process.env.NODE_ENV === 'dev'
export const itemsNavBar = [
    {
        label: "Categorias",
        href: "/category"
    },
    {
        label: "Ajude a manter",
        href: "/help"
    },
    {
        label: "Entrar",
        href: "/auth/signin"
    }
]