import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";
type JSXComponent = () => JSX.Element;
interface Props {
  isAllowed: boolean;
  children?: ReactElement<JSXComponent>;
  redirectTo?: string;
}

export const ProtectedRoutes = ({
  isAllowed,
  children,
  redirectTo = "/login",
}: Props) => {
  if (!isAllowed) return <Navigate to={redirectTo} />;
  return children ? children : <Outlet />;
};
