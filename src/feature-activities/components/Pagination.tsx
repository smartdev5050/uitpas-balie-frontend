import { Stack } from "@/lib/ui";
import { Button } from "@mui/joy";
import { useTranslation } from "next-i18next";

type paginationProps = {
  total: number;
  limit: number;
  currentPage: number;
  handleQuery: (queryKey: string, queryValue: string) => void;
};
export const Pagination = ({
  total,
  limit,
  currentPage,
  handleQuery,
}: paginationProps) => {
  const { t } = useTranslation();
  const totalPages = Math.ceil(total / limit);
  const pageButtons = [];

  for (let page = 1; page <= totalPages; page++) {
    pageButtons.push(
      <Button
        key={`pagination-${page}`}
        variant="plain"
        color="primary"
        onClick={() => handleQuery("page", page.toString())}
        disabled={page === currentPage}
      >
        {page}
      </Button>
    );
  }

  // TODO: styling
  return (
    <Stack sx={{ flexDirection: "row", pt: 3 }}>
      <Button
        variant="soft"
        color="neutral"
        onClick={() => handleQuery("page", (currentPage - 1).toString())}
        disabled={currentPage === 1}
      >
        {t("activities.pagination.previousBtn")}
      </Button>
      {pageButtons}
      <Button
        variant="soft"
        color="neutral"
        onClick={() => handleQuery("page", (currentPage + 1).toString())}
        disabled={currentPage === totalPages}
      >
        {t("activities.pagination.nextBtn")}
      </Button>
    </Stack>
  );
};
