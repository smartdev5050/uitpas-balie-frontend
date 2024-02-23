import { useRouter } from "next/router";

export function useSearchQuery(): string | undefined {
  const router = useRouter();

  const searchQuery = router.query.search;

  return searchQuery?.toString();
}
