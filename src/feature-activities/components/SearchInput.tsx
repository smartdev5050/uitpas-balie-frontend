import { Stack } from "@/lib/ui";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import {
  StyledSearchButton,
  StyledSearchForm,
  StyledSearchInput,
} from "./SearchInput.styles";

type SearchInputProps = {
  handleQuery: (queryKey: string, queryValue: string) => void;
  defaultSearch?: string;
  disabled: boolean;
};

export const SearchInput = ({
  handleQuery,
  defaultSearch,
  disabled,
}: SearchInputProps) => {
  const { t } = useTranslation();

  const handleFormSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("query-input");
    handleQuery("search", query as string);
  };

  return (
    <StyledSearchForm method="POST" onSubmit={handleFormSubmission}>
      <Stack
        sx={{
          flexDirection: "row",
          maxHeight: "37px",
          "&:focus-within": {
            boxShadow: "0 0 8px rgba(102,175,233,.6)",
          },
        }}
      >
        <StyledSearchInput
          name="query-input"
          variant="plain"
          defaultValue={defaultSearch}
          startDecorator={
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{ opacity: 0.4 }}
            />
          }
          placeholder={`${t("activities.searchInputPlaceholder")}`}
          disabled={disabled}
        />
        <StyledSearchButton type="submit" disabled={disabled}>
          {t("activities.searchBtn")}
        </StyledSearchButton>
      </Stack>
    </StyledSearchForm>
  );
};
