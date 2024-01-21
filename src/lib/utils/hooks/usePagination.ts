import { usePageQuery } from "./usePageQuery";

type usePaginationSettings = {
  totalItems: number;
};

export const usePagination = ({ totalItems }: usePaginationSettings) => {
  const { handleQuery, currentPage, fetchLimit } = usePageQuery();

  const prevPage = () => handleQuery("page", String(currentPage - 1));
  const nextPage = () => handleQuery("page", String(currentPage + 1));
  const gotoPage = (page: number) => handleQuery("page", String(page));

  return {
    currentPage,
    fetchLimit,
    totalPages: Math.ceil(totalItems / fetchLimit),
    prevPage,
    nextPage,
    gotoPage,
  };
};
