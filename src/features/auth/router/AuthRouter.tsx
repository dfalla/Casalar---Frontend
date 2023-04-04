import { Navigate, Route, Routes } from 'react-router-dom'; 
import { LoginPage, RegisterPage } from '../views';

const AuthRouter = () => {
    return (
      <Routes>
          <Route path="/" element={ <Navigate to="login" replace/> }/>
          <Route path="login" element={<LoginPage/>}/>
          <Route path="register" element={ <RegisterPage/> }/>
      </Routes>
    )
  }
  
  export default AuthRouter;


