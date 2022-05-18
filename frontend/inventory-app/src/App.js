import "./bootstrap.min.css"
import './index.css';
import  Header  from './components/header/header';
import { Footer } from './components/footer/footer';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Register from "./pages/register";
import Dashboard from "./pages/surveyDashboard";
import Login from './pages/login';
import CreateSurvey from "./pages/createSurvey";
import DisplaySurvey from "./pages/displaySurvey";

function App() {
  return (
    <>
      
      <main>
        <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create-survey" element={<CreateSurvey />} />
              <Route path="/display-survey" element={<DisplaySurvey />} />
        </Routes>
      </main>
     

    </>
  );
}

export default App;
