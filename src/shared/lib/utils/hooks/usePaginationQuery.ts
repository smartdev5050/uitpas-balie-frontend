import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const usePaginationQuery = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const limit = searchParams.get("limit");
  const page = searchParams.get("page");

  const fetchLimit = limit ? Number(limit) : 5;
  const currentPage = page ? Number(page) : 1;
  const offset = currentPage === 1 ? 0 : (currentPage - 1) * fetchLimit;

  const handleQuery = (queryKey: string, queryValue: string) => {
    const query: Record<string, string> = Array.from(
      searchParams.entries()
    ).reduce((prev, [key, value]) => ({ ...prev, [key]: value }), {});

    if (queryValue === "") {
      delete query[queryKey];
    } else {
      query[queryKey] = queryValue;
      // Delete the 'from' and 'to' query params if we change the range option
      if (queryKey === "range" && queryValue !== "chooseDate") {
        delete query["from"];
        delete query["to"];
      }
    }

    // If we change any other param than page, reset to page 1
    // OR if the page query param is 1, remove it (it would default to 1 anyway)
    if (queryKey !== "page" || (queryKey === "page" && queryValue === "1")) {
      delete query["page"];
    }

    return push(`${pathname}?${new URLSearchParams(query)}`);
  };

  return { handleQuery, currentPage, fetchLimit, offset };
};
