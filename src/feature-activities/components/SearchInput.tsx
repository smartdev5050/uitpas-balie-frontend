import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import {
  StyledSearchButton,
  StyledSearchForm,
  StyledSearchInput,
  StyledSearchStack,
} from "./SearchInput.styles";
import { FormEvent } from "react";

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

  const handleFormSubmission = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    handleQuery("search", formData.get("query-input") as string);
  };

  return (
    <StyledSearchForm method="POST" onSubmit={handleFormSubmission}>
      <StyledSearchStack>
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
      </StyledSearchStack>
    </StyledSearchForm>
  );
};
