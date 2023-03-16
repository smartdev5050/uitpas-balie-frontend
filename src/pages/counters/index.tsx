import { getApplicationServerSideProps } from "@/lib/pageUtils";

const Counters = () => {
  return <div>Hello Counters</div>;
};

export const getServerSideProps = getApplicationServerSideProps();

export default Counters;
