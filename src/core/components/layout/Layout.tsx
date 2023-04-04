import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from '../Sidebar';

export const Layout = () => {
  return (
    <>
        <Sidebar>
            <Outlet/>
        </Sidebar>
    </>
  )
}
