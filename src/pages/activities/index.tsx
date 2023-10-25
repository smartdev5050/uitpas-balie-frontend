import { getApplicationServerSideProps } from "@/lib/pageUtils";
import { ActivitiesPage } from "@/feature-activities";

const Activities = () => {
  return <ActivitiesPage />;
};

export const getServerSideProps = getApplicationServerSideProps();

export default Activities;
