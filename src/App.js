import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { RegPage } from './pages/RegPage';
import { LogPage } from './pages/LogPage';
import { ServPage } from './pages/ServPage';
import { NotFoundPage } from './pages/NotFoundPage';

//FALTA LA PAGINA DE MODIFICAR USUARIO

function App() {
  return (
    <>
      < Header />
        <Routes>
          <Route path='/' element={< HomePage />} />
          <Route path='/register' element={< RegPage />} />
          <Route path='/login' element={< LogPage />} />
          <Route path='/serv/:id' element={< ServPage/>} />
          <Route path='*' element={< NotFoundPage />} />
        </Routes>
      < Footer />
    </>
  );
}

export default App;
