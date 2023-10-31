import { Stack } from "@/lib/ui";
import { Button, styled } from "@mui/joy";
import { useTranslation } from "next-i18next";
import {
  ButtonHTMLAttributes,
  ForwardedRef,
  forwardRef,
  HTMLProps,
} from "react";
import {
  mdiArrowLeftThin,
  mdiMenuDown,
  mdiMenuLeft,
  mdiMenuRight,
} from "@mdi/js";
import Icon from "@mdi/react";

const StyledPaginationButton = styled(
  forwardRef(function ButtonWrapper(
    {
      active,
      ...buttonProps
    }: HTMLProps<HTMLButtonElement> & { active: boolean },
    ref: ForwardedRef<HTMLButtonElement>
  ) {
    return (
      <button
        {...buttonProps}
        type={buttonProps.type as ButtonHTMLAttributes<unknown>["type"]}
        ref={ref}
      />
    );
  })
)(({ theme, active }) => ({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  padding: "8px 12px",
  lineHeight: "1.3333333",
  fontSize: "15px",
  border: "1px solid #ccc",
  marginLeft: "-1px",
  color: "#2a4b9c",
  backgroundColor: theme.palette.primary.solidColor,

  "&:not(:disabled):hover": {
    color: "#1a2e60",
    backgroundColor: theme.palette.neutral[200],
  },

  "&:disabled": {
    ...(!active
      ? {
          cursor: "not-allowed",
          color: "#cccccc",
        }
      : {
          cursor: "auto",
        }),
  },

  ...(active && {
    backgroundColor: theme.palette.neutral[300],
  }),
}));

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
      <StyledPaginationButton
        key={`pagination-${page}`}
        color="primary"
        onClick={() => handleQuery("page", page.toString())}
        disabled={page === currentPage}
        active={page === currentPage}
      >
        {page}
      </StyledPaginationButton>
    );
  }

  return (
    <Stack sx={{ flexDirection: "row", pt: 3 }}>
      <StyledPaginationButton
        color="neutral"
        onClick={() => handleQuery("page", (currentPage - 1).toString())}
        disabled={currentPage === 1}
        active={false}
      >
        <Icon path={mdiMenuLeft} size={0.7} />
        {t("activities.pagination.previousBtn")}
      </StyledPaginationButton>
      {pageButtons}
      <StyledPaginationButton
        color="neutral"
        onClick={() => handleQuery("page", (currentPage + 1).toString())}
        active={false}
        disabled={currentPage === totalPages}
      >
        {t("activities.pagination.nextBtn")}
        <Icon path={mdiMenuRight} size={0.7} />
      </StyledPaginationButton>
    </Stack>
  );
};
