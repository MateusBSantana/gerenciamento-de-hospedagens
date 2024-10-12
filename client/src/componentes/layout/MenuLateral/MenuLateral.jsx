import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faRightFromBracket, faHouse, faCalendar, faUserGroup, faMap, faGear, faUser } from '@fortawesome/free-solid-svg-icons'; // Certifique-se de que a capitalização está correta

function MenuLateral() {
  return (
    <div className="d-flex flex-column vh-100 bg-primary text-white" style={{ width: '19%' }}>
      <nav id="sidebar" className="d-flex flex-column flex-grow-1">
        <div id="sidebar_content" className="p-3">
          {/* Informações do usuário */}
          <div id="user" className="mb-4 d-flex flex-column align-items-center">
            <FontAwesomeIcon icon={faUser} style={{ color: "#ffffff" }} size="2x" />
            <p id="user_infos" className="mt-2 text-center">
              <span className="d-block">Ney Schunk</span>
            </p>
          </div>
          {/* Itens do menu */}
          <ul id="side_items" className="nav flex-column">
            <li className="nav-item">
              <a href="#" className="nav-link text-white">
                <FontAwesomeIcon icon={faHouse} style={{ color: "#ffffff" }} size="2x" />
                <span className="ms-2 fs-3">Home</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link text-white">
                <FontAwesomeIcon icon={faCalendar} style={{ color: "#ffffff" }} size="2x" />
                <span className="ms-2 fs-3">Reservas</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link text-white">
                <FontAwesomeIcon icon={faUserGroup} style={{ color: "#ffffff" }} size="2x" />
                <span className="ms-2 fs-3">Hóspedes</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link text-white">
                <FontAwesomeIcon icon={faMap} style={{ color: "#ffffff" }} size="2x" />
                <span className="ms-2 fs-3">Mapa</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link text-white">
                <FontAwesomeIcon icon={faGear} style={{ color: "#ffffff" }} size="2x" />
                <span className="ms-2 fs-3">Ajustes</span>
              </a>
            </li>
          </ul>
          {/* Botão para abrir/fechar o menu */}
          <button id="open_btn" className="btn btn-link text-white mt-3">
            <FontAwesomeIcon icon={faChevronRight} style={{ color: "#ffffff" }} size="2x" />
          </button>
        </div>
        {/* Botão de logout */}
        <div id="logout" className="mt-auto p-3">
          <button id="logout_btn" className="btn btn-link text-white">
            <FontAwesomeIcon icon={faRightFromBracket} style={{ color: "#ffffff" }} size="2x" />
            <span className="ms-2 fs-3">Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default MenuLateral;
