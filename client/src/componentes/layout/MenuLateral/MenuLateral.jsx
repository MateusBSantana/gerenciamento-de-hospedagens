import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "./MenuLateral.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUser,
  faCalendar,
  faUserGroup,
  faMap,
  faChevronRight,
  faRightFromBracket,
  faGear, // Adicionando o ícone para "Ajustes"
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function MenuLateral() {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("Usuário"); // Estado para armazenar o nome do usuário
  const [userCargo, setUserCargo] = useState(""); // Cargo do usuário
  const [mostrarAjustes, setMostrarAjustes] = useState(false); // Controle de exibição da página de ajustes

  // Carrega as informações do usuário do localStorage ao montar o componente
  useEffect(() => {
    const storedUserName = localStorage.getItem("userName"); // Obtém o nome do usuário
    const storedUserCargo = localStorage.getItem("userCargo"); // Obtém o cargo do usuário

    if (storedUserName) {
      setUserName(storedUserName);
    }
    if (storedUserCargo) {
      setUserCargo(storedUserCargo);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Alterna o estado do menu lateral
  };

  return (
    <div
      className={`d-flex flex-column bg-white vh-100 ${isOpen ? "open-sidebar" : ""}`}
      id="sidebar"
      style={{ minWidth: isOpen ? "200px" : "60px", height: "100vh" }}
    >
      <div
        id="sidebar_content"
        className="flex-grow-1 d-flex flex-column m-0"
        style={{ backgroundColor: "#006bb4" }}
      >
        {/* Informações do usuário */}
        <div
          id="user"
          className="d-flex align-items-center justify-content-start text-center mb-5 mt-3 ms-3"
        >
          <FontAwesomeIcon
            icon={faUser}
            style={{ fontSize: "25px", color: "#ffffff", paddingLeft: "10px" }}
          />
          <div
            id="user_infos"
            className="d-flex flex-column ms-0 align-items-start"
          >
            <span
              className="item-description text-white ms-0"
              style={{ fontSize: "12px" }}
            >
              {userName} {/* Exibe o nome do usuário */}
            </span>
          </div>
        </div>

        {/* Itens do menu */}
        <ul id="side_items" className="nav flex-column gap-2 flex-grow-1 align-items-start w-100">
          <li className="nav-item side-item w-100">
            <Link
              to="/home"
              className="nav-link text-white d-flex align-items-center justify-content-start hover-effect w-100"
            >
              <FontAwesomeIcon
                icon={faHouse}
                style={{ fontSize: "25px", color: "#ffffff", paddingRight: "12px" }}
              />
              <span className="item-description text-white">Home</span>
            </Link>
          </li>

          <li className="nav-item side-item w-100">
            <Link
              to="/tabela_reserva"
              className="nav-link text-white d-flex align-items-center justify-content-start w-100"
            >
              <FontAwesomeIcon
                icon={faCalendar}
                style={{ fontSize: "25px", color: "#ffffff", paddingRight: "12px" }}
              />
              <span className="item-description text-white">Reservas</span>
            </Link>
          </li>

          <li className="nav-item side-item w-100">
            <Link
              to="/tabela_hospedes"
              className="nav-link text-white d-flex align-items-center justify-content-start w-100"
            >
              <FontAwesomeIcon
                icon={faUserGroup}
                style={{ fontSize: "25px", color: "#ffffff", paddingRight: "12px" }}
              />
              <span className="item-description text-white">Hóspedes</span>
            </Link>
          </li>

          <li className="nav-item side-item w-100">
            <Link
              to="/mapa_reservas"
              className="nav-link text-white d-flex align-items-center justify-content-start w-100"
            >
              <FontAwesomeIcon
                icon={faMap}
                style={{ fontSize: "25px", color: "#ffffff", paddingRight: "12px" }}
              />
              <span className="item-description text-white">Mapa</span>
            </Link>
          </li>

          {/* Renderização condicional da página de Ajustes em overlay, visível apenas para administradores */}
          {userCargo === "administrador" && mostrarAjustes && (
            <div
              className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50"
              style={{ zIndex: 400 }}
            >
              <div className="bg-white p-4 rounded shadow-sm w-75 h-75 overflow-auto position-relative">
                {/* Botão de Fechar posicionado no canto superior direito e cor vermelha */}
                <button
                  type="button"
                  className="btn btn-danger position-absolute top-0 end-0 me-3 mt-3"
                  onClick={() => setMostrarAjustes(false)} // Fecha a página de ajustes
                >
                  Fechar
                </button>

                {/* Aqui pode ser o conteúdo da página de Ajustes */}
                <h3>Ajustes do Sistema</h3>
                <div>
                  <p>Configurações do sistema para o administrador</p>
                  <Button variant="primary">Salvar Ajustes</Button>
                </div>
              </div>
            </div>
          )}

          {/* Link para ajustes, visível apenas para administradores */}
          {userCargo === "administrador" && (
            <li className="nav-item side-item w-100">
              <button
                className="nav-link text-white d-flex align-items-center justify-content-start w-100"
                onClick={() => setMostrarAjustes(true)} // Exibe a página de ajustes
              >
                <FontAwesomeIcon
                  icon={faGear}
                  style={{ fontSize: "25px", color: "#ffffff", paddingRight: "12px" }}
                />
                <span className="item-description text-white">Ajustes</span>
              </button>
            </li>
          )}

          <li className="nav-item side-item mt-auto w-100">
            <Link
              to="/login"
              className="nav-link text-white d-flex align-items-center justify-content-start w-100"
            >
              <FontAwesomeIcon
                icon={faRightFromBracket}
                style={{ fontSize: "25px", color: "#ffffff", paddingRight: "12px" }}
              />
              <span className="item-description text-white">Logout</span>
            </Link>
          </li>
        </ul>

        {/* Botão para abrir/fechar o menu */}
        <button
          id="open_btn"
          className="btn btn-link text-white d-flex justify-content-center align-items-center p-2"
          onClick={toggleMenu}
          style={{
            position: "absolute",
            top: "10px",
            right: "-40px",
            backgroundColor: "#4f46e5",
            borderRadius: "30%",
            width: "50px",
            height: "50px",
            transition: "transform 0.3s",
          }}
        >
          <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: "20px" }} />
        </button>
      </div>
    </div>
  );
}

export default MenuLateral;
