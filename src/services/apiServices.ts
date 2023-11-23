import axios, { AxiosError } from 'axios';


const BASE_URL = "https://devionic.com.br/";

const Api = axios.create({ baseURL: BASE_URL });

export const getPessoas = async (offset = 0) => {
  try {
    const response = await Api.get(`/read.php?offset=${offset}`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 404) {
        // Trate o erro 404 aqui
        console.log("Nenhum registro encontrado");
        return { data: { success: true, data: [] }};
      } else {
        // Trate outros erros de Axios aqui
        console.log("Erro ao fazer a solicitação:", error.message);
      }
    } else {
      // Trate erros que não são do Axios aqui
      console.log("Erro desconhecido:", error);
    }
  }
};

export const updatePessoa = (id: number, data: object) => Api.post(`update.php`, JSON.stringify({ ID: id, ...data }));
export const deletePessoa = (id: number) => Api.post('delete.php', JSON.stringify({ ID: id }));
export const createPessoa = (data: object) => Api.post('create.php', JSON.stringify(data), {
  headers: {
    'Content-Type': 'application/json',
  },
});
export const getPessoaById = (id: number) => {
  return Api.post('getPessoaById.php', JSON.stringify({ ID: id }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};