import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

export const useCheckUser = () => {
    const [, setUser] = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            const access = localStorage.getItem('access_token');
            if (access) {
                setUser(true)
            } else {
                navigate('/login/register');
            }
        };

        checkUser();
    }, [navigate, setUser]);
};
