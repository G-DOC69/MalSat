import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    padding: 20px;
    max-width: 1200px;
    margin: auto;
    position: relative;
`;

export const AdsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
`;
