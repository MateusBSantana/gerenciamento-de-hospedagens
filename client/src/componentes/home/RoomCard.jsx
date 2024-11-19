import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './Home.css';

const RoomCard = ({ room }) => {
  const { id, type, status } = room;

  const getStatusClass = () => {
    switch (status) {
      case 'available': return 'available';
      case 'reserved': return 'reserved';
      case 'occupied': return 'occupied';
      case 'cleaning': return 'cleaning';
      case 'blocked': return 'blocked';
      default: return '';
    }
  };

  const handleHospedarClick = () => {
    alert(`Iniciando processo de hospedagem para ${type}`);
  };

  return (
    <Card className={`room-card ${getStatusClass()}`}>
      <Card.Body>
        <div className="room-header">
          <span className="room-type">{type}</span>
        </div>
        <div className="room-details">
          {/* Detalhes adicionais do quarto podem ser adicionados aqui */}
        </div>
        <Button className="btn-hospedar" onClick={handleHospedarClick}>Hospedar</Button>
      </Card.Body>
    </Card>
  );
};

export default RoomCard;
