import React, { useState } from 'react';
import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import customers from "./customer.json";
import FormControl from '@mui/material/FormControl';
import { InputLabel, Select, MenuItem } from '@mui/material';
import TableComponent from './TableComponent';

const Main = () => {
    const [view, setView] = useState("Customer");
    const handleViewChange = (e) => {
        e.preventDefault();
        setView(e.target.value);
        console.log(view);

    }
    return (
        <div className='fullView'>
            <Col className='inputview'>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">View</InputLabel>
                    <Select
                        defaultValue={"Customer"}
                        sx={{
                            border: "1px solid darkgrey",
                            backgroundColor: "#E3EAEF",
                            color: "blue",
                            fontWeight: "bold",
                            fontSize:'20px'
                        }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="View"
                        onChange={handleViewChange}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    bgcolor: '#BDBDFA',
                                    color: 'black',
                                    '& .MuiMenuItem-root': {
                                        padding: 2,
                                    },
                                },
                            },
                        }}

                    >
                        <MenuItem value={"Customer"}>Customer</MenuItem>
                        <MenuItem value={"Book"}>Book</MenuItem>

                    </Select>
                </FormControl>
            </Col>
            <TableComponent view={view}/>
        </div>
    )



}

export default Main;