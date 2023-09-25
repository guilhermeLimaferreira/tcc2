import axios from 'axios';

const api = axios.create({
  baseURL: 'http://devionic.com.br/', // Endereço atualizado do seu backend
});

export const getPessoas = () => api.get('read.php');
export const updatePessoa = (id, data) => api.post(`update.php`, JSON.stringify({ ID: id, ...data }));
export const deletePessoa = (id) => api.post('delete.php', JSON.stringify({ ID: id }));
export const createPessoa = (data) => api.post('create.php', JSON.stringify(data));
export const getPessoaById = (id) => {
    return api.post('getPessoaById.php', JSON.stringify({ ID: id }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
