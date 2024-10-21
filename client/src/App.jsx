
import './App.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CadastroFuncionario from './componentes/pages/CadastroFuncionario';
import TabelaFuncionarios from './componentes/Funcionarios/TabelaFuncionarios/TabelaFuncionarios';
import EditarFuncionario from './componentes/pages/EditarFuncionario';
import CadastroHospede from './componentes/pages/CadastroHospede';
import TabelaHospedes from './componentes/Hospedes/TabelaHospedes/TabelaHospedes';
import EditarHospede from './componentes/pages/EditarHospede';

import MapaReservas from './componentes/MapaDeReservas/MapaReservas';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path='/cadastro_funcionario' element={<CadastroFuncionario/>}/>
        <Route path='/tabela_funcionarios' element={<TabelaFuncionarios/>}/>
        <Route path="/editar_funcionario/:id" element={<EditarFuncionario/>} />
        
        <Route path='/cadastro_hospede' element={<CadastroHospede/>}/>
        <Route path='/tabela_hospedes' element={<TabelaHospedes/>}/>
        <Route path="/editar_hospede/:id" element={<EditarHospede/>} />

        <Route path="/mapa_reservas" element={<MapaReservas/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
