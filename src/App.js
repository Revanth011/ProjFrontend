import './App.css';
import Login from './Login';
import Form from "./Form";
import Admin from "./Admin"
import Home from "./Home"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminIn from "./AdminIn"
import UserIn from "./UserIn"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route element={<AdminIn />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route element={<UserIn />}>
          <Route path="/form" element={<Form />} />
        </Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;
