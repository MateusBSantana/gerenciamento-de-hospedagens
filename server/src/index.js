import express from 'express';
import cors from 'cors';
import { cadastroHospede, atualizandoHospede, excluindoHospede, mostrandoHospedes } from './controllers/HospedeController.js'; 
import { cadastroFuncionario } from './controllers/FuncionarioController.js'; 

const app = express();
const porta = 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('API Funcionando');
});

// Rotas de CRUD de hospedes
app.post('/hospede',cadastroHospede);
app.get('/hospede', mostrandoHospedes);
app.put('/hospede/:id', atualizandoHospede);
app.delete('/hospede/:id', excluindoHospede);

// Rotas de CRUD de hospede
app.post('/funcionario', cadastroFuncionario);

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
