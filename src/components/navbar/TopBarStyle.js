import styled from "styled-components";

export const Navbar = styled.nav`
    width: 100%;
    height: 60px;
    background-color: #1e3a8a;
    display: flex;
    align-items: center;
    padding: 0 20px;
    color: white;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 1000;
`;

export const SiteTitle = styled.h1`
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    flex-grow: 1;
    text-align: center;
`;

export const NavList = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    gap: 16px;
`;

export const NavButton = styled.button`
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
`;

export const IconButton = styled.button`
    background: none;
    border: none;
    color: white;
    font-size: 22px;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
`;

export const SideMenu = styled.div`
    position: fixed;
    top: 60px;
    right: 0;
    background: white;
    color: black;
    width: 240px;
    height: calc(100% - 60px);
    box-shadow: -2px 0 8px rgba(0,0,0,0.2);
    z-index: 999;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const MenuLink = styled.button`
    background: none;
    border: none;
    color: black;
    text-align: left;
    font-size: 16px;
    cursor: pointer;
    &:hover {
        opacity: 0.7;
    }
`;
