import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../layouts/Loader";

export default function ProductedRoute({children, isAdmin, isSeller,isManager}){
    const { isAuthenticated, loading, user }= useSelector(state => state.authState);
    if(loading){
        return <Loader/>
    }
    if(!isAuthenticated ){
       return <Navigate to={"/Login"}/>
    }

    if(isAuthenticated){
        if(isAdmin == true && user?.role !== 'admin'){
            return <Navigate to={'/'} />
        }
        if(isSeller == true && user?.role !== 'seller'){
            return <Navigate to={'/'} />
        }
        if(isManager == true && user?.role !== 'manager'){
            return <Navigate to={'/'} />
        }
        return children;
    }



    return children;
}

