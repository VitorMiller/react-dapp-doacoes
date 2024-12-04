import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './Home';
import Layout from "./Layout";
import LayoutLogado from "./LayoutLogado";
import Cadastro from "./Cadastro";
import Login from "./Login";
import PerfilOng from "./PerfilOng";
import SaibaMais from "./SaibaMais";
import Authorization from "./Authorization";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/saibaMais" element={<SaibaMais />} />
          </Route>
          <Route path="/perfilOng" element={<LayoutLogado />} >
            <Route index element={<Authorization><PerfilOng /></Authorization>} />
          </Route>

          {/* <Route path="*" element={<NotFound/>} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
