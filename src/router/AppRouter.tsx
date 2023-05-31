import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "../store";
import { Container, ProtectedRoutes } from "../common";
import { Aceites, Dashboard, Llantas, Motores, Fumigadoras, LoginPage, RegisterPage, Chainsaw } from "../features";

export const AppRouter = () => {

  const isAuth = useAuthStore((state) => state.isAuth);

  return (
    <BrowserRouter>
        <Container>
            <Routes>
                <Route path="/auth/login" element={<LoginPage/>} />
                <Route path="/auth/register" element={<RegisterPage/>} />

                <Route path="/" element={<ProtectedRoutes isAllowed={isAuth} />}>
                  
                  <Route index element={<Dashboard/>}/>
                  <Route path="/dashboard" element={<Dashboard/>}/>
                  <Route path="/motores" element={<Motores/>}/>
                  <Route path="/motosierras" element={<Chainsaw/>}/>
                  <Route path="/mochilas-fumigadoras" element={<Fumigadoras/>}/>
                  <Route path="/motorepuestos/aceites" element={<Aceites/>}/>
                  <Route path="/motorepuestos/llantas" element={<Llantas/>}/>
                  
                  <Route path="/motorepuestos/aceites/:id" element={<Aceites edit={true}/>}/>
                  <Route path="/motorepuestos/llantas/:id" element={<Llantas edit={true}/>}/>
                  <Route path="/motores/:id" element={<Motores edit={true}/>}/>
                  <Route path="/motosierras/:id" element={<Chainsaw edit={true}/>}/>

                  <Route path="/mochilas-fumigadoras/:id" element={<Fumigadoras edit={true}/>}/>

                </Route>

                <Route path="/*" element={<Navigate to="/"/>}/>
            </Routes>
        </Container>
    </BrowserRouter>
  )
}
