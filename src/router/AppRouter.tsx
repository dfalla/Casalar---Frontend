import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "@/store";
import { Container, ProtectedRoutes } from "@/common";
import { Aceites, Llantas, Motores, Fumigadoras, LoginPage, RegisterPage, Motoguadanas, Motosierras, ElectricalAccesories, Sale } from "@/features";

export const AppRouter = () => {

  const isAuth = useAuthStore((state) => state.isAuth);

  return (
    <BrowserRouter>
        <Container>
            <Routes>
                <Route path="/auth/login" element={<LoginPage/>} />
                <Route path="/auth/register" element={<RegisterPage/>} />

                <Route path="/" element={<ProtectedRoutes isAllowed={isAuth} />}>
                  
                  <Route index element={<ElectricalAccesories/>}/>
                  <Route path="/accesorios-electricos" element={<ElectricalAccesories/>}/>
                  <Route path="/motores" element={<Motores/>}/>
                  <Route path="/motosierras" element={<Motosierras/>}/>
                  <Route path="/motoguadanas" element={<Motoguadanas/>}/>

                  <Route path="/fumigadoras" element={<Fumigadoras/>}/>
                  <Route path="/motorepuestos/aceites" element={<Aceites/>}/>
                  <Route path="/motorepuestos/llantas" element={<Llantas/>}/>
                  
                  <Route path="/accesorios-electricos/:id" element={<ElectricalAccesories edit={true}/>}/>
                  <Route path="/motorepuestos/aceites/:id" element={<Aceites edit={true}/>}/>
                  <Route path="/motorepuestos/llantas/:id" element={<Llantas edit={true}/>}/>
                  <Route path="/motores/:id" element={<Motores edit={true}/>}/>
                  <Route path="/motosierras/:id" element={<Motosierras edit={true}/>}/>
                  <Route path="/motoguadanas/:id" element={<Motoguadanas edit={true}/>}/>
                  <Route path="/venta" element={<Sale/>}/>


                  <Route path="/fumigadoras/:id" element={<Fumigadoras edit={true}/>}/>

                </Route>

                <Route path="/*" element={<Navigate to="/"/>}/>
            </Routes>
        </Container>
    </BrowserRouter>
  )
}
