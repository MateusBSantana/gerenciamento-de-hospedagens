
import './App.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CadastroFuncionario from './componentes/pages/CadastroFuncionario';
import TabelaFuncionarios from './componentes/TabelaFuncionarios/TabelaFuncionarios';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path='/cadastro_funcionario' element={<CadastroFuncionario/>}/>
        <Route path='/tabela_funcionarios' element={<TabelaFuncionarios/>}/>
      </Routes>
    </Router>
  );
}

export default App;
