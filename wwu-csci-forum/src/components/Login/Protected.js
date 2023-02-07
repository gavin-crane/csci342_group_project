import { Navigate } from "react-router-dom";

const Protected = ({children}) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if(!user?.username) return <Navigate to="/" replace />

    return children;
};

export default Protected;