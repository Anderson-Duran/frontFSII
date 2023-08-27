export const urlBase = "https://129.146.68.51/aluno5-pfsii/cadastroPaciente/pacients"

const myHeaders = new Headers();
myHeaders.append("Content-type", "application/json");
myHeaders.append('Access-Control-Allow-Origin', '*')

export const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect:"follow",
};