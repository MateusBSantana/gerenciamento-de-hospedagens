import express from 'express';
import cors from 'cors';


import { cadastroAcomodacao, mostrandoAcomodacoes, atualizandoAcomodacao, excluindoAcomodacao, mostrandoAcomodacaoPorId } from './controllers/acomodacoesController.js'; 

import { cadastroHospede, atualizandoHospede, excluindoHospede, mostrandoHospedes,mostrandoUmHospede } from './controllers/HospedeController.js'; 
import { cadastroFuncionario, mostrandoFuncionarios, atualizandoFuncionario, mostrandoUmFuncionario } from './controllers/FuncionarioController.js'; 
import { atualizarUsuario, criarUsuario, logarUsuario, mostrarUmUsuario, mostrarUsuario } from './controllers/UsuarioController.js';
 

const app = express();
const porta = 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('API Funcionando');
});

// Rotas de CRUD de hóspedes
app.post('/hospede', cadastroHospede);
app.get('/hospede', mostrandoHospedes);
app.get('/hospedes/:id', mostrandoUmHospede)
app.put('/hospedes/:id', atualizandoHospede);
app.delete('/hospede/:id', excluindoHospede);


// Rotas de CRUD de funcionario

app.post('/funcionario', cadastroFuncionario);
app.get('/funcionario', mostrandoFuncionarios);
app.get('/funcionario/:id', mostrandoUmFuncionario);
app.put('/funcionario/:id', atualizandoFuncionario);



// Rotas de CRUD de acomodações
app.post('/acomodacoes', cadastroAcomodacao);
app.get('/acomodacoes', mostrandoAcomodacoes);
app.get('/acomodacoes/:id', mostrandoAcomodacaoPorId); // Adicionando a rota para pegar uma acomodação específica pelo id
app.put('/acomodacoes/:id', atualizandoAcomodacao);
app.delete('/acomodacoes/:id', excluindoAcomodacao);

//CRUD Usuario
app.post('/usuario/', criarUsuario);
app.get('/usuario/', mostrarUsuario);
app.get('/usuario/:id_usuario',mostrarUmUsuario);
app.put('/usuario/:id_usuario',atualizarUsuario);

//Rota para Logar
app.post('/logar/',logarUsuario);

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
