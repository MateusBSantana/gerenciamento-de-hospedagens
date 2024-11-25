import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// Importação dos componentes para funcionários
import CadastroFuncionario from './componentes/pages/CadastroFuncionario';
import TabelaFuncionarios from './componentes/Funcionarios/TabelaFuncionarios/TabelaFuncionarios';
import EditarFuncionario from './componentes/pages/EditarFuncionario';

// Importação dos componentes para acomodações
import CadastroAcomodacao from './componentes/acomodacao/Cadastro';
import MenuLateral from './componentes/layout/MenuLateral/MenuLateral';
import ListaAcomodacoes from './componentes/acomodacao/ListaAcomodacoes'; 

// Importação dos componentes para hóspedes
import CadastroHospede from './componentes/pages/CadastroHospede';
import TabelaHospedes from './componentes/Hospedes/TabelaHospedes/TabelaHospedes';
import EditarHospede from './componentes/pages/EditarHospede';

// Importação dos componentes para reservas
import CadastroReserva from './componentes/pages/CadastroReserva';
import TabelaReservas from './componentes/Reservas/TabelaReservas/TabelaReservas';

// Importação do componente de Quarto (adicionando à lista de acomodações)
import Home from './componentes/home/Home'; // Novo componente para lista de quartos

function App() {
  return (
    <Router>
      <div className="app-container d-flex">
        <MenuLateral /> {/* Menu lateral adicionado */}
        <Container className="content flex-grow-1">
          <Routes>
            {/* Rota para Home */}
            <Route path="/home" element={<Home />} />

            {/* Rotas para funcionários */}
            <Route path='/cadastro_funcionario' element={<CadastroFuncionario />} />
            <Route path='/tabela_funcionarios' element={<TabelaFuncionarios />} />
            <Route path='/editar_funcionario/:id' element={<EditarFuncionario />} />

            {/* Rotas para acomodações */}
            <Route path='/cadastro_acomodacao' element={<CadastroAcomodacao />} />
            <Route path='/listagem_acomodacoes' element={<ListaAcomodacoes />} />
            <Route path="/editar_acomodacao/:id" element={<CadastroAcomodacao />} />

      
            

            {/* Rotas para hóspedes */}
            <Route path='/cadastro_hospede' element={<CadastroHospede />} />
            <Route path='/tabela_hospedes' element={<TabelaHospedes />} />
            <Route path="/editar_hospede/:id" element={<EditarHospede />} />

            {/* Rotas para reservas */}
            <Route path='/cadastro_reserva' element={<CadastroReserva />} />
            <Route path='/tabela_reserva' element={<TabelaReservas />} />
            <Route path="/cadastro_reserva/:id" element={<CadastroReserva />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
