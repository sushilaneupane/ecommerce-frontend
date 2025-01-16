import React from 'react';
import Menu from './compoents/Navbar/NavBar'; 
import Footer from './compoents/Footer/Footer';
import AppRouter from './AppRouter';
import { BrowserRouter} from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
    return (
      <BrowserRouter>
         <div>
         <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="colored" 
      />
          <Menu />
          <AppRouter />
          <Footer />
        </div>
      </BrowserRouter>
    );
  };
  
  export default App;
  
