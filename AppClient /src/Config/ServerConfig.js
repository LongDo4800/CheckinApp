const environment = 'dev';

const ApiDev = 'https://timwook.com/api/v2/';
const apiProd = 'https://timwook.com/api/v2/';
const LinkApi = environment == 'dev' ? ApiDev : apiProd
export default LinkApi;
