import express from 'express';
import cors from 'cors';
import { cadastroHospede } from './controllers/HospedeController.js'; 

const app = express();
const porta = 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('API Funcionando');
});

// Rotas de CRUD de hospe
app.post('/hospede',cadastroHospede);

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
