import React from 'react';
import Menu from './compoents/Navbar/NavBar'; 
// import Login from './component/Login';
import Footer from './compoents/Footer/Footer';
import AppRouter from './AppRouter';
import { BrowserRouter} from 'react-router-dom';

const App = () => {
    return (
      
      <BrowserRouter>
         <div>
          <Menu />
          <AppRouter />
          <Footer />
        </div>
      </BrowserRouter>
    );
  };
  
  export default App;
  
