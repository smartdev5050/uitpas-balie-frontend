import { Stack } from "@/lib/ui";
import { styled } from "@mui/joy";
import { useTranslation } from "next-i18next";
import {
  ButtonHTMLAttributes,
  ForwardedRef,
  forwardRef,
  HTMLProps,
} from "react";
import { mdiMenuLeft, mdiMenuRight } from "@mdi/js";
import Icon from "@mdi/react";
import { usePagination } from "@/lib/utils/hooks/usePagination";

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
  border: `1px solid ${theme.palette.neutral.plainBorder}`,
  marginLeft: "-1px",
  color: theme.palette.primary.mainChannel,
  backgroundColor: theme.palette.primary.solidColor,

  "&:not(:disabled):hover": {
    color: theme.palette.primary.solidHoverBg,
    backgroundColor: theme.palette.neutral[200],
  },

  "&:disabled": {
    ...(!active
      ? {
          cursor: "not-allowed",
          color: theme.palette.neutral.plainBorder,
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
  totalItems: number;
};
export const Pagination = ({ totalItems }: paginationProps) => {
  const { t } = useTranslation();
  const { gotoPage, nextPage, prevPage, totalPages, currentPage } =
    usePagination({
      totalItems: totalItems,
    });
  const pageButtons = [];

  if (totalPages > 1)
    for (let page = 1; page <= totalPages; page++) {
      pageButtons.push(
        <StyledPaginationButton
          key={`pagination-${page}`}
          color="primary"
          onClick={() => gotoPage(page)}
          disabled={page === currentPage}
          active={page === currentPage}
        >
          {page}
        </StyledPaginationButton>
      );
    }

  return totalPages > 1 ? (
    <Stack sx={{ flexDirection: "row", pt: 3 }}>
      <StyledPaginationButton
        color="neutral"
        onClick={() => prevPage()}
        disabled={currentPage === 1}
        active={false}
      >
        <Icon path={mdiMenuLeft} size={0.7} />
        {t("pagination.previousBtn")}
      </StyledPaginationButton>
      {pageButtons}
      <StyledPaginationButton
        color="neutral"
        onClick={() => nextPage()}
        active={false}
        disabled={currentPage === totalPages}
      >
        {t("pagination.nextBtn")}
        <Icon path={mdiMenuRight} size={0.7} />
      </StyledPaginationButton>
    </Stack>
  ) : null;
};
