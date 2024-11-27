import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import HeaderLogado from './HeaderLogado';


const LayoutLogado = () => {
  
  return (
   
    <div className="min-vh-100 d-flex flex-column">
      <HeaderLogado/> 
          <Outlet/>
      <Footer/>
    </div>
 
  )
}
export default LayoutLogado;