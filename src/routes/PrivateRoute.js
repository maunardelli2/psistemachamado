import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from '../contexts/auth';

/*function RouterWrapper({
    component: Component,
    isPrivate,
    ...rest //passa todo o restante dos parametros
}) {

    const loading = false;
    const signed = false;

    if (loading) {
        return (
            <div></div>
        )
    }

    //Se nao estiver logado e a rota dele é privada
    if (!signed && isPrivate) {
        return <Navigate to="/" />
    }

    if (signed && !isPrivate) {
        return <Navigate to="/dashboard" />
    }

    return (
        <Route
            {...rest}
            render = { props => (
                <Component {...props}/>    
            )}
        />
    )
}

export default RouterWrapper;*/

const PrivateRoute = ( { children, isPrivate  } ) => {

    const { signed, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div></div>
        )
    }

    //Se nao estiver logado e a rota dele é privada
    if (!signed && isPrivate) {
        return <Navigate to="/" />
    }

    if (signed && !isPrivate) {
        return <Navigate to="/dashboard" />
    }

    return children;
}

export default PrivateRoute;