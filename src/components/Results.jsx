const Results = ({ calculation }) => {
  if (!calculation) {
    return null;
  }

  const { earnings, gasCost, wearTear, totalCosts, profit } = calculation;
  const isProfit = profit >= 0;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="results">
      <h2>Profit Breakdown</h2>
      <div className="results-grid">
        <div className="result-item earnings">
          <div className="result-label">Total Earnings</div>
          <div className="result-value positive">{formatCurrency(earnings)}</div>
          <div className="result-breakdown">Fee + Tip</div>
        </div>

        <div className="result-item costs">
          <div className="result-label">Total Costs</div>
          <div className="result-value negative">{formatCurrency(totalCosts)}</div>
          <div className="result-breakdown">
            <div>Gas: {formatCurrency(gasCost)}</div>
            <div>Wear & Tear: {formatCurrency(wearTear)}</div>
          </div>
        </div>

        <div className={`result-item profit ${isProfit ? 'positive' : 'negative'}`}>
          <div className="result-label">Net Profit</div>
          <div className={`result-value ${isProfit ? 'positive' : 'negative'}`}>
            {formatCurrency(profit)}
          </div>
          <div className="result-breakdown">
            {isProfit ? '✓ Profitable' : '✗ Loss'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
