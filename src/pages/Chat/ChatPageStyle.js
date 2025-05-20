import styled from "styled-components";

// Основной контейнер страницы чата
export const ChatContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw; /* ⬅ растягиваем на весь экран */
  height: calc(100vh - 64px); /* или больше, если navbar выше */
  margin-top: 64px; /* отступ от навигации */
  background-color: #ffffff;
  overflow: hidden;
`;

// Левая панель (список чатов)
export const ChatSidebarWrapper = styled.div`
  width: 320px;
  min-width: 280px;
  max-width: 350px;
  border-right: 1px solid #e5e7eb;
  background-color: #f9fafb;
  overflow-y: auto;
  padding: 16px;
`;

// Правая панель (переписка)
export const ChatContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
`;

// Верхняя часть чата — заголовок
export const ChatHeaderWrapper = styled.div`
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  background-color: #f1f5f9;
  font-weight: 600;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// Сообщения
export const MessagesWrapper = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #fefefe;
`;

// Панель ввода сообщений
export const ChatInputBarWrapper = styled.div`
  padding: 16px;
  border-top: 1px solid #e5e7eb;
  background-color: #f9fafb;
  display: flex;
  gap: 8px;

  input {
    flex: 1;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    font-size: 16px;
    outline: none;
  }

  button {
    padding: 10px 16px;
    background-color: #1e3a8a;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background-color: #3b82f6;
    }
  }
`;

// Заглушка при отсутствии чата
export const PlaceholderWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #6b7280;
  background-color: #fafafa;
`;
