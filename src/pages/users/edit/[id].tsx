 import React, { useState, useEffect } from 'react';
 import { Formik, Form, Field, ErrorMessage } from 'formik';
 import * as Yup from 'yup';
 import api from '../../../services/api';
 import { User, UserDTO } from '../../../types/user';
 import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  FormHelperText
 } from '@mui/material';
 import { useRouter } from 'next/router';

 const validationSchema = Yup.object({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string().email('Email inválido').required('O email é obrigatório'),
 });

 const EditUser: React.FC = () => {
  const [initialValues, setInitialValues] = useState<UserDTO>({ name: '', email: '' });
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
  const fetchUser = async () => {
  if (id) {
  try {
  const response = await api.get<User>(`/users/${id}`);
  setInitialValues(response.data);
  } catch (error) {
  console.error('Erro ao buscar usuário:', error);
  }
  }
  };
  fetchUser();
  }, [id]);

  const handleUpdateUser = async (values: UserDTO) => {
  try {
  await api.put(`/users/${id}`, values);
  router.push('/users');
  } catch (error) {
  console.error('Erro ao atualizar usuário:', error);
  }
  };

  return (
  <Container>
  <Typography variant="h4" gutterBottom>
  Editar Usuário
  </Typography>
  <Formik
  enableReinitialize
  initialValues={initialValues}
  validationSchema={validationSchema}
  onSubmit={handleUpdateUser}
  >
  {({ isSubmitting, errors, touched }) => (
  <Form>
  <Box sx={{ mb: 2 }}>
  <Field
  name="name"
  as={TextField}
  label="Nome"
  fullWidth
  margin="normal"
  error={!!(touched.name && errors.name)}
  helperText={
  <FormHelperText error={!!(touched.name && errors.name)}>
  <ErrorMessage name="name" />
  </FormHelperText>
  }
  />
  <Field
  name="email"
  as={TextField}
  label="Email"
  fullWidth
  margin="normal"
  error={!!(touched.email && errors.email)}
  helperText={
   <FormHelperText error={!!(touched.email && errors.email)}>
  <ErrorMessage name="email" />
  </FormHelperText>
  }
  />
  <Button
  variant="contained"
  color="primary"
  type="submit"
  disabled={isSubmitting}
  sx={{ mt: 2 }}
  >
  Atualizar Usuário
  </Button>
  </Box>
  </Form>
  )}
  </Formik>
  </Container>
  );
 };

 export default EditUser;
