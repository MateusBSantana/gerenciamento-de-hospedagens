import React from "react";

function Filters({ startDate, endDate, setStartDate, setEndDate, updateReports }) {
  const validateDates = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end < start) {
      alert("A data final não pode ser anterior à data inicial");
      setEndDate(startDate);
    }
  };

  return (
    <div className="filters p-3 bg-light rounded mb-4">
      <div className="d-flex gap-3 flex-wrap">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="form-control"
          onBlur={validateDates}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="form-control"
          onBlur={validateDates}
        />
        <button className="btn btn-success" onClick={updateReports}>
          Gerar Relatório
        </button>
      </div>
    </div>
  );
}

export default Filters;
