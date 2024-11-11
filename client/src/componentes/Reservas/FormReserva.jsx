import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TabelaHospede from '../Hospedes/TabelaHospedes/TabelaHospedes';
import ListagemAcomodacoes from '../acomodacao/ListaAcomodacoes';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


function FormReserva({ formData, handleChange, fk_hospede, acomodacaoNome, isEditing }) {
  const [mostrarTabelaHospedes, setMostrarTabelaHospedes] = useState(false);
  const [mostrarTabelaAcomodacoes, setMostrarTabelaAcomodacoes] = useState(false);

  const InfAcomodacao = () => setMostrarTabelaAcomodacoes(true);
  const InfHospede = () => setMostrarTabelaHospedes(true);


  const [nomeHospedeExibido, setNomeHospedeExibido] = useState('');
  const handleSelectHospede = (fk_hospede) => {
    // Define o id do hospede como o valor que será enviado para o banco
    handleChange({ target: { name: 'fk_hospede', value: fk_hospede.id_hospede } });

    // Exibe o nome do hospede para o usuário enquanto guarda o ID
    setNomeHospedeExibido(fk_hospede.nome_hospede);
    setMostrarTabelaHospedes(false);
  };

  const [nomeAcomodacaoExibida, setNomeAcomodacaoExibida] = useState('');


  const handleSelectAcomodacao = (fk_acomodacao) => {
    // Armazena apenas o ID da acomodação no estado de reserva
    handleChange({ target: { name: 'fk_acomodacao', value: fk_acomodacao.id } });

    // Atualiza o nome exibido da acomodação para o usuário
    setNomeAcomodacaoExibida(fk_acomodacao.nome);

    setMostrarTabelaAcomodacoes(false);
  };

  useEffect(() => {

  }, [formData]);

  const isDatasPreenchidas = () => {
    return formData.data_checkin && formData.data_checkout;
  };

  return (
    <div className="border rounded pt-3" style={{ textAlign: "left" }}>
      <h4>Informações da Reserva</h4>

      <div className="mx-auto">
        {/* Campo Situação */}
        <div className="mb-3 d-flex align-items-center">
          <label className="me-2 text-end" style={{ width: "160px" }}>Situação:</label>
          <div className="d-flex">
            <div className="me-2">
              <input
                type="radio"
                id="reservar"
                name="status_reserva"
                value="reservado"
                checked={formData.status_reserva === 'reservado'}
                onChange={handleChange}
              />
              <label htmlFor="reservar" className="ms-1">
                {isEditing ? "Reservado" : "Reservar"}
              </label>
            </div>
            <div className="me-2">
              <input
                type="radio"
                id="hospedar"
                name="status_reserva"
                value="hospedado"
                checked={formData.status_reserva === 'hospedado'}
                onChange={handleChange}
              />
              <label htmlFor="hospedar" className="ms-1">
                {isEditing ? "Hospedado" : "Hospedar"}
              </label>
            </div>

          </div>
        </div>


        {/* Campo Hóspede */}
        <div className="mb-3 d-flex align-items-center">
          <label className="me-2 text-end" style={{ width: "160px" }}>Hóspede:</label>
          <div className="d-flex align-items-center" style={{ width: "400px" }}>
            <input
              type="text"
              name="fk_hospede"
              className="form-control"
              value={nomeHospedeExibido} // Exibe o nome do hóspede selecionado
              onChange={(e) => handleSelectHospede(e.target.value)} // Atualiza com a seleção
              placeholder="Selecione um hóspede ->"
              readOnly // Torna o campo somente leitura
              style={{ pointerEvents: 'none' }} // Desabilita interações com o campo
            />
            <button
              type="button"
              className="btn btn-primary ms-2"
              onClick={InfHospede} // Função para abrir a tabela
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>


        {/* Renderização condicional da tabela em overlay */}
        {mostrarTabelaHospedes && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50"
            style={{ zIndex: 400 }}
          >
            <div className="bg-white p-4 rounded shadow-sm w-75 h-75 overflow-auto position-relative">
              {/* Botão de Fechar posicionado no canto superior direito e cor vermelha */}
              <button
                type="button"
                className="btn btn-danger position-absolute top-0 end-0 me-3 mt-3"
                onClick={() => setMostrarTabelaHospedes(false)} // Fecha a tabela
              >
                Fechar
              </button>

              <TabelaHospede
                exibirAcoes={true}
                textoBotao="Hospedar"
                onSelectHospede={handleSelectHospede} // Passa a função para selecionar o hóspede
              />
            </div>
          </div>
        )}

        {/* Campo Data de Entrada */}
        <div className="mb-3 d-flex align-items-center">
          <label className="me-2 text-end" style={{ width: "160px" }}>Data de Entrada:</label>
          <input
            type="date"
            className="form-control"
            name="data_checkin"
            value={formData.data_checkin ? formData.data_checkin.split('T')[0] : ''}
            onChange={handleChange}
            required
            
            style={{ width: "200px" }}
          />
        </div>

        {/* Campo Data de Saída */}
        <div className="mb-3 d-flex align-items-center">
          <label className="me-2 text-end" style={{ width: "160px" }}>Data de Saída:</label>
          <input
            type="date"
            className="form-control"
            name="data_checkout"
            value={formData.data_checkout ? formData.data_checkout.split('T')[0] : ''}
            onChange={handleChange}
            required
            
            style={{ width: "200px" }}
          />
        </div>



        {/* Campo Acomodação */}
        <div className="mb-3 d-flex align-items-center">
          <label className="me-2 text-end" style={{ width: "160px" }}>Acomodação:</label>
          <div className="d-flex align-items-center" style={{ width: "400px" }}>
            <input
              type="text"
              name="fk_acomodacao"
              className="form-control"
              value={nomeAcomodacaoExibida}
              onChange={(e) => handleSelectAcomodacao(e.target.value)}
              placeholder="Selecione uma acomodação ->"
              readOnly // Torna o campo somente leitura
              style={{ pointerEvents: 'none' }} // Desabilita interações com o campo
            />
            <button
              type="button"
              className="btn btn-primary ms-2"
              onClick={() => {
                // Verificar se as datas estão preenchidas antes de executar a ação
                if (!isDatasPreenchidas()) {
                  alert("As datas devem ser preenchidas antes de selecionar uma acomodação.");
                } else {
                  InfAcomodacao(); // Chama a função para selecionar a acomodação
                }
              }}
            //disabled={!isDatasPreenchidas()} // Desabilita o botão enquanto as datas não forem informadas
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>



        {mostrarTabelaAcomodacoes && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50"
            style={{ zIndex: 400 }}
          >
            <div className="bg-white p-4 rounded shadow-sm w-75 h-75 overflow-auto position-relative">
              <ListagemAcomodacoes
                textoBotao="Selecionar"
                onSelectAcomodacao={handleSelectAcomodacao}
              />

              {/* Botão de Fechar posicionado no canto superior direito e cor vermelha */}
              <button
                type="button"
                className="btn btn-danger position-absolute top-0 end-0 me-3 mt-3"
                onClick={() => setMostrarTabelaAcomodacoes(false)} // Fecha a tabela
              >
                Fechar
              </button>
            </div>
          </div>
        )}

        {/* Campo Número de Adultos */}
        <div className="mb-3 d-flex align-items-center">
          <label className="me-2 text-end" style={{ width: "160px" }}>Nº de Adultos:</label>
          <input
            type="number"
            className="form-control"
            name="numero_adulto"
            value={formData.numero_adulto}
            onChange={handleChange}
            required
            style={{ width: "200px" }}
          />
        </div>

        {/* Campo Número de Crianças */}
        <div className="mb-3 d-flex align-items-center">
          <label className="me-2 text-end" style={{ width: "160px" }}>Nº de Crianças:</label>
          <input
            type="number"
            className="form-control"
            name="numero_crianca"
            value={formData.numero_crianca}
            onChange={handleChange}
            required
            style={{ width: "200px" }}
          />
        </div>

        {/* Campo Valor da Diária */}
        <div className="mb-3 d-flex align-items-center">
          <label className="me-2 text-end" style={{ width: "160px" }}>Valor da Diária:</label>
          <input
            type="text"
            className="form-control"
            name="valor_diaria"
            value={formData.valor_diaria}
            onChange={handleChange}
            required
            style={{ width: "200px" }}
          />
        </div>

        {/* Campo Pago */}
        <div className="mb-3 d-flex align-items-center">
          <label className="me-2 text-end" style={{ width: "160px" }}>Pago:</label>
          <div className="d-flex">
            <div className="me-2">
              <input type="radio" id="pago_sim" name="pago" value="sim" checked={formData.pago === 'sim'} onChange={handleChange} />
              <label htmlFor="pago_sim" className="ms-1">Sim</label>
            </div>
            <div className="me-2">
              <input type="radio" id="pago_nao" name="pago" value="não" checked={formData.pago === 'não'} onChange={handleChange} />
              <label htmlFor="pago_nao" className="ms-1">Não</label>
            </div>
          </div>
        </div>



        {/* Campo Observações */}
        <div className="mb-3 d-flex align-items-center">
          <label className="me-2 text-end" style={{ width: "160px" }}>Observações:</label>
          <textarea
            className="form-control"
            name="observacoes"
            value={formData.observacoes}
            onChange={handleChange}
            style={{ width: "400px" }}
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default FormReserva;
