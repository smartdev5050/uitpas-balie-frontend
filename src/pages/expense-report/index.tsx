import { getApplicationServerSideProps } from "@/lib/pageUtils";
import { ExpenseReportPage } from "@/feature-expense-report";

const ExpenseReport = () => {
  return <ExpenseReportPage />;
};

export const getServerSideProps = getApplicationServerSideProps();

export default ExpenseReport;
