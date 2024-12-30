import { useAppSelector } from "@/redux/store";
import { Navigate } from "react-router-dom";

type OpenRouteProps = {
  children: React.ReactNode;
};

const OpenRoute = (props: OpenRouteProps) => {
  const children = props.children;
  const authUser = useAppSelector((state) => state.auth.authUser);

  if (authUser === false) {
    return children;
  }
  return <Navigate to="/" />;
};

export default OpenRoute;
