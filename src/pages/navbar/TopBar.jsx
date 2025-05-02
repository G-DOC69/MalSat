import React, { useContext, useState, useEffect } from 'react';
import './TopBarStyle.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from "../../App";
import { getNewMessagesCountRequest, getUserNotificationsRequest } from "../../app/api.js";
import styled from "styled-components";
import { FaRegComments, FaBell, FaHeart, FaUser, FaListAlt } from "react-icons/fa";

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
    width: 240px;
    z-index: 1001;
`;

const Topbar = () => {
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();
    const [newMessages, setNewMessages] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const token = localStorage.getItem("access_token");

    useEffect(() => {
        if (!user || !token) return;

        const fetchNewMessages = async () => {
            try {
                const response = await getNewMessagesCountRequest(token);
                if (response.status === 200) {
                    setNewMessages(response.data);
                }
            } catch (error) {
                console.error("Ошибка при загрузке количества сообщений:", error);
            }
        };

        const fetchNotifications = async () => {
            try {
                const response = await getUserNotificationsRequest(token);
                if (response.status === 200) {
                    setNotifications(response.data);
                }
            } catch (error) {
                console.error("Ошибка при загрузке уведомлений:", error);
            }
        };

        fetchNewMessages();
        fetchNotifications();
    }, [user]);

    return (
        <Navbar>
            <SiteTitle onClick={() => navigate("/")}>MalSat.kg</SiteTitle>
            <NavList>
                {user ? (
                    <>
                        <li>
                            <IconButton onClick={() => navigate("/chat")}>
                                <FaRegComments />
                                {newMessages > 0 && <sup>({newMessages > 99 ? "99+" : newMessages})</sup>}
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
                                            {notifications.map((n, i) => (
                                                <li key={i}>
                                                    {n.message}{" "}
                                                    {n.ad && <Link to={n.link}>{n.ad}</Link>}
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
