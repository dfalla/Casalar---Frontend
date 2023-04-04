import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container, ProtectedRoutes } from "../common";
import { useAuthStore } from "../store";

export const AppRouter = () => {

  const isAuth = useAuthStore((state) => state.isAuth);


  return (
    <BrowserRouter>
        <Container>
            <Routes>
                <Route path="/login" element={<h1>Login</h1>} />
                <Route path="/register" element={<h1>Register</h1>} />

                <Route element={<ProtectedRoutes isAllowed={isAuth} />}>
                  <Route path="/profile" element={<h1>Profile</h1>} />
                  <Route path="/dashboard" element={<h1>dashboard</h1>} />
                </Route>
            </Routes>
        </Container>
    </BrowserRouter>
  )
}
