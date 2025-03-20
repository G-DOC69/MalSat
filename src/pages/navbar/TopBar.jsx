import React, { useContext, useState, useEffect } from 'react';
import './TopBarStyle.css';
import {Link, useNavigate} from 'react-router-dom';
import { UserContext } from "../../App.jsx";
import {getNewMessagesCountR, getUserNotificationsR} from "../../app/tempApi.js";
import styled from "styled-components";
import { FaRegComments, FaBell, FaHeart, FaUser, FaListAlt } from "react-icons/fa"; // Icons

const Navbar = styled.nav`
  width: 100%;
  height: 60px;
  background-color: #1e3a8a;
  display: flex;
  align-items: center;
  padding: 0 20px;
  color: white;
  z-index: 1000;
  justify-content: space-between;

  @media (max-width: 600px) {
    padding: 0 10px;
  }
`;

const SiteTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  flex-grow: 1;
  text-align: center;

  @media (max-width: 600px) {
    text-align: left;
    font-size: 20px;
  }
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  gap: 16px;

  @media (max-width: 600px) {
    gap: 10px;
  }
`;

const NavButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 22px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const NotificationsWindow = styled.div`
  position: absolute;
  top: 50px;
  right: 10px;
  background: white;
  color: black;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 200px;
`;

const Topbar = () => {
    const [user,setUser] = useContext(UserContext);
    const navigate = useNavigate();
    const [newMessages, setNewMessages] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    useEffect(() => {
        if (user) {
            const fetchNewMessages = async () => {
                try {
                    const response = await getNewMessagesCountR();
                    if (response.status === 200||response.status === 201) {
                        setNewMessages(response.data);
                    } else {
                        setNewMessages(0);
                    }
                } catch (error) {
                    console.error("Ошибка при загрузке сообщений:", error);
                }
            };
            const fetchNotifications = async () => {
                try {
                    const data = await getUserNotificationsR();
                    if (data.status === 200||data.status === 201) {
                        setNotifications(data.data);
                    } else {
                        setNotifications([])
                    }
                } catch (error) {
                    console.error("Ошибка при загрузке уведомлений:", error);
                }
            };
            fetchNewMessages();
            fetchNotifications();
        }
    }, [user]);

    useEffect(() => {
            const userChecker = () => {
                if (user) {
                    setUser(false)
                } else {
                    setUser(true)
                }
            }
            userChecker();
        }, []);

    return (
        <Navbar>
            <SiteTitle onClick={() => navigate("/")}>MalSat.kg</SiteTitle>
            <NavList>
                {user ? (
                    <>
                        <li>
                            <IconButton onClick={() => navigate("/chat")}>
                                <FaRegComments />
                                {newMessages > 0 && `(${newMessages > 99 ? "99+" : newMessages})`}
                            </IconButton>
                        </li>
                        <li>
                            <IconButton onClick={() => setIsNotificationOpen(!isNotificationOpen)}>
                                <FaBell />
                            </IconButton>
                            {isNotificationOpen && (
                                <NotificationsWindow>
                                    {notifications.length === 0 ? (
                                        <p>Нет новых уведомлений.</p>
                                    ) : (
                                        <ul>
                                            {notifications.map((notification, index) => (
                                                <li key={index}>
                                                    {notification.message}{" "}
                                                    {notification.ad && (
                                                        <Link to={notification.link}>{notification.ad}</Link>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </NotificationsWindow>
                            )}
                        </li>
                        <li>
                            <IconButton onClick={() => navigate("/ad/favorites")}>
                                <FaHeart />
                            </IconButton>
                        </li>
                        <li>
                            <IconButton onClick={() => navigate("/ad/my-ads")}>
                                <FaListAlt />
                            </IconButton>
                        </li>
                        <li>
                            <IconButton onClick={() => navigate("/user")}>
                                <FaUser />
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
                    </>
                )}
            </NavList>
        </Navbar>
    );
};

export default Topbar;
