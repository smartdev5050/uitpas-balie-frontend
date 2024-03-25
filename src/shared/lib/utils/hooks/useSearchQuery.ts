import { useSearchParams } from "next/navigation";

export function useSearchQuery(): string | undefined {
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("search");

  return searchQuery?.toString();
}
