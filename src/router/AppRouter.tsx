import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthStore } from "../store";
import { LoginPage, RegisterPage } from "../features";
import { Container, ProtectedRoutes } from "../common";
import { Backpacks, MotorcycleParts } from "../features/products";
import { checkAuthToken } from "../api";

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
                  <Route path="/mochilas" element={<Backpacks/>}/>
                  <Route path="/motorepuestos" element={<MotorcycleParts/>}/>
                </Route>
            </Routes>
        </Container>
    </BrowserRouter>
  )
}
