import { getApplicationServerSideProps } from "@/lib/pageUtils";
import { SelectCounterPage } from "@/feature-counter";

const Counters = () => {
  return <SelectCounterPage />;
};

export const getServerSideProps = getApplicationServerSideProps();

export default Counters;
