import { useState } from 'react';

const Calculator = ({ onCalculate }) => {
  const [inputs, setInputs] = useState({
    fee: '',
    tip: '',
    miles: ''
  });

  const handleChange = (field, value) => {
    const updated = { ...inputs, [field]: value };
    setInputs(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate({
      fee: parseFloat(inputs.fee) || 0,
      tip: parseFloat(inputs.tip) || 0,
      miles: parseFloat(inputs.miles) || 0
    });
  };

  return (
    <div className="calculator">
      <h2>Delivery Information</h2>
      <form onSubmit={handleSubmit} className="calculator-form">
        <div className="form-group">
          <label htmlFor="fee">Delivery Fee ($):</label>
          <input
            type="number"
            id="fee"
            min="0"
            step="0.01"
            value={inputs.fee}
            onChange={(e) => handleChange('fee', e.target.value)}
            placeholder="0.00"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tip">Tip ($):</label>
          <input
            type="number"
            id="tip"
            min="0"
            step="0.01"
            value={inputs.tip}
            onChange={(e) => handleChange('tip', e.target.value)}
            placeholder="0.00"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="miles">Miles Driven:</label>
          <input
            type="number"
            id="miles"
            min="0"
            step="0.1"
            value={inputs.miles}
            onChange={(e) => handleChange('miles', e.target.value)}
            placeholder="0.0"
            required
          />
        </div>

        <button type="submit" className="calculate-button">
          Calculate Profit
        </button>
      </form>
    </div>
  );
};

export default Calculator;
