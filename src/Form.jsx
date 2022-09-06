import { Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useState, useContext } from 'react';
import { AuthContext } from "./context/AuthContext";
import axios from 'axios';
import "./Form.css"
import { useNavigate } from "react-router-dom"

const Form = () => {
    const [selected, setSelected] = useState("");
    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/saveForm`, { userName: user.userName, selected })
            .then(resp => {
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/")
    }

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <span>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size={"small"}>
                        <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
                        <Select
                            name="selected"
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={selected}
                            label="Type"
                            onChange={(e) => setSelected(e.target.value)}
                        >
                            <MenuItem value={"Vicky1"}>Vicky1</MenuItem>
                            <MenuItem value={"Vicky2"}>Vicky2</MenuItem>
                            <MenuItem value={"Vicky3"}>Vicky3</MenuItem>
                            <MenuItem value={"Vicky4"}>Vicky4</MenuItem>
                            <MenuItem value={"Vicky5"}>Vicky5</MenuItem>
                        </Select>
                    </FormControl>
                </span>
                <span>
                    <Button variant="contained" size="medium" type="submit">
                        Submit
                    </Button>
                </span>
                <span>
                    <Button variant="contained" size="medium" color="error" onClick={handleLogout}>
                        Logout
                    </Button>
                </span>
            </form>
        </div>
    )
}
export default Form;