import React, { useState, useEffect } from 'react';
import { Typography, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UserAdministration = () => {

    const [users, setUsers] = useState([]);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [userId, setUserId] = useState(null);

    const [editFormData, setEditFormData] = useState({
        rol: 1, 
        email: '',
        password: '',
        primer_nombre: '',
        segundo_nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        fecha_nacimiento: '',
        nacionalidad: '',
        pasaporte: '',
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/usuarios');
                if (!response.ok) throw new Error('Error al cargar usuarios');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error(error);
                
            }
        };

        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId) => {
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + `/usuarios/${userId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Error al eliminar usuario');
            
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error(error);
            
        }
    };
 
    const handleEditUserClick = (userId) => {
        const user = users.find(user => user.id === userId);
        setEditFormData({
            rol: user.rol, 
            email: user.email,
            password: user.password,
            primer_nombre: user.primer_nombre,
            segundo_nombre: user.segundo_nombre,
            primer_apellido: user.primer_apellido,
            segundo_apellido: user.segundo_apellido,
            fecha_nacimiento: user.fecha_nacimiento,
            nacionalidad: user.nacionalidad,
            pasaporte: user.pasaporte,
        });
        setUserId(userId);
        setEditDialogOpen(true);
    };

    const handleUpdateUser = async () => {
        if (userId) {
            console.log(`Actualizando usuario con ID: ${userId}`, editFormData);
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL + `/usuarios/${userId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(editFormData),
                });
                if (!response.ok) throw new Error('Error al actualizar usuario');
                
                
                const updatedUsers = users.map(user => 
                    user.id === userId ? { ...user, ...editFormData } : user
                );
                setUsers(updatedUsers);

                setEditDialogOpen(false);
                setUserId(null); 
            } catch (error) {
                console.error("Error al actualizar el usuario:", error);
            }
        }
    };

    const handleEditFormChange = (e) => {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    };

    
    const EditDialog = () => (
        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
            <DialogTitle>Editar Usuario</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="rol"
                    label="Rol"
                    type="text"
                    fullWidth
                    name="rol"
                    value={editFormData.rol || ''}
                    onChange={handleEditFormChange} 
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Correo Electronico"
                    type="text"
                    fullWidth
                    name="email"
                    value={editFormData.email || ''}
                    onChange={handleEditFormChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    label="Contraseña"
                    type="password" 
                    fullWidth
                    name="password"
                    value={editFormData.password || ''}
                    onChange={handleEditFormChange} 
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id="primer_nombre"
                    label="Primer Nombre"
                    type="text"
                    fullWidth
                    name="primer_nombre"
                    value={editFormData.primer_nombre || ''}
                    onChange={handleEditFormChange} 
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="segundo_nombre"
                    label="Segundo Nombre"
                    type="text"
                    fullWidth
                    name="segundo_nombre"
                    value={editFormData.segundo_nombre || ''}
                    onChange={handleEditFormChange} 
                />
                <TextField
                    margin="dense"
                    id="primer_apellido"
                    label="Primer Apellido"
                    type="text"
                    fullWidth
                    name="primer_apellido"
                    value={editFormData.primer_apellido || ''}
                    onChange={handleEditFormChange} 
                />
                <TextField
                    margin="dense"
                    id="segundo_apellido"
                    label="Segundo Apellido"
                    type="text"
                    fullWidth
                    name="segundo_apellido"
                    value={editFormData.segundo_apellido || ''}
                    onChange={handleEditFormChange} 
                />
                <TextField
                    margin="dense"
                    id="fecha_nacimiento"
                    label="Fecha de Nacimiento"
                    type="text"
                    fullWidth
                    name="fecha_nacimiento"
                    value={editFormData.fecha_nacimiento || ''}
                    onChange={handleEditFormChange} 
                />
                <TextField
                    margin="dense"
                    id="nacionalidad"
                    label="Nacionalidad"
                    type="text"
                    fullWidth
                    name="nacionalidad"
                    value={editFormData.nacionalidad || ''}
                    onChange={handleEditFormChange} 
                />
                <TextField
                    margin="dense"
                    id="pasaporte"
                    label="Pasaporte"
                    type="text"
                    fullWidth
                    name="pasaporte"
                    value={editFormData.pasaporte || ''}
                    onChange={handleEditFormChange} 
                />
                
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setEditDialogOpen(false)}>Cancelar</Button>
                <Button onClick={handleUpdateUser}>Guardar</Button>
            </DialogActions>
        </Dialog>
    );
    

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            
            <Typography variant="h4" sx={{ mb: 4, mt: 4 }}>
                Administración de Usuarios
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Apellido</TableCell>
                            <TableCell>Correo Electrónico</TableCell>
                            <TableCell>Nacionalidad</TableCell>
                            <TableCell>Rol</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.primer_nombre}</TableCell>
                                <TableCell>{user.primer_apellido}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.nacionalidad}</TableCell>
                                <TableCell>{user.rol}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditUserClick(user.id)}>
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
            <EditDialog />
        </Container>
    );
};

export default UserAdministration;

