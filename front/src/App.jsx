import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateHouse from './pages/CreateHouse';
import FilterHouses from './pages/FilterHouses';
import './styles/global.css';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateHouse />} />
        <Route path="/filter" element={<FilterHouses />} />
      </Routes>
    </BrowserRouter>
  );
}
