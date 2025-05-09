import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px 16px;
`;

export const Title = styled.h1`
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 12px;
`;

export const ResultCount = styled.div`
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 16px;
    color: #444;
`;

export const LoadingText = styled.div`
    margin: 24px 0;
    font-size: 18px;
    text-align: center;
    color: #888;
`;

export const ErrorText = styled.div`
    margin: 24px 0;
    font-size: 18px;
    text-align: center;
    color: red;
`;

export const EmptyText = styled.div`
    margin: 24px 0;
    font-size: 18px;
    text-align: center;
    color: #666;
`;

export const BackToTopButton = styled.button`
    position: fixed;
    bottom: 40px;
    right: 30px;
    background: #222;
    color: white;
    padding: 10px 16px;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 0.2s ease-in-out;

    &:hover {
        opacity: 1;
    }
`;
