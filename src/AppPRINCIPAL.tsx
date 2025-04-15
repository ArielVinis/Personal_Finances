import { useState } from 'react';
import axios from 'axios';

const API_URL = 'https://api.sandbox.j17bank.com.br/auth/login';

const AppPRINCIPAL: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginResponse, setLoginResponse] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post(API_URL, { email, password });
      setLoginResponse(`Login bem-sucedido! Token: ${response.data.data.token}`);
    } catch (error: unknown) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : 'Erro ao realizar login';
      setLoginResponse(`Erro: ${errorMessage}`);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Teste de Login</h1>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '10px', marginRight: '10px', width: '300px' }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px', width: '300px' }}
        />
      </div>
      <button
        onClick={handleLogin}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Fazer Login
      </button>
      {loginResponse && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
          {loginResponse}
        </div>
      )}
    </div>
  );
};

export default AppPRINCIPAL;