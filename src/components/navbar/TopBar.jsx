import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegComments, FaUser, FaBars, FaSignOutAlt } from "react-icons/fa";
import { UserContext } from "../../App.jsx";
import {
  IconButton,
  Navbar,
  NavList,
  SiteTitle,
  NavButton,
  SideMenu,
  MenuLink,
  Overlay,
  LogoWrapper,
  LogoImg,
} from "./TopBarStyle.js";

const Topbar = () => {
  const [user, setUser] = useContext(UserContext);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setUser(false);
    navigate("/");
    setSideMenuOpen(false);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setSideMenuOpen(false);
  };

  return (
    <>
      <Navbar>
        <LogoWrapper onClick={() => navigate("/")}>
          <LogoImg src="/logo.png" alt="MalSat.kg" />
          <SiteTitle>MalSat.kg</SiteTitle>
        </LogoWrapper>

        <NavList>
          {user ? (
            <>
              <li>
                <IconButton onClick={() => navigate("/chat")}>
                  <FaRegComments />
                </IconButton>
              </li>
              <li>
                <IconButton onClick={() => navigate("/user")}>
                  <FaUser />
                </IconButton>
              </li>
              <li>
                <IconButton onClick={() => setSideMenuOpen(true)}>
                  <FaBars />
                </IconButton>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavButton onClick={() => navigate("/login/sign-in")}>
                  Войти
                </NavButton>
              </li>
              <li>
                <NavButton onClick={() => navigate("/login/register")}>
                  Регистрация
                </NavButton>
              </li>
              <li>
                <NavButton onClick={() => navigate("/ad/all-ads")}>
                  Объявления
                </NavButton>
              </li>
            </>
          )}
        </NavList>
      </Navbar>

      {sideMenuOpen && user && (
        <>
          <Overlay onClick={() => setSideMenuOpen(false)} />
          <SideMenu>
            <MenuLink onClick={() => handleNavigate("/ad/all-ads")}>
              Все объявления
            </MenuLink>
            <MenuLink onClick={() => handleNavigate("/chat")}>Чаты</MenuLink>
            <MenuLink onClick={() => handleNavigate("/ad/favorites")}>
              Избранные
            </MenuLink>
            <MenuLink onClick={() => handleNavigate("/ad/my-ads")}>
              Мои объявления
            </MenuLink>
            <MenuLink onClick={() => handleNavigate("/user")}>Профиль</MenuLink>
            <MenuLink onClick={handleLogout}>
              <FaSignOutAlt style={{ marginRight: "8px" }} />
              Выйти
            </MenuLink>
          </SideMenu>
        </>
      )}
    </>
  );
};

export default Topbar;
