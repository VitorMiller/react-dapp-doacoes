import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import Home from './Home'
import Layout from "./Layout"
import Cadastro from "./Cadastro"

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>} >
          <Route index element={<Home/>} />
          <Route path="/cadastro" element={<Cadastro/>} />
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
