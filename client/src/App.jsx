
import './App.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CadastroFuncionario from './componentes/pages/CadastroFuncionario';
import TabelaFuncionarios from './componentes/Funcionarios/TabelaFuncionarios/TabelaFuncionarios';
import EditarFuncionario from './componentes/pages/EditarFuncionario';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path='/cadastro_funcionario' element={<CadastroFuncionario/>}/>
        <Route path='/tabela_funcionarios' element={<TabelaFuncionarios/>}/>
        <Route path="/editar_funcionario/:id" element={<EditarFuncionario/>} />
      </Routes>
    </Router>
  );
}

export default App;
