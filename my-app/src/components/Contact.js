
import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress,
  Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar, Alert 
} from '@mui/material';
import { fetchUsers, createUser, updateUser, deleteUser } from '../api/userApi';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', age: '' });

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await fetchUsers();
        setUsers(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      currentUser ? await updateUser(currentUser._id, formData) : await createUser(formData);
      setSnackbar({ open: true, message: currentUser ? 'User updated' : 'User created', severity: 'success' });
      setOpenDialog(false);
      const response = await fetchUsers();
      setUsers(response.data);
    } catch (err) {
      setSnackbar({ open: true, message: 'Operation failed', severity: 'error' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setSnackbar({ open: true, message: 'User deleted', severity: 'success' });
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      setSnackbar({ open: true, message: 'Delete failed', severity: 'error' });
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>User Management</Typography>
      <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>Add New User</Button>
      {loading ? <CircularProgress /> : error ? <Alert severity="error">{error}</Alert> : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow key={user._id}>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.age || '-'}</TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={() => { setCurrentUser(user); setFormData(user); setOpenDialog(true); }}>Edit</Button>
                    <Button variant="outlined" color="error" onClick={() => handleDelete(user._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{currentUser ? 'Edit User' : 'Add New User'}</DialogTitle>
        <DialogContent>
          <TextField name="firstName" label="First Name" fullWidth value={formData.firstName} onChange={handleInputChange} required />
          <TextField name="lastName" label="Last Name" fullWidth value={formData.lastName} onChange={handleInputChange} required />
          <TextField name="email" label="Email" fullWidth value={formData.email} onChange={handleInputChange} required disabled={!!currentUser} />
          <TextField name="age" label="Age" fullWidth value={formData.age} onChange={handleInputChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">{currentUser ? 'Update' : 'Create'}</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </div>
  );
};

export default UserManagement;
