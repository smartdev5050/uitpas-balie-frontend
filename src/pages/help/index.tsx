import { getApplicationServerSideProps } from "@/lib/pageUtils";
import { HelpPage } from "@/feature-help";

const Counters = () => {
  return <HelpPage />;
};

export const getServerSideProps = getApplicationServerSideProps();

export default Counters;
