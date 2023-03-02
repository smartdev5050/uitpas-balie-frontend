import Head from 'next/head'
import { Inter } from 'next/font/google'
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>UiTPAS Beheer</title>
        <meta name="description" content="UiTPAS Beheer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {t('hello')}
      </main>
    </>
  )
}

export async function getStaticProps({ locale }: {locale: string}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
      ])),
    },
  }
}