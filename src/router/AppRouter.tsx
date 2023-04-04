import { Suspense, lazy, useEffect } from 'react';

import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import { Layout, useAuthStore, Verification } from '../core';

const AUTH = lazy(()=> import('../features/auth/router/AuthRouter'))

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

    <Suspense fallback={<p>Cargando...</p>}>
      <BrowserRouter>
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
                            <Route path="/" element={<Layout/>}>
                              <Route index element={<h1>Dashboard</h1>}/>
                              {/* <Route path="alumnos" element={<TableStudents/>}/>
                              <Route path="alumnos/crear-alumno" element={<FormStudent/>}/>
                              <Route path="alumno/:id" element={<FormStudent/>}/>
                              <Route path="calendario" element={<CalendarPage/>}/> */}
                            </Route>
                            <Route path="/*" element={<Navigate to="/"/>}/>
                        </>
                    )
            }
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}
