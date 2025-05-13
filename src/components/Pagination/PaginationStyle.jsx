import styled from "styled-components";

export const PaginationStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
`;

export const PageButton = styled.button`
    background: #1e3a8a;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 8px;
    cursor: pointer;

    &:disabled {
        background: #94a3b8;
    }
`;