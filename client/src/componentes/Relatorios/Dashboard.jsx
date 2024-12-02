import React, { useState, useEffect } from "react";
import axios from "axios"; // Importação do axios
import Filters from "./Filters";
import ReportCard from "./ReportCard";
import "./RelaT.css";

const TOTAL_ROOMS = 50;

function Dashboard() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportData, setReportData] = useState({
    totalReservations: 0,
    mostBooked: "",
    cancelledReservations: 0,
    totalRevenue: 0,
    occupancyRate: 0,
    availableRooms: TOTAL_ROOMS,
    financialDetails: [],
  });

  useEffect(() => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    setStartDate(firstDay.toISOString().split("T")[0]);
    setEndDate(lastDay.toISOString().split("T")[0]);
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const calculateOccupancyRate = (occupiedRooms) => {
    return ((occupiedRooms / TOTAL_ROOMS) * 100).toFixed(1);
  };

  const updateReports = async () => {
    try {
      // Requisição para o backend (ajuste o endpoint conforme necessário)
      const response = await axios.get(`http://localhost:5000/dashboard`, {
        params: { startDate, endDate }
      });

      const data = response.data;

      const totalRevenue = data.financialDetails.reduce((sum, item) => sum + item.value, 0);

      setReportData({
        ...data,
        totalRevenue,
        occupancyRate: calculateOccupancyRate(data.occupiedRooms),
        availableRooms: TOTAL_ROOMS - data.occupiedRooms,
      });
    } catch (error) {
      console.error("Erro ao buscar os dados do relatório", error);
    }
  };

  return (
    <div className="container mt-4">
      <Filters
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        updateReports={updateReports}
      />

      <div className="row">
        <ReportCard
          title="Relatório de Reservas"
          stats={[
            { label: "Total de Reservas", value: reportData.totalReservations },
            { label: "Acomodação Mais Reservada", value: reportData.mostBooked },
            { label: "Reservas Canceladas", value: reportData.cancelledReservations },
          ]}
        />
        <ReportCard
          title="Relatório Financeiro"
          stats={[
            { label: "Receita Total do Período", value: formatCurrency(reportData.totalRevenue) },
          ]}
          financialDetails={reportData.financialDetails}
        />
        <ReportCard
          title="Relatório de Ocupação"
          stats={[
            { label: "Taxa de Ocupação", value: `${reportData.occupancyRate}%` },
            { label: "Quartos Disponíveis", value: reportData.availableRooms },
          ]}
        />
      </div>
    </div>
  );
}

export default Dashboard;
