import { useSearchParams } from "next/navigation";
import { MobileNavBar } from "@/mobile/layouts";
import { MobileContentStack } from "@/mobile/lib/ui";
import { useGetPassholders } from "@/shared/lib/dataAccess";
import { EventName } from "@/shared/lib/dataAccess/search/generated/model";
import { useTranslation } from "@/shared/lib/i18n/client";

export const ScanResultPage = () => {
  const { i18n } = useTranslation();
  const params = useSearchParams();
  const code = String(params.get("code"));
  const { data, isError, error } = useGetPassholders({
    uitpasNumber: code,
  });

  const LANG_KEY = i18n.language as keyof EventName;

  if (isError) {
    console.log(
      error?.response?.data?.endUserMessage &&
        error?.response?.data?.endUserMessage[LANG_KEY]
    );
  }

  return (
    <MobileNavBar>
      <MobileContentStack>TODO</MobileContentStack>
    </MobileNavBar>
  );
};
