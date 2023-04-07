import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthStore } from "../store";
import { LoginPage, RegisterPage } from "../features";
import { Container, ProtectedRoutes } from "../common";

export const AppRouter = () => {

  const isAuth = useAuthStore((state) => state.isAuth);


  return (
    <BrowserRouter>
        <Container>
            <Routes>
                <Route path="/auth/login" element={<LoginPage/>} />
                <Route path="/auth/register" element={<RegisterPage/>} />

                <Route path="/" element={<ProtectedRoutes isAllowed={isAuth} />}>
                  <Route path="/profile" element={<h1>Profile</h1>} />
                  <Route path="/dashboard" element={<h1>dashboard</h1>} />
                </Route>
            </Routes>
        </Container>
    </BrowserRouter>
  )
}
