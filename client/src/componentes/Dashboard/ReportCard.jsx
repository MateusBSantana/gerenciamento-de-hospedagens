import React from 'react';

const ReportCard = ({ title, value }) => (
  <div className="card">
    <h3>{title}</h3>
    <div className="number">{value}</div>
  </div>
);

export default ReportCard;
