import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import book from "./book.json";
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


const Book = () => {

    const [books, setBooks] = useState(book);

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

    const [data, setData] = useState({
        bookNo: '',
        name: '',
        author: ''

    });

    const { bookNo, name, author } = data;

    const handleChange = (e) => {
        e.preventDefault();
        let { name, value } = e.target;
        setData({ ...data, [name]: value });

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newBook = {
            bookNo: data.bookNo,
            name: data.name,
            author: data.author
        };


        const newBooks = [...books, newBook];
        setBooks(newBooks);

        handleClose();
    }

    const [edit, setEdit] = useState(null);

    const editSubmit = (bookNo, name, author) => {
        handleEditOpen();

        const record = {
            bookNo: bookNo,
            name: name,
            author: author
        }
        setEdit({ ...record });


    }

    const submitEdit=()=>{
        setBooks((pre)=>{
            return pre.map((c)=>{
                if(c.bookNo === edit.bookNo)
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
        setBooks(books.filter(c => c.bookNo !== fieldId));

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

                                <TextField type="text" sx={{ marginLeft: '5px', backgroundColor: '#BDBDFA', borderRadius: '4px' }} id="bookNo" autoComplete='off' label="Book Number" variant="filled" size="small" name="bookNo" value={bookNo}  onChange={handleChange} />
                                <TextField type="text" sx={{ marginLeft: '8px', backgroundColor: '#BDBDFA', borderRadius: '4px' }} id="name" autoComplete='off' label="Book Name" variant="filled" size="small" name="name" value={name} onChange={handleChange}/>
                                <TextField type="text" sx={{ marginLeft: '5px', marginTop: '4px', backgroundColor: '#BDBDFA', borderRadius: '4px' }} id="author" autoComplete='off' label="Author" variant="filled" size="small" name="author" value={author}  onChange={handleChange} />

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
                                    <TableCell sx={{ fontWeight: 'bold', fontSize: '18px' }} align="right">Book No</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', fontSize: '18px' }} align="right">Book Name</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', fontSize: '18px' }} align="right">Author</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {books.filter((val)=>{
                                    if(searchTerm == "")
                                    {
                                        return val;
                                    }
                                    else if(val.bookNo.toString().includes(searchTerm.toString()) || val.name.toLowerCase().includes(searchTerm.toLowerCase()) || val.author.toLowerCase().includes(searchTerm.toLowerCase())){
                                        return val;
                                    }
                                }).map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                         <TableCell sx={{ color: '#8A1A35', fontWeight: 'bold', backgroundColor: '#dbdfe5' }} align="right">
                                            <Button onClick={() => handleDelete(row.bookNo)} style={{ backgroundColor: "#8A1A35", color: "white", maxWidth: "90px", maxHeight: "0px", minWidth: "90px", minHeight: "35px" }} variant="outlined">Delete</Button>
                                        </TableCell>
                                        
                                         <TableCell sx={{ color: '#8A1A35', fontWeight: 'bold', backgroundColor: '#dbdfe5', fontSize: '16px' }} align="right">
                                            <Button onClick={() => editSubmit(row.bookNo, row.name, row.author)} style={{ backgroundColor: "#8A1A35", color: "white", maxWidth: "80px", maxHeight: "35px", minWidth: "80px", minHeight: "35px" }} variant="outlined">Edit</Button>
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
                                                <input class='editText' value={edit?.author}  onChange={(e)=>{
                                                    setEdit(prev=>{
                                                        return {...prev,author:e.target.value};
                                                    })
                                                }}/><br/>

                                                <Button onClick={submitEdit} style={{ width: '200px', marginLeft: "130px", marginTop: '10px', backgroundColor: '#8A1A35', color: 'white' }} variant="outlined" >Edit</Button>

                                            </Box>
                                        </Modal>

                                        <TableCell sx={{ color: '#8A1A35', fontWeight: 'bold', backgroundColor: '#dbdfe5', fontSize: '16px' }} align="right" component="th" scope="row">
                                            {row.bookNo}
                                        </TableCell>

                                        <TableCell sx={{ color: '#8A1A35', fontWeight: 'bold', backgroundColor: '#dbdfe5', fontSize: '16px' }} align="right">{row.name}</TableCell>
                                        <TableCell sx={{ color: '#8A1A35', fontWeight: 'bold', backgroundColor: '#dbdfe5', fontSize: '16px' }} align="right">{row.author}</TableCell>
                                       
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
export default Book;