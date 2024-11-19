import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap'; // Certifique-se de ter o react-bootstrap instalado

function Alertas({ show, variant, message, onClose }) {
  if (!show) return null; // Não renderiza o alerta se "show" for falso

  return (
    <Alert
      variant={variant}
      style={{
        position: 'absolute', // Permite sobreposição
        top: '10px',          // Ajusta a posição vertical
        left: '50%',          // Centraliza horizontalmente
        transform: 'translateX(-50%)', // Corrige o alinhamento central
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        zIndex: 10, // Garante que o alerta esteja acima de outros elementos
      }}
      onClose={onClose}
      dismissible={!!onClose} // Exibe o botão de fechar apenas se "onClose" for fornecido
    >
      {message}
    </Alert>
  );
}

Alertas.propTypes = {
  show: PropTypes.bool.isRequired, // Define se o alerta será exibido
  variant: PropTypes.string,       // Tipo de alerta (ex.: "success", "danger")
  message: PropTypes.string.isRequired, // Mensagem do alerta
  onClose: PropTypes.func,         // Função para fechar o alerta
};

Alertas.defaultProps = {
  variant: 'primary', // Variante padrão
  onClose: null,      // Alerta sem botão de fechamento por padrão
};

export default Alertas;
