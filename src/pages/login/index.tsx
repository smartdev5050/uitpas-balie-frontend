import { getApplicationServerSideProps } from "@/lib/pageUtils";
import { LoginPage } from "@/feature-login";

const Login = () => {
  return <LoginPage />;
};

export const getServerSideProps = getApplicationServerSideProps();

export default Login;
