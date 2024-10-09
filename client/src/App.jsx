
import './App.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CadastroFuncionario from './componentes/pages/CadastroFuncionario';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path='/cadastro_funcionario' element={<CadastroFuncionario/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
