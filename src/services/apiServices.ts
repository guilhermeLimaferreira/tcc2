import axios from 'axios';

const BASE_URL = "http://devionic.com.br/";

const Api = axios.create({baseURL: BASE_URL});

export const getPessoas = () => Api.get("/read.php");
export const updatePessoa = (id: number, data: object) => Api.post(`update.php`, JSON.stringify({ ID: id, ...data }));
export const deletePessoa = (id: number) => Api.post('delete.php', JSON.stringify({ ID: id }));
export const createPessoa = (data: object) => Api.post('create.php', JSON.stringify(data));
export const getPessoaById = (id: number) => {
    return Api.post('getPessoaById.php', JSON.stringify({ ID: id }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };