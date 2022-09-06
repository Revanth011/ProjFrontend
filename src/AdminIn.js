import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function LoggedIn() {
    const { user } = useContext(AuthContext);
    return user && user.role === "admin" ? <Outlet /> : <Navigate to={"/login"} />
}