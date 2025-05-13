import { useEffect, useContext } from "react";
import { UserContext } from "../App";

export const useSyncUserContext = () => {
    const [, setUser] = useContext(UserContext);

    useEffect(() => {
        const access = localStorage.getItem('access_token');
        setUser(!!access);
    }, [setUser]);
};
