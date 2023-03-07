import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
    const { user, loaded } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loaded === true && !user?.username) {
            navigate("/login", { replace: true });
        }
    }, [loaded, user, navigate])

    return children;
};

export default Protected;