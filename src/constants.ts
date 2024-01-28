export const isStaging = process.env.NODE_ENV === 'dev'
export const walletBTC = process.env.WALLET_BTC
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
        href: "/user/me"
    }
]
export const itemsNavBarAdmin = [
    ...itemsNavBarLogged,
    {
        label: "Administrar",
        href: "/backoffice/admin"
    }
]
export const USER_LEVEL = 1
export const ADMIN_LEVEL = 2