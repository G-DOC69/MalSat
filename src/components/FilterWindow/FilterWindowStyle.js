import styled from "styled-components";

export const Filters = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    padding: 15px;
    background: #f8fafc;
    border-radius: 10px;
    margin-bottom: 20px;
`;

export const Label = styled.label`
    display: flex;
    flex-direction: column;
    font-weight: bold;
    font-size: 14px;
`;

export const Select = styled.select`
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

export const Input = styled.input`
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;
