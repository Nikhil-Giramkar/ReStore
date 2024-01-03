import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/configureStore"

export default function RequireAuth()
{   
    const {user} = useAppSelector(state =>  state.account);
    const location = useLocation();

    if(!user)
        return <Navigate to='/login' state={{from: location}} /> //State property will store the location of this page
    
    return <Outlet />
}