import React from "react";
import { useAppSelector } from "@/redux/store";
import { Navigate } from "react-router-dom";

type AdminPrivateRouteProps = {
  children: React.ReactNode;
};

const AdminPrivateRoute = (props: AdminPrivateRouteProps) => {
  const authAdmin = useAppSelector((state) => state.admin.authAdmin);

  if (authAdmin !== null) {
    return props.children;
  }
  return <Navigate to="/auth/admin" />;
};

export default AdminPrivateRoute;
