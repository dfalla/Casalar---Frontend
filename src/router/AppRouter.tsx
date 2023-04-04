import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container, ProtectedRoutes } from "../common";
import { useAuthStore } from "../store";
import { LoginPage } from "../features";

export const AppRouter = () => {

  const isAuth = useAuthStore((state) => state.isAuth);


  return (
    <BrowserRouter>
        <Container>
            <Routes>
                <Route path="/auth/login" element={<LoginPage/>} />
                <Route path="/register" element={<h1>Register</h1>} />

                <Route path="/" element={<ProtectedRoutes isAllowed={isAuth} />}>
                  <Route path="/profile" element={<h1>Profile</h1>} />
                  <Route path="/dashboard" element={<h1>dashboard</h1>} />
                </Route>
            </Routes>
        </Container>
    </BrowserRouter>
  )
}
