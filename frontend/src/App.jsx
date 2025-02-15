import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage ,SignupPage, Home, CreateProduct, MyProducts, Cart } from "./Routes";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/create-product' element={<CreateProduct/>}/>
        <Route path='/create-product/:id' element={<CreateProduct/>}/>
        <Route path='/my-products' element={<MyProducts/>} />
        <Route path='/cart' element={<Cart/>} />
      </Routes>
    </BrowserRouter> 
  );
}

export default App;