import styled from 'styled-components';

// Контейнер страницы
export const Container = styled.div`
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 100px 16px 24px;
  animation: fadeIn 0.4s ease;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

// Заголовок
export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: #1e293b;
`;

// Количество результатов
export const ResultCount = styled.div`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 20px;
  color: #475569;
`;

// Текст загрузки
export const LoadingText = styled.div`
  margin: 40px 0;
  font-size: 18px;
  text-align: center;
  color: #94a3b8;
`;

// Ошибка
export const ErrorText = styled.div`
  margin: 40px 0;
  font-size: 18px;
  text-align: center;
  color: #ef4444;
`;

// Когда нет данных
export const EmptyText = styled.div`
  margin: 40px 0;
  font-size: 18px;
  text-align: center;
  color: #64748b;
`;

// Кнопка "вверх"
export const BackToTopButton = styled.button`
  position: fixed;
  bottom: 32px;
  right: 28px;
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
  color: white;
  padding: 10px 16px;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.95;
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.97);
  }
`;
