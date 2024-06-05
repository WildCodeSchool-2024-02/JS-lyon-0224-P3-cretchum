import "./App.css";
import { Outlet } from "react-router-dom";
import NavMenu from "./pages/NavMenu";


function App() {
  return (
    <>
    <NavMenu />
    <Outlet />
    </>
  );
}

export default App;
