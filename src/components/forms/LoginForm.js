import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Persistencia de login
  useEffect(() => {
    const checkLoggedInUser = async () => {
      const loggedInUser = localStorage.getItem('user');
      if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        const { timestamp } = user;
        const timeElapsed = Date.now() - timestamp;
        const minutesElapsed = Math.floor(timeElapsed / (1000 * 60));
        if (minutesElapsed <= 10) {
          navigate('/dashboard');
        }
      }
    };
    checkLoggedInUser();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Faz a chamada à API para verificar o usuário e senha
      const response = await axios.post('http://localhost:8081/api/users', {
        username: username,
        password: password
      });
      // Verifica se o login foi bem-sucedido
      if (response.data.success) {
        const user = {
          username: username,
          timestamp: Date.now()
        };
        localStorage.setItem('user', JSON.stringify(user));
        // Lógica para redirecionar para a próxima página ou exibir uma mensagem de sucesso
        navigate('/dashboard');
        console.log('Login bem-sucedido!');
      } else {
        // Lógica para lidar com login inválido (usuário ou senha incorretos)
        console.log('Usuário ou senha incorretos!');
      }
    } catch (error) {
      // Lógica para lidar com erros de requisição
      console.log('Erro ao fazer a requisição:', error);
    }
  };

    return (
      <>
        {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  User
                </label>
                  <div className="mt-2">
                    <input
                      id="username"
                        name="username"
                        type="username"
                        autoComplete="username"
                        required
                        value={username} // Adiciona o valor do estado 'username' ao input
                        onChange={(e) => setUsername(e.target.value)} // Atualiza o estado 'username' quando o valor do input é alterado
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                  </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <button className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </button>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password} // Adiciona o valor do estado 'password' ao input
                    onChange={(e) => setPassword(e.target.value)} // Atualiza o estado 'password' quando o valor do input é alterado
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <button className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Start a 14 day free trial
              </button>
            </p>
          </div>
        </div>
      </>
    )
  }