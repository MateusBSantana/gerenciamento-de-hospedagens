import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TabelaHospede from '../Hospedes/TabelaHospedes/TabelaHospedes';
import ListagemAcomodacoes from '../acomodacao/ListaAcomodacoes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Alertas from '../layout/Alertas';


function FormReserva({ formData, setFormData, handleChange, dataInicio, dataFim, isEditing, nomeHospede, nomeAcomodacao }) {
  const [mostrarTabelaHospedes, setMostrarTabelaHospedes] = useState(false);
  const [mostrarTabelaAcomodacoes, setMostrarTabelaAcomodacoes] = useState(false);
  const InfAcomodacao = () => setMostrarTabelaAcomodacoes(true);
  const InfHospede = () => setMostrarTabelaHospedes(true);
  const [nomeHospedeExibido, setNomeHospedeExibido] = useState(nomeHospede || "");
  const [nomeAcomodacaoExibida, setNomeAcomodacaoExibida] = useState(nomeAcomodacao || "");
  const [capacidade, setCapacidade] = useState("");

  const refs = useRef({
    data_checkin: null,
    data_checkout: null,
  });

  // Estado para configurar as mensagens de alerta
  const [alertProps, setAlertProps] = useState({
    show: false,
    message: "",
    variant: "danger",
  });

  // Função para exibir alertas com mensagem e estilo
  const showAlert = (message, variant) => {
    setAlertProps({ show: true, message, variant });
    // Oculta o alerta automaticamente após 5 segundos
    setTimeout(() => setAlertProps((prev) => ({ ...prev, show: false })), 5000);
  };

  // Atualiza o estado `nomeHospedeExibido` quando `nomeHospede` mudar
  useEffect(() => {
    if (nomeHospede) {
      setNomeHospedeExibido(nomeHospede);
    }
  }, [nomeHospede]);

  // Atualiza o estado `nomeAcomodacaoExibida` quando `nomeHospede` mudar
  useEffect(() => {
    if (nomeAcomodacao) {
      setNomeAcomodacaoExibida(nomeAcomodacao);
    }
  }, [nomeAcomodacao]);

  const handleSelectHospede = (fk_hospede) => {
    // Define o id do hospede como o valor que será enviado para o banco
    handleChange({ target: { name: 'fk_hospede', value: fk_hospede.id_hospede } });
    // Exibe o nome do hospede para o usuário enquanto guarda o ID
    setNomeHospedeExibido(fk_hospede.nome_hospede);
    setMostrarTabelaHospedes(false);
    setFormData((prev) => ({
      ...prev,
      nome_hospede: fk_hospede.nome_hospede}))
  };


  const handleSelectAcomodacao = (fk_acomodacao) => {
    console.log("Dados da acomodação selecionada:", fk_acomodacao);
    // Salva a capacidade no estado
    setCapacidade(fk_acomodacao.capacidade);

    // Outras ações
    handleChange({ target: { name: "fk_acomodacao", value: fk_acomodacao.id } });
    setNomeAcomodacaoExibida(fk_acomodacao.nome);
    setMostrarTabelaAcomodacoes(false);
    setFormData((prev) => ({
      ...prev,
      nome: fk_acomodacao.nome}))
  };


  // Executa quando capacidade é atualizada
  useEffect(() => {
    if (capacidade !== "") {
      console.log("Capacidade atualizada:", capacidade);
    }
  }, [capacidade]); // Escuta mudanças na variável `capacidade`

  const totalPessoas = parseInt(formData.numero_adulto || 0) + parseInt(formData.numero_crianca || 0);
  useEffect(() => {
    if (capacidade && totalPessoas > capacidade) {
      showAlert(
        "A quantidade de hóspedes informada excede a capacidade máxima da acomodação selecionada.",
        "danger"
      );
      setFormData({
        ...formData,
        numero_adulto: '',
        numero_crianca: '0',
      });
    }

  }, [capacidade, totalPessoas, formData]);

  const isDatasPreenchidas = () => {
    return formData.data_checkin && formData.data_checkout;
  };

  useEffect(() => {
    console.log('Data Inícioooooo:', dataInicio);
    console.log('Data Fimmmmm:', dataFim);
  }, [dataInicio, dataFim]);

  useEffect(() => {
  }, [formData]);


  const handleDateChange = async (e) => {
    const { name, value } = e.target;
  
    // Atualiza o estado com os dados da data
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  
    // Captura os valores diretamente do DOM via refs
    const dataEntradaExata = refs.current.data_checkin?.value;
    const dataSaidaExata = refs.current.data_checkout?.value;
  
    console.log("Datas exibidas nos campos:", {
      dataEntradaExata,
      dataSaidaExata,
    });
  
    if (dataEntradaExata && dataSaidaExata && isEditing) {
      try {
        const response = await fetch(
          `http://localhost:5000/acomodacoes/disponibilidade/${dataEntradaExata}/${dataSaidaExata}/${formData.fk_acomodacao}/${formData.id_reserva}`
        );
  
        if (response.ok) {
          const { disponivel } = await response.json(); // Recebe { disponivel: true/false }
          console.log("Disponibilidade recebida:", disponivel);
  
          if (disponivel) {
            console.log("Acomodação disponível.");
            console.log("bom");
          } else {
            console.log("Acomodação indisponível.");
            console.log("ruim");
            showAlert(
              "Selecione outra acomodação: a acomodação atual da reserva não está disponível para o período informado.",
              "danger"
            );
            setFormData((prev) => ({
              ...prev,
              [name]: value,
              fk_acomodacao: "", // Limpa o ID da acomodação
              numero_adulto: "", // Limpa o número de adultos
              numero_crianca: "0", // Limpa o número de crianças
            }));
        
            // Limpa o nome da acomodação exibida
            setNomeAcomodacaoExibida("");
          }
        } else {
          console.error("Erro na API:", response.status);
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    } else if (!isEditing) {
      // Aqui, quando não estamos editando (ou seja, estamos criando uma nova reserva), limpar os campos
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        fk_acomodacao: "", // Limpa o ID da acomodação
        numero_adulto: "", // Limpa o número de adultos
        numero_crianca: "0", // Limpa o número de crianças
      }));
  
      // Limpa o nome da acomodação exibida
      setNomeAcomodacaoExibida("");
    }
  };
  const handleBlur = () => {
    const observacoesValue = formData.observacoes || '';
    if (!observacoesValue.trim()) {
      setFormData(prevData => ({
        ...prevData,
        observacoes: ' ',
      }));
    }
  };
  
  return (
    <div className="border rounded pt-3" style={{ textAlign: "left" }}>
      <h4 style={{ marginLeft: '40px', position: 'relative', zIndex: 1 }}>Informações da Reserva</h4>
      {/* Alerta exibido para o usuário caso haja algum erro ou sucesso */}
      <Alertas
        show={alertProps.show}
        variant={alertProps.variant}
        message={alertProps.message}
        onClose={() => setAlertProps((prev) => ({ ...prev, show: false }))}
      />
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
              required
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
                textoBotao="Selecionar"
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
            onChange={handleDateChange}
            style={{ width: "200px" }}
            min={new Date().toISOString().split('T')[0]} // Data mínima garantida como hoje
            ref={(el) => (refs.current.data_checkin = el)} // Vincula ao ref
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
            onChange={handleDateChange}
            style={{ width: "200px" }}
            ref={(el) => (refs.current.data_checkout = el)} // Vincula ao ref
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
              value={nomeAcomodacaoExibida || "Selecione uma acomodação ->"}
              readOnly // Torna o campo somente leitura
              style={{ pointerEvents: 'none' }} // Desabilita interações com o campo
            />
            <button
              type="button"
              className="btn btn-primary ms-2"
              onClick={() => {
                // Verificar se as datas estão preenchidas antes de executar a ação
                if (!isDatasPreenchidas()) {
                  showAlert(
                    "As datas devem ser preenchidas antes de selecionar uma acomodação.",
                    "danger"
                  );
                } else {
                  InfAcomodacao(); // Chama a função para selecionar a acomodação
                }
              }}
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
                dataInicio={dataInicio}
                dataFim={dataFim}
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
            type="text"
            className="form-control"
            name="numero_adulto"
            value={formData.numero_adulto || ''}
            onChange={(e) => {
              // Verifica se o valor inserido é um número inteiro
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                handleChange(e); // Apenas permite a mudança se for um número inteiro válido
              }
            }}
            onFocus={() => {
              if (!nomeAcomodacaoExibida) {
                showAlert(
                  "Por favor, selecione uma acomodação antes de preencher este campo.",
                  "danger"
                );
                document.activeElement.blur(); // Remove o foco do campo
              }
            }}
            min="1"
            max="100"
            style={{ width: "200px" }}
          />

        </div>

        {/* Campo Número de Crianças */}
        <div className="mb-3 d-flex align-items-center">
          <label className="me-2 text-end" style={{ width: "160px" }}>Nº de Crianças:</label>
          <input
            type="text"
            className="form-control"
            name="numero_crianca"
            value={formData.numero_crianca}
            onChange={(e) => {
              // Verifica se o valor inserido é um número inteiro
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                handleChange(e); // Apenas permite a mudança se for um número inteiro válido
              }
            }}
            onFocus={() => {
              if (!nomeAcomodacaoExibida) {
                showAlert(
                  "Por favor, selecione uma acomodação antes de preencher este campo.",
                  "danger"
                );
                document.activeElement.blur(); // Remove o foco do campo
              }
            }}
            min="0"
            max="100"
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
            value={formData.valor_diaria || ''} // Sempre uma string
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*(\.|,)?\d*$/.test(value)) {
                setFormData({
                  ...formData,
                  valor_diaria: value.replace(",", "."), // Substitui vírgula por ponto
                });
              }
            }}
            style={{ width: "200px" }}
            maxLength="12"
            inputMode="decimal"
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
            value={formData.observacoes || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ width: "400px" }}
            maxLength="200"
          ></textarea>
        </div>

      </div>
    </div>
  );
}

export default FormReserva;
