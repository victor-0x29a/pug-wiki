export const isStaging = process.env.NODE_ENV === 'dev'
export const defaultItemsNavBar = [
    {
        label: "Categorias",
        href: "/category"
    },
    {
        label: "Ajude a manter",
        href: "/help"
    }
]
export const itemsNavBar = [
    ...defaultItemsNavBar,
    {
        label: "Entrar",
        href: "/auth/signin"
    }
]
export const itemsNavBarLogged = [
    ...defaultItemsNavBar,
    {
        label: "Meu perfil",
        href: "/me"
    }
]
