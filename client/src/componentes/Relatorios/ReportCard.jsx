import React from "react";

function ReportCard({ title, stats, financialDetails }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          {stats.map((stat, index) => (
            <div key={index} className="mb-2">
              <small className="text-muted">{stat.label}</small>
              <h6 className="mb-0">{stat.value}</h6>
            </div>
          ))}
          {financialDetails && (
            <table className="table mt-3">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {financialDetails.map((item, index) => (
                  <tr key={index}>
                    <td>{new Date(item.date).toLocaleDateString("pt-BR")}</td>
                    <td>{item.value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReportCard;
