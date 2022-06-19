import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import customers from "./customer.json";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import Grid from '@mui/material';
import { TextField } from '@mui/material';
import { nanoid } from 'nanoid';


const Customer = () => {

    const [searchTerm,setSearchTerm]=useState('');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [editOpen, setEditOpen] = useState(false);
    const handleEditOpen = () => setEditOpen(true);
    const handleEditClose = () => setEditOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 550,
        bgcolor: '#dbdfe5',
        borderRadius: "5px",
        boxShadow: 24,
        p: 4,
    };

    

    const [customer, setCustomer] = useState(customers);
    const [data, setData] = useState({
        custNo: '',
        name: '',
        phoneNo: '',
        bookNo: '',
        issueDate: ''

    });

    const { custNo, name, phoneNo, bookNo, issueDate } = data;

    const handleChange = (e) => {
        e.preventDefault();
        let { name, value } = e.target;
        setData({ ...data, [name]: value });

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newCustomer = {
            id: nanoid(),
            custNo: data.custNo,
            name: data.name,
            phoneNo: data.phoneNo,
            bookNo: data.bookNo,
            issueDate: data.issueDate
        };


        const newCustomers = [...customer, newCustomer];
        setCustomer(newCustomers);

        handleClose();
    }

    const [edit, setEdit] = useState(null);

    const editSubmit = (custNo, name, phoneNo, bookNo, issueDate) => {
        handleEditOpen();

        const record = {
            custNo: custNo,
            name: name,
            phoneNo: phoneNo,
            bookNo: bookNo,
            issueDate: issueDate
        }
        setEdit({ ...record });


    }

    const submitEdit=()=>{
        setCustomer((pre)=>{
            return pre.map((c)=>{
                if(c.custNo === edit.custNo)
                {
                    return edit;
                }
                else
                {
                    return c;
                }
            });
        });
        handleEditClose();
    }

    const handleDelete = (fieldId) => {
        setCustomer(customer.filter(c => c.custNo !== fieldId));

    };


    return (
        <div>
            <Col sm={10} className="custTable">
                <Row>
                    <div className='btns'>
                    <input id="search" placeholder='Select Field' name="search" onChange={(e)=>{setSearchTerm(e.target.value)}}></input>
                    <Button id="addfield" onClick={handleOpen} style={{ backgroundColor: "#8A1A35", color: "white", maxWidth: "200px", maxHeight: "43px", minWidth: "200px", minHeight: "43px" }} variant="outlined">Add New Field</Button>
                    </div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description">
                        <Box sx={style}>
                            <Typography variant="h6" style={{ marginBottom: "10px", marginLeft: "6px", fontWeight: 'bold', color: "#8A1A35" }}>
                                Add New Field
                            </Typography>
                            <div>

                                <TextField type="number" sx={{ marginLeft: '5px', backgroundColor: '#BDBDFA', borderRadius: '4px' }} id="custNo" autoComplete='off' label="Customer ID" variant="filled" size="small" name="custNo" value={custNo} onChange={handleChange} />
                                <TextField type="text" sx={{ marginLeft: '8px', backgroundColor: '#BDBDFA', borderRadius: '4px' }} id="name" autoComplete='off' label="Customer Name" variant="filled" size="small" name="name" value={name} onChange={handleChange} />
                                <TextField sx={{ marginLeft: '5px', marginTop: '8px',backgroundColor: '#BDBDFA', borderRadius: '4px' }} id="phoneNo" autoComplete='off' label="Phone Number" variant="filled" size="small" name="phoneNo" value={phoneNo} onChange={handleChange} />
                                <TextField type="number" sx={{ marginLeft: '8px', marginTop: '8px', backgroundColor: '#BDBDFA', borderRadius: '4px' }} autoComplete='off' id="bookNo" label="Book Number" variant="filled" size="small" name="bookNo" value={bookNo} onChange={handleChange} />
                                <TextField type="date" sx={{ marginLeft: '5px', marginTop: '8px', backgroundColor: '#BDBDFA', borderRadius: '4px',width:'220px' }} InputLabelProps={{ shrink: 'true' }}  autoComplete='off' id="issueDate" label="Issue Date" variant="filled" size="small" name="issueDate" value={issueDate} onChange={handleChange} />

                                <Button onClick={handleSubmit} style={{ width: '200px', marginLeft: "130px", marginTop: '10px', backgroundColor: '#8A1A35', color: 'white' }} variant="outlined" >Add</Button>

                            </div>


                        </Box>
                    </Modal>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead sx={{ backgroundColor: "#BDBDFA" }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', fontSize: '18px' }} align="right">Delete Field</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', fontSize: '18px' }} align="right">Edit Field</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', fontSize: '18px' }} align="right">Customer No</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', fontSize: '18px' }} align="right">Customer Name</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', fontSize: '18px' }} align="right">Phone Number</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', fontSize: '18px' }} align="right">Book Number</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', fontSize: '18px' }} align="right">Issue Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {customer.filter((val)=>{
                                    if(searchTerm == "")
                                    {
                                        return val;
                                    }
                                    else if(val.name.toLowerCase().includes(searchTerm.toLowerCase()) || val.issueDate.toString().includes(searchTerm.toString()) || val.custNo.toString().includes(searchTerm.toString()) || val.phoneNo.toString().includes(searchTerm.toString()) || val.bookNo.toString().includes(searchTerm.toString()))
                                    {
                                        return val;
                                    }
                                }).map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                         <TableCell sx={{ color: '#8A1A35', fontWeight: 'bold', backgroundColor: '#dbdfe5' }} align="right">
                                            <Button onClick={() => handleDelete(row.custNo)} style={{ backgroundColor: "#8A1A35", color: "white", maxWidth: "90px", maxHeight: "0px", minWidth: "90px", minHeight: "35px" }} variant="outlined">Delete</Button>
                                        </TableCell>

                                        <TableCell sx={{ color: '#8A1A35', fontWeight: 'bold', backgroundColor: '#dbdfe5',fontSize:'16px' }} align="right">
                                            <Button onClick={() => editSubmit(row.custNo, row.name, row.phoneNo, row.bookNo, row.issueDate)} style={{ backgroundColor: "#8A1A35", color: "white", maxWidth: "80px", maxHeight: "35px", minWidth: "80px", minHeight: "35px" }} variant="outlined">Edit</Button>
                                        </TableCell>
                                        <Modal
                                            open={editOpen}
                                            onClose={handleEditClose}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description">
                                            <Box sx={style}>
                                                <Typography variant="h6" style={{ marginBottom: "10px", marginLeft: "170px", fontWeight: 'bold', color: "#8A1A35" }}>
                                                    Edit Field
                                                </Typography>
                                                <input class='editText' value={edit?.name} onChange={(e)=>{
                                                    setEdit(prev=>{
                                                        return {...prev,name:e.target.value};
                                                    })
                                                }}/><br/>
                                                <input class='editText' value={edit?.phoneNo}  onChange={(e)=>{
                                                    setEdit(prev=>{
                                                        return {...prev,phoneNo:e.target.value};
                                                    })
                                                }}/><br/>

                                                <input class='editText' value={edit?.bookNo}  onChange={(e)=>{
                                                    setEdit(prev=>{
                                                        return {...prev,bookNo:e.target.value};
                                                    })
                                                }}/><br/>

                                                <input class='editText' value={edit?.issueDate}  onChange={(e)=>{
                                                    setEdit(prev=>{
                                                        return {...prev,issueDate:e.target.value};
                                                    })
                                                }}/><br/>

                                                <Button onClick={submitEdit} style={{ width: '200px', marginLeft: "130px", marginTop: '10px', backgroundColor: '#8A1A35', color: 'white' }} variant="outlined" >Edit</Button>

                                            </Box>
                                        </Modal>

                                        <TableCell sx={{ color: '#8A1A35', fontWeight: 'bold', backgroundColor: '#dbdfe5' ,fontSize:'16px'}} component="th" scope="row" align="right">
                                            {row.custNo}
                                        </TableCell>

                                        <TableCell sx={{ color: '#8A1A35', fontWeight: 'bold', backgroundColor: '#dbdfe5' ,fontSize:'16px'}} align="right">{row.name}</TableCell>
                                        <TableCell sx={{ color: '#8A1A35', fontWeight: 'bold', backgroundColor: '#dbdfe5',fontSize:'16px' }} align="right">{row.phoneNo}</TableCell>
                                        <TableCell sx={{ color: '#8A1A35', fontWeight: 'bold', backgroundColor: '#dbdfe5',fontSize:'16px' }} align="right">{row.bookNo}</TableCell>
                                        <TableCell sx={{ color: '#8A1A35', fontWeight: 'bold', backgroundColor: '#dbdfe5',fontSize:'16px' }} align="right">{row.issueDate}</TableCell>
                                        
                                    </TableRow>

                                ))}
                            </TableBody>
                        </Table>

                    </TableContainer>
                </Row>

            </Col>
        </div>
    )

}
export default Customer;