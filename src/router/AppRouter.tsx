import { lazy, useEffect } from 'react';

import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import { useAuthStore } from '../core';
import { Verification } from '../core';

const AUTH = lazy(()=> import('../features/auth/routes/AuthRouter'))

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if(status === 'checking'){
    return(
      <Verification/>
    )
  }

  return(
    <Routes>
        {
            (status === 'not-authenticated')
                ? (
                    <>
                        <Route path="/auth/*" element={ <AUTH/> }/>
                        <Route path="/*" element={<Navigate to="/auth/login"/>}/>
                    </>
                  ) 
                
                : (
                    <>
                        {/* <Route path="/" element={<Layout/>}>
                        <Route index element={<Dashboard/>}/>
                        <Route path="alumnos" element={<TableStudents/>}/>
                        <Route path="alumnos/crear-alumno" element={<FormStudent/>}/>
                        <Route path="alumno/:id" element={<FormStudent/>}/>
                        <Route path="calendario" element={<CalendarPage/>}/>
                        </Route>

                        <Route path="/*" element={<Navigate to="/"/>}/> */}
                     </>
                )
        }
    </Routes>
  )
}
