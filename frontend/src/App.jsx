import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage ,SignupPage, Home, CreateProduct} from "./Routes";
// import {Home} from '';
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/home' element={<Home/>} />
        <Route path='/createProduct' element={<CreateProduct/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;