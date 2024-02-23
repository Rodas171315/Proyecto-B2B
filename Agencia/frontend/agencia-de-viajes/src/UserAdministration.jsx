import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UserAdministration = () => {
    const navigate = useNavigate();

    // Datos simulados de usuarios
    const [users, setUsers] = useState([
        { id: 1, name: "John Doe", email: "john@example.com", role: "User" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Admin" },
        
    ]);

    const handleEditUser = (userId) => {
        
        console.log(`Edit user ${userId}`);
    };

    const handleDeleteUser = (userId) => {
        
        console.log(`Delete user ${userId}`);
        
    };

    return (
        
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" sx={{ mb: 4 }}>
                    Administración de Usuarios
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Correo Electrónico</TableCell>
                                <TableCell>Rol</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleEditUser(user.id)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteUser(user.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            
    );
};

export default UserAdministration;
