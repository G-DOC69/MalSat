import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegComments, FaUser, FaBars, FaSignOutAlt } from "react-icons/fa";
import { UserContext } from "../../App.jsx";
import {IconButton, Navbar, NavList, SiteTitle,NavButton,SideMenu,MenuLink} from "./TopBarStyle.js";

const Topbar = () => {
    const [user, setUser] = useContext(UserContext);
    const [sideMenuOpen, setSideMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        localStorage.removeItem("access_token");
        setUser(false);
        navigate("/");
    };

    return (
        <>
        <Navbar>
            <SiteTitle onClick={() => navigate("/")}>MalSat.kg</SiteTitle>
            <NavList>
                {user ? (
                    <>
                        <li>
                            <IconButton onClick={() => navigate("/chat")}>
                                <FaRegComments/>
                            </IconButton>
                        </li>
                        {/* <li>
                        <IconButton onClick={() => navigate("/notifications")}>
                                <FaBell />
                        </IconButton>
                    </li> */}
                        <li>
                            <IconButton onClick={() => navigate("/user")}>
                                <FaUser/>
                            </IconButton>
                        </li>
                        <li>
                            <IconButton onClick={() => setSideMenuOpen(!sideMenuOpen)}>
                                <FaBars/>
                            </IconButton>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <NavButton onClick={() => navigate("/login/sign-in")}>Войти</NavButton>
                        </li>
                        <li>
                        <NavButton onClick={() => navigate("/login/register")}>Регистрация</NavButton>
                </li>
                <li>
                    <NavButton onClick={() => navigate("/ad/all-ads")}>Объявления</NavButton>
                </li>
            </>
            )}
        </NavList>
        </Navbar>

    {sideMenuOpen && user && (
        <SideMenu>
            <MenuLink onClick={() => navigate("/ad/all-ads")}>Все объявления</MenuLink>
            <MenuLink onClick={() => navigate("/chat")}>Чаты</MenuLink>
            <MenuLink onClick={() => navigate("/ad/favorites")}>Избранные</MenuLink>
            <MenuLink onClick={() => navigate("/ad/my-ads")}>Мои объявления</MenuLink>
            {/* <MenuLink onClick={() =>  navigate("/notifications") }>Уведомления</MenuLink> */}
        <MenuLink onClick={() => navigate("/user")}>Профиль</MenuLink>
        <MenuLink onClick={handleLogout}>
            <FaSignOutAlt style={{ marginRight: "8px" }} />
            Выйти
        </MenuLink>
    </SideMenu>
    )}
</>
);
};

export default Topbar;
