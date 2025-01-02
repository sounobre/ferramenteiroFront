 import React from 'react';
 import { Formik, Form, Field, ErrorMessage } from 'formik';
 import * as Yup from 'yup';
 import api from '../../../services/api';
 import { UserDTO } from '../../../types/user';
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

 const NewUser: React.FC = () => {
  const router = useRouter();

  const handleCreateUser = async (values: UserDTO) => {
  try {
  await api.post('/users', values);
  router.push('/users');
  } catch (error) {
  console.error('Erro ao salvar usuário:', error);
  }
  };

  return (
  <Container>
  <Typography variant="h4" gutterBottom>
  Novo Usuário
  </Typography>
  <Formik
  initialValues={{ name: '', email: '' }}
  validationSchema={validationSchema}
  onSubmit={handleCreateUser}
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
  Criar Usuário
  </Button>
  </Box>
  </Form>
  )}
  </Formik>
  </Container>
  );
 };

 export default NewUser;
