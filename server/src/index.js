import express from 'express';
import cors from 'cors';



import { cadastroAcomodacao, mostrandoAcomodacoes, atualizandoAcomodacao, excluindoAcomodacao, mostrandoAcomodacaoPorId } from './controllers/acomodacoesController.js'; 
import { cadastroHospede, atualizandoHospede, excluindoHospede, mostrandoHospedes,mostrandoUmHospede } from './controllers/HospedeController.js'; 
import { cadastroFuncionario, mostrandoFuncionarios, atualizandoFuncionario, mostrandoUmFuncionario } from './controllers/FuncionarioController.js'; 
import { cadastroReserva, mostrandoReservas, mostrandoUmaReserva, atualizandoReserva } from './controllers/reservaController.js';


 


  
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
app.get('/acomodacoes/:id', mostrandoAcomodacaoPorId);
app.put('/acomodacoes/:id', atualizandoAcomodacao);
app.delete('/acomodacoes/:id', excluindoAcomodacao);

// Rotas de CRUD de Reserva
app.post('/reservas', cadastroReserva);
app.get('/reservas', mostrandoReservas);
app.get('/reservas/:id', mostrandoUmaReserva);
app.put('/reservas/:id', atualizandoReserva);

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);

});
