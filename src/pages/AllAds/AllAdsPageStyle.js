import styled from "styled-components";

export const Container = styled.div`
padding: 20px;
max-width: 1200px;
margin: auto;
display: flex;
flex-direction: column;

h1 {
    font-size: 5vw;
    align-self: center;
}`;
export const AdsGrid = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
gap: 20px;`;
