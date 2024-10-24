// src/App.jsx
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CadastroFuncionario from './componentes/pages/CadastroFuncionario';
import TabelaFuncionarios from './componentes/Funcionarios/TabelaFuncionarios/TabelaFuncionarios';
import EditarFuncionario from './componentes/pages/EditarFuncionario';

// Importação dos componentes para acomodações
import CadastroAcomodacao from './componentes/acomodacao/Cadastro';
import MenuLateral from './componentes/layout/MenuLateral/MenuLateral';
import ListaAcomodacoes from './componentes/acomodacao/ListaAcomodacoes'; 

import CadastroHospede  from './componentes/pages/CadastroHospede';
import TabelaHospedes from './componentes/Hospedes/TabelaHospedes/TabelaHospedes';
import EditarHospede from './componentes/pages/CadastroHospede';

function App() {
  return (
    <Router>
      <div className="app-container d-flex">
        <MenuLateral /> {/* Menu lateral adicionado */}
        <div className="content flex-grow-1">
          <Routes>
            {/* Rotas para funcionários */}
            <Route path='/cadastro_funcionario' element={<CadastroFuncionario />} />
            <Route path='/tabela_funcionarios' element={<TabelaFuncionarios />} />
            <Route path='/editar_funcionario/:id' element={<EditarFuncionario />} />

            {/*  rotas para acomodações */}
            <Route path='/cadastro_acomodacao' element={<CadastroAcomodacao />} />
            <Route path='/listagem_acomodacoes' element={<ListaAcomodacoes />} /> 
            <Route path="/editar_acomodacao/:id" element={<CadastroAcomodacao />} /> 

            {/*  rotas para hóspedes */}
            <Route path='/cadastro_hospede' element={<CadastroHospede/>} />
            <Route path='/tabela_hospedes' element={<TabelaHospedes/>} /> 
            <Route path="/editar_hospede/:id" element={<EditarHospede />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
