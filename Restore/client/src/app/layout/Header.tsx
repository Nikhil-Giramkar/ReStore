import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
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

export default function Header({ darkMode, handleThemeChange }: Props) {
    return (
        <>
            <AppBar position="static" sx={{ mb: 4 }}>
                <Toolbar>
                    <Typography variant='h6'>RE-STORE</Typography>
                    <Switch checked={darkMode} onChange={handleThemeChange} />

                    <List sx={{ display: 'flex' }}>
                        {midLinks.map(({ title, path }) => (
                            <ListItem
                                component={NavLink} // List Item rendered as NavLink
                                to={path} //to property specifies path to navigate to
                                key={path} //Need to add a key
                                sx={{ color: 'inherit', typography: 'h6' }}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>

                    <IconButton size="large" edge='start' color='inherit' sx={{ mr: 2 }}>
                        <Badge badgeContent={5} color="secondary">          
                            <ShoppingCart />
                        </Badge>
                    </IconButton>

                    <List sx={{ display: 'flex' }}>
                        {rightLinks.map(({ title, path }) => (
                            <ListItem
                                component={NavLink} // List Item rendered as NavLink
                                to={path} //to property specifies path to navigate to
                                key={path} //Need to add a key
                                sx={{ color: 'inherit', typography: 'h6' }}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>


                </Toolbar>
            </AppBar>
        </>
    )
}