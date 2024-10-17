import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MenuLateral.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faCalendar, faUserGroup, faMap, faGear, faChevronRight, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

function MenuLateral() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`d-flex flex-column bg-white vh-100 ${isOpen ? 'open-sidebar' : ''}`} id="sidebar" style={{ minWidth: isOpen ? '200px' : '60px', height: '100vh' }}>
      <div id="sidebar_content" className="flex-grow-1 d-flex flex-column m-0" style={{ backgroundColor: '#006bb4' }}>
        {/* Informações do usuário */}
        <div id="user" className="d-flex align-items-center justify-content-start text-center mb-5 mt-3 ms-3">
          <FontAwesomeIcon icon={faUser} style={{ fontSize: '25px', color: '#ffffff', paddingLeft: '10px' }} />
          <div id="user_infos" className="d-flex flex-column ms-0 align-items-start">
            <span className="item-description text-white ms-0" style={{ fontSize: '12px' }}>Ney Schunk</span>
          </div>
        </div>
        {/* Itens do menu */}
        <ul id="side_items" className="nav flex-column gap-2 flex-grow-1 align-items-start w-100">
          
    <li className="nav-item side-item w-100">
  <a href="#" className="nav-link text-white d-flex align-items-center  justify-content-start hover-effect w-100">
    <FontAwesomeIcon icon={faHouse} style={{ fontSize: '25px', color: '#ffffff', paddingRight:  '12px' }} />
    <span className="item-description text-white">Home</span>
  </a>
</li>

      <li className="nav-item side-item w-100">
        <a href="#" className="nav-link text-white d-flex align-items-center justify-content-start w-100">
        <div className="d-flex justify-content-start">
          <FontAwesomeIcon icon={faCalendar} style={{ fontSize: '25px', color: '#ffffff', paddingRight:  '12px' }} />
          </div>
          <span className="item-description text-white">Reservas</span>
        </a>
      </li>
      <li className="nav-item side-item w-100">
        <a href="/tabela_hospedes" className="nav-link text-white d-flex align-items-center  justify-content-start w-100">
          <FontAwesomeIcon icon={faUserGroup} style={{ fontSize: '25px', color: '#ffffff', paddingRight:  '12px' }} />
          <span className="item-description text-white">Hóspedes</span>
        </a>
      </li>
      <li className="nav-item side-item w-100">
        <a href="#" className="nav-link text-white d-flex align-items-center  justify-content-start w-100">
          <FontAwesomeIcon icon={faMap} style={{ fontSize: '25px', color: '#ffffff', paddingRight:  '12px' }} />
          <span className="item-description text-white">Mapa</span>
        </a>
      </li>
      <li className="nav-item side-item w-100">
        <a href="#" className="nav-link text-white d-flex align-items-center justify-content-start w-100">
          <FontAwesomeIcon icon={faGear} style={{ fontSize: '25px', color: '#ffffff', paddingRight:  '12px' }} />
          <span className="item-description text-white">Ajustes</span>
        </a>
      </li>
      <li className="nav-item side-item mt-auto w-100">
        <a href="#" className="nav-link text-white d-flex align-items-center  justify-content-start w-100">
          <FontAwesomeIcon icon={faRightFromBracket} style={{ fontSize: '25px', color: '#ffffff', paddingRight:  '12px' }} />
          <span className="item-description text-white">Logout</span>
        </a>
      </li>
    </ul>
    {/* Botão para abrir/fechar o menu */}
    <button id="open_btn" className="btn btn-link text-white d-flex justify-content-center align-items-center p-2" onClick={toggleMenu} style={{ position: 'absolute', top: '10px', right: '-40px', backgroundColor: '#4f46e5', borderRadius: '30%', width: '50px', height: '50px', transition: 'transform 0.6s' }}>
      <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: '20px' }} />
      <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: '20px'}} />
    </button>
  </div>
</div>
  );
}

export default MenuLateral;
