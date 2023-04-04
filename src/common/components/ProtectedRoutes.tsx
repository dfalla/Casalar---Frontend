import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Sidebar } from "./";
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
  return (
    <>
      <Sidebar>
        {children ? children : <Outlet />};
      </Sidebar>
    </>
  )
};
