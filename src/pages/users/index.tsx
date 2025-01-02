import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { User } from '../../types/user';
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }
        fetchUsers();
    }, [router]);

    const fetchUsers = async () => {
        try {
            const response = await api.get<User[]>('/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error.response ? error.response.data : error.message);
        }
    };

    const handleEditUser = (user: User) => {
        router.push(`/users/edit/${user.id}`);
    };

    const handleDeleteUser = async (id: number) => {
        try {
            await api.delete(`/users/${id}`);
            fetchUsers();
        } catch (error) {
            console.error('Erro ao deletar usuário:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Gerenciamento de Usuários
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell align="right">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                key={user.id}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#f0f0f0',
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {user.name}
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell align="right">
                                    <IconButton aria-label="edit" onClick={() => handleEditUser(user)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={() => handleDeleteUser(user.id)}>
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

export default Users;
