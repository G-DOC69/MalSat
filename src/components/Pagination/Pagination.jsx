import { PaginationStyled, PageButton } from "./PaginationStyle";

const Pagination = ({ page, totalPages, totalItems, itemsPerPage, setPage }) => {
    const handleNextPage = () => {
        const nextPage = page + 1;
        if ((nextPage - 1) * itemsPerPage < totalItems) {
            setPage(nextPage);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <PaginationStyled>
            <PageButton onClick={handlePrevPage} disabled={page === 1}>
                ← Назад
            </PageButton>
            <p>{page} / {totalPages}</p>
            <PageButton onClick={handleNextPage} disabled={page * itemsPerPage >= totalItems}>
                Вперед →
            </PageButton>
        </PaginationStyled>
    );
};

export default Pagination;
