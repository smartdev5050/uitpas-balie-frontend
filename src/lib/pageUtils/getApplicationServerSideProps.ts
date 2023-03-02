import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getApplicationServerSideProps =
  () =>
  async ({ locale }: { locale: string }) => ({
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  });
