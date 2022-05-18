import "./bootstrap.min.css"
import './index.css';
import  Header  from './components/header/header';
import { Footer } from './components/footer/footer';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Register from "./pages/register";
import Dashboard from "./pages/surveyDashboard";
import Login from './pages/login';


function App() {
  return (
    <>
      
      <main>
        <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
     

    </>
  );
}

export default App;
