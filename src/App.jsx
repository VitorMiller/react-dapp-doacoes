import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import Home from './Home'
import Layout from "./Layout"

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>} >
          <Route index element={<Home/>} />
          {/* <Route path="/products" element={<Products/>} />
          <Route path="/orders" element={<Orders/>} /> */}
        </Route>
        {/* <Route path="*" element={<NotFound/>} /> */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
