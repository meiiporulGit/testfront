
interface Menu {
    title: string;
    path: string ;   
}

export const menuItems : Array<Menu> = [
    {
        title: 'Profile',
        path: '/provider',
    },
    {
        title: 'PriceListing',
        path: '/patient',
    },
    {
        title: 'Review PriceListing',
        path: '/payer',
    },
    
]