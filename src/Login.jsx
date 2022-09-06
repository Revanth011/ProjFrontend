import { Button, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import "./Login.css"
import { useState, useContext } from 'react';
import { AuthContext } from "./context/AuthContext";
import axios from 'axios';
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [userType, setUserType] = useState("");
    const [error, setError] = useState("");
    const { dispatch } = useContext(AuthContext);
    const [user, setUser] = useState({
        userName: "",
        password: "",
        role: ""
    })

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === "role") {
            setUserType(value);
        }
        setUser({ ...user, [name]: value })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, user)
            .then(resp => {
                dispatch({ type: "LOGIN", payload: { ...resp.data, password: "" } });
                setError("");
                resp.data.role === "admin" ? navigate("/admin") : navigate("/form");
            })
            .catch(err => {
                setError(err.response.data.msg);
            })
    }

    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
                <span>
                    <TextField
                        name="userName"
                        label="username"
                        id="outlined-size-small"
                        defaultValue=""
                        size="small"
                        onChange={handleChange}
                    /></span>
                <span>
                    <TextField
                        name="password"
                        label="password"
                        id="outlined-size-small"
                        defaultValue=""
                        size="small"
                        onChange={handleChange}
                    />
                </span>
                <span>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size={"small"}>
                        <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
                        <Select
                            name="role"
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={userType}
                            label="Type"
                            onChange={handleChange}
                        >
                            <MenuItem value={"user"}>user</MenuItem>
                            <MenuItem value={"admin"}>admin</MenuItem>
                        </Select>
                    </FormControl>
                </span>
                <span>
                    <Button variant="contained" size="medium" type="submit">
                        Login
                    </Button>
                </span>
            </form>
            {error && <div className="dispError">{error}</div>}
        </div>
    )
}

export default Login;