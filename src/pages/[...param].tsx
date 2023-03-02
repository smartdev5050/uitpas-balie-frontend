import { getApplicationServerSideProps } from "@/lib/pageUtils";
import { FallbackPage } from "@/feature-legacy";

const Fallback = () => {
  return <FallbackPage />;
};

export const getServerSideProps = getApplicationServerSideProps();

export default Fallback;
