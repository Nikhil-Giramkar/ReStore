import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
// import { useStoreContext } from "../context/StoreContext";
import { useAppSelector } from "../store/configureStore";
import SignedInMenu from "./SignedInMenu";
interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

const midLinks = [
    { title: 'catalog', path: '/catalog' },
    { title: 'about', path: '/about' },
    { title: 'contact', path: '/contact' },
]

const rightLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' },
]


const navLinkStyles = {
    color: 'inherit',
    textDecoration: 'none',
    typography: 'h6',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'text.primary'
    }
}
export default function Header({ darkMode, handleThemeChange }: Props) {
    const { basket } = useAppSelector(state => state.basket);
    const { user } = useAppSelector(state => state.account);
    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <>
            <AppBar position="static" sx={{ mb: 4 }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>


                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant='h6'
                            component={NavLink}
                            to='/'
                            sx={navLinkStyles}>
                            RE-STORE
                        </Typography>
                        <Switch checked={darkMode} onChange={handleThemeChange} />
                    </Box>



                    <List sx={{ display: 'flex' }}>
                        {midLinks.map(({ title, path }) => (
                            <ListItem
                                component={NavLink} // List Item rendered as NavLink
                                to={path} //to property specifies path to navigate to
                                key={path} //Need to add a key
                                sx={navLinkStyles}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>



                    <Box sx={{ display: 'flex', alignItems: 'center' }}>

                        <IconButton component={Link} to='/basket' size="large" edge='start' color='inherit' sx={{ mr: 2 }}>
                            <Badge badgeContent={itemCount} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                        {user
                            ? (<SignedInMenu />)
                            : (
                                <List sx={{ display: 'flex' }}>
                                    {rightLinks.map(({ title, path }) => (
                                        <ListItem
                                            component={NavLink} // List Item rendered as NavLink
                                            to={path} //to property specifies path to navigate to
                                            key={path} //Need to add a key
                                            sx={navLinkStyles}
                                        >
                                            {title.toUpperCase()}
                                        </ListItem>
                                    ))}
                                </List>
                            )}

                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}