import { useSearchParams } from "next/navigation";
import { usePaginationQuery } from "@/shared/lib/utils/hooks/usePaginationQuery";

export function useSearchQuery() {
  const { handleQuery } = usePaginationQuery();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") ?? undefined;
  const setSearchQuery = (queryValue: string) =>
    handleQuery("search", queryValue);

  return { searchQuery, setSearchQuery };
}
