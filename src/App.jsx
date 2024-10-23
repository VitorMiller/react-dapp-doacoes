import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import Home from './Home'
import Layout from "./Layout"
import Cadastro from "./Cadastro"
import Login from "./Login"
import PerfilOng from "./PerfilOng"

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>} >
          <Route index element={<Home/>} />
          <Route path="/cadastro" element={<Cadastro/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/perfilOng" element={<PerfilOng/>} />
        </Route>
        <Route>
          
        </Route>
        {/* <Route path="*" element={<NotFound/>} /> */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
