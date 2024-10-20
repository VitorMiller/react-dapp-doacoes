import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';


const Layout = () => {
  
  return (
   
    <div className="min-vh-100 d-flex flex-column">
      <Header/> 
        
          <Outlet />
        
      <Footer/>
    </div>
 
  )
}
export default Layout;