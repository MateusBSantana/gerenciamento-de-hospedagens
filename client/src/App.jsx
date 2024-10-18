// src/App.jsx
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CadastroFuncionario from './componentes/pages/CadastroFuncionario';
import TabelaFuncionarios from './componentes/Funcionarios/TabelaFuncionarios/TabelaFuncionarios';
import EditarFuncionario from './componentes/pages/EditarFuncionario';

// Importação dos novos componentes para acomodações
import CadastroAcomodacao from './componentes/acomodacao/Cadastro';
import ListagemAcomodacoes from './componentes/acomodacao/Listagem';
import EditarAcomodacao from './componentes/acomodacao/Editar';
import Comodidades from './componentes/acomodacao/Comodidades';
import MenuLateral from './componentes/layout/MenuLateral/MenuLateral'; // Ajustando o caminho


function App() {
  return (
    <Router>
      <div className="app-container d-flex">
        <MenuLateral /> {/* Adicionando o menu lateral apenas uma vez */}
        <div className="content flex-grow-1">
          <Routes>
            {/* Rotas existentes para funcionários */}
            <Route path='/cadastro_funcionario' element={<CadastroFuncionario />} />
            <Route path='/tabela_funcionarios' element={<TabelaFuncionarios />} />
            <Route path='/editar_funcionario/:id' element={<EditarFuncionario />} />

            {/* Novas rotas para acomodações */}
            <Route path='/cadastro_acomodacao' element={<CadastroAcomodacao />} />
            <Route path='/listagem_acomodacoes' element={<ListagemAcomodacoes />} />
            <Route path='/editar_acomodacao/:id' element={<EditarAcomodacao />} />
            <Route path='/comodidades' element={<Comodidades />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
