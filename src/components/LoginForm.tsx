import React, { useState } from 'react';
import api from '../services/api';
import { useRouter } from 'next/router';

interface LoginResponse {
    token: string;
}

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post<LoginResponse>('/auth/login', { email, password });
            const token = response.data.token;
            if (token) {
                localStorage.setItem('token', token);
                console.log('Login successful, token:', token);
                router.push('/users');
            } else {
                console.error('Token not found in response');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
