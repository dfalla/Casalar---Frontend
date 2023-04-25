import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthStore } from "../store";
import { LoginPage, RegisterPage } from "../features";
import { Container, ProtectedRoutes } from "../common";
import { Backpacks, FormProducto, MotorcycleParts } from "../features/products";

export const AppRouter = () => {

  const isAuth = useAuthStore((state) => state.isAuth);

  return (
    <BrowserRouter>
        <Container>
            <Routes>
                <Route path="/auth/login" element={<LoginPage/>} />
                <Route path="/auth/register" element={<RegisterPage/>} />

                <Route path="/" element={<ProtectedRoutes isAllowed={isAuth} />}>
                  <Route index element={<MotorcycleParts/>}/>
                  <Route path="/motorepuestos" element={<MotorcycleParts/>}/>
                  <Route path="/motorepuestos/:id" element={<MotorcycleParts edit={true}/>}/>
                  <Route path="/mochilas" element={<Backpacks/>}/>
                </Route>
            </Routes>
        </Container>
    </BrowserRouter>
  )
}
