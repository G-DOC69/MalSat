import styled from 'styled-components';

export const ListContainer = styled.div`
    margin-top: 1rem;
`;

export const SearchInput = styled.input`
    width: 100%;
    padding: 0.6rem;
    margin-bottom: 1rem;
    font-size: 1rem;
`;

export const AdCard = styled.div`
    display: flex;
    align-items: flex-start;
    background: #fff;
    border: 1px solid #ccc;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 6px;
`;

export const AdImage = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 1rem;
`;

export const AdInfo = styled.div`
    flex: 1;
    margin-right: 1rem;
`;

export const ActionButton = styled.button`
    margin: 0.3rem 0;
    padding: 0.4rem 0.8rem;
    background: #0077cc;
    color: white;
    border: none;
    cursor: pointer;
`;
