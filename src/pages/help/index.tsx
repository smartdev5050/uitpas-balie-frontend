import { getApplicationServerSideProps } from "@/lib/pageUtils";
import { HelpPage } from "@/feature-help";

const Help = () => {
  return <HelpPage />;
};

export const getServerSideProps = getApplicationServerSideProps();

export default Help;
