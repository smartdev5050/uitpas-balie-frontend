import { useRouter } from "next/router";

export const usePageQuery = () => {
  const router = useRouter();

  const fetchLimit = router.query.limit ? Number(router.query.limit) : 5;
  const currentPage = router.query.page ? Number(router.query.page) : 1;
  const offset = currentPage === 1 ? 0 : (currentPage - 1) * fetchLimit;

  const handleQuery = (queryKey: string, queryValue: string) => {
    const query = { ...router.query };

    if (queryValue === "") {
      delete query[queryKey];
    } else {
      query[queryKey] = queryValue;
      // If we change any other param than page, reset to page 1
      // OR if the page query param is 1, remove it (it would default to 1 anyway)
      if (queryKey !== "page" || (queryKey === "page" && queryValue === "1")) {
        delete query["page"];
      }
    }

    return router.push(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true }
    );
  };

  return { handleQuery, currentPage, fetchLimit, offset };
};
