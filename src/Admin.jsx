import "./Admin.css"
import { useEffect, useState, useContext } from "react";
import { Button } from '@mui/material';
import { AuthContext } from "./context/AuthContext";
import { useNavigate } from "react-router-dom"
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import moment from "moment";

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [showdate, setshowdate] = useState(false);
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);

    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext);

    useEffect(() => {
        const fetchUsers = async () => {
            const resp = await fetch(`${process.env.REACT_APP_BACKEND_URL}/getForm`);
            const data = await resp.json();
            setUsers(data);
            setFiltered(data);
        }
        fetchUsers();
    }, []);

    const handleDate = () => setshowdate(!showdate);

    const filterByDate = () => {
        const newUsers = [...users].filter(user => {
            let sDate = moment(new Date(date[0].startDate)).format('L');
            let eDate = moment(new Date(date[0].endDate)).format('L');
            let uDate = moment(new Date(user.updatedAt)).format('L');
            return sDate <= uDate && uDate <= eDate;
        })
        setFiltered(newUsers)
    }

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/")
    }

    return (
        <div className="admin">
            <div className="adminContainer">
                <div className="columnTitle">
                    <span>userName</span>
                    <span>user selected</span>
                    <div className="date">
                        <span>Date and Time</span>
                    </div>
                </div>
                <div className="userRows" >
                    {filtered.map(user => (
                        <div className="userRow" id="userItem" key={user._id}>
                            <span>{user.userName}</span>
                            <span>{user.selected}</span>
                            <span>{user.updatedAt}</span>
                        </div>
                    ))}
                </div>
            </div>
            <span id="btn">
                <Button variant="contained" size="medium" onClick={handleLogout}>
                    Logout
                </Button>
                <Button variant="contained" size="medium" onClick={handleDate}>
                    filter By Date
                </Button>
            </span>
            <span>
                {showdate &&
                    <div className="dateDisp">
                        <DateRange
                            editableDateInputs={true}
                            onChange={item => setDate([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={date}
                        />
                        <Button variant="contained" size="medium" onClick={filterByDate}>
                            Done
                        </Button>
                    </div>
                }

            </span>
        </div>
    )
}

export default Admin;