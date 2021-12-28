import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import InvestmentDetail from './pages/InvestmentDetail';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact  element={<Home />} />
        <Route path='/:symbol' element={<InvestmentDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
