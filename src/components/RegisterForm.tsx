     import React, { useState } from 'react';
     import api from '../services/api';
     import { useRouter } from 'next/router';

     const RegisterForm: React.FC = () => {
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const router = useRouter();

      const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
      await api.post('/auth/register', { name, email, password });
      router.push('/login');
      } catch (error) {
      console.error('Erro ao registrar:', error);
      }
      };

      return (
      <form onSubmit={handleSubmit}>
      <input
      type="text"
      placeholder="Nome"
      value={name}
      onChange={(e) => setName(e.target.value)}
      />
      <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      />
      <input
      type="password"
      placeholder="Senha"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Registrar</button>
      </form>
      );
     };

     export default RegisterForm;
