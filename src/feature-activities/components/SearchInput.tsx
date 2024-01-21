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
import { usePageQuery } from "@/lib/utils/hooks/usePageQuery";

type SearchInputProps = {
  defaultSearch?: string;
  disabled: boolean;
};

export const SearchInput = ({ defaultSearch, disabled }: SearchInputProps) => {
  const { t } = useTranslation();
  const { handleQuery } = usePageQuery();

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
