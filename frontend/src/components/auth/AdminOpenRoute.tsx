import { useAppSelector } from "@/redux/store";
import React from "react";
import { Navigate } from "react-router-dom";

type AdminOpenRouteProps = {
  children: React.ReactNode;
};

const AdminOpenRoute = (props: AdminOpenRouteProps) => {
  const authAdmin = useAppSelector((state) => state.admin.authAdmin);

  if (authAdmin === null) {
    return props.children;
  }
  return <Navigate to="/" />;
};

export default AdminOpenRoute;
