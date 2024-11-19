import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import RoomCard from '../RoomCard/RoomCard';
import './Home.css'; // Adicione o CSS específico para a página, se necessário

const Home = () => {
  const rooms = [
    { roomType: 'Domo 01', status: 'available' },
    { roomType: 'Cabana 02', status: 'available' },
    { roomType: 'Suite c/ Cozinha', status: 'available' },
    { roomType: 'Chalé Família', status: 'available' },
    { roomType: 'Ônibus Charrua', status: 'available' },
    { roomType: 'Domo 02', status: 'available' },
    { roomType: 'Cabana 01', status: 'available' },
    { roomType: 'Suite Master', status: 'available' },
  ];

  return (
    <Container>
      <div className="header">
        <div className="header-top">
          <h1>Quartos</h1>
          <div className="room-count">Total: {rooms.length} quartos</div>
        </div>
        <div className="status-count">
          <div className="status-item">Disponível: {rooms.length}</div>
          <div className="status-item">Reservado: 0</div>
          <div className="status-item">Ocupado: 0</div>
          <div className="status-item">Limpeza: 0</div>
          <div className="status-item">Bloqueado: 0</div>
        </div>
      </div>

      <div className="rooms-grid">
        {rooms.map((room, index) => (
          <RoomCard key={index} roomType={room.roomType} status={room.status} />
        ))}
      </div>
    </Container>
  );
};

export default Home;
