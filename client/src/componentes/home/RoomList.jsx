// Componentes importados
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import RoomCard from './RoomCard'; // Assumindo que esse componente existe em algum lugar
import './Home.css';

const RoomList = () => {
  const roomList = [
    { id: 1, type: 'Domo 01', status: 'available' },
    { id: 2, type: 'Cabana 02', status: 'available' },
    { id: 3, type: 'Suite c/ Cozinha', status: 'available' },
    { id: 4, type: 'Chalé Família', status: 'available' },
    { id: 5, type: 'Ônibus Charrua', status: 'available' },
    { id: 6, type: 'Domo 02', status: 'available' },
    { id: 7, type: 'Cabana 01', status: 'available' },
    { id: 8, type: 'Suite Master', status: 'available' }
  ];

  return (
    <Container>
      <div className="header">
        <div className="header-top">
          <h1>Quartos</h1>
          <div className="room-count">Total: {roomList.length} quartos</div>
        </div>
        <div className="status-count">
          <div className="status-item">Disponível: {roomList.filter(r => r.status === 'available').length}</div>
          <div className="status-item">Reservado: {roomList.filter(r => r.status === 'reserved').length}</div>
          <div className="status-item">Ocupado: {roomList.filter(r => r.status === 'occupied').length}</div>
          <div className="status-item">Limpeza: {roomList.filter(r => r.status === 'cleaning').length}</div>
          <div className="status-item">Bloqueado: {roomList.filter(r => r.status === 'blocked').length}</div>
        </div>
      </div>

      <Row className="rooms-grid">
        {roomList.map(room => (
          <Col key={room.id}>
            <RoomCard room={room} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RoomList;
