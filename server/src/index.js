import express from 'express';
import cors from 'cors';
import { cadastroHospede, atualizandoHospede, excluindoHospede, mostrandoHospedes } from './controllers/HospedeController.js'; 
import { cadastroFuncionario } from './controllers/FuncionarioController.js'; 
import { cadastroAcomodacao, mostrandoAcomodacoes, atualizandoAcomodacao, excluindoAcomodacao } from './controllers/acomodacoesController.js'; 

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
app.put('/hospede/:id', atualizandoHospede);
app.delete('/hospede/:id', excluindoHospede);

// Rotas de CRUD de funcionários
app.post('/funcionario', cadastroFuncionario);

// Rotas de CRUD de acomodações
app.post('/acomodacao', cadastroAcomodacao);
app.get('/acomodacao', mostrandoAcomodacoes);
app.put('/acomodacao/:id', atualizandoAcomodacao);
app.delete('/acomodacao/:id', excluindoAcomodacao);

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
