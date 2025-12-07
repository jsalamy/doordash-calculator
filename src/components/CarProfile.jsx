import { useState, useEffect } from 'react';
import { CAR_TYPES } from '../constants/carTypes';

const CarProfile = ({ profile, onProfileChange, onSave }) => {
  const [localProfile, setLocalProfile] = useState({
    carType: profile?.carType || CAR_TYPES[0],
    mpg: profile?.mpg || '',
    wearTearRate: profile?.wearTearRate || 0.10, // Hard set to 0.10 cents per mile
    gasPrice: profile?.gasPrice || '',
    gasMethod: profile?.gasMethod || 'mpg',
    perMileRate: profile?.perMileRate || ''
  });

  useEffect(() => {
    if (profile) {
      setLocalProfile({
        carType: profile.carType || CAR_TYPES[0],
        mpg: profile.mpg || '',
        wearTearRate: profile.wearTearRate || 0.10, // Hard set to 0.10 cents per mile
        gasPrice: profile.gasPrice || '',
        gasMethod: profile.gasMethod || 'mpg',
        perMileRate: profile.perMileRate || ''
      });
    }
  }, [profile]);

  const handleChange = (field, value) => {
    const updated = { ...localProfile, [field]: value };
    // Always ensure wearTearRate is 0.10
    updated.wearTearRate = 0.10;
    setLocalProfile(updated);
    onProfileChange(updated);
  };

  const handleSave = () => {
    // Always ensure wearTearRate is set to 0.10
    const profileToSave = { ...localProfile, wearTearRate: 0.10 };
    onSave(profileToSave);
  };

  return (
    <div className="car-profile">
      <h2>Car Profile Settings</h2>
      <div className="profile-form">
        <div className="form-group">
          <label htmlFor="carType">Car Type:</label>
          <select
            id="carType"
            value={localProfile.carType}
            onChange={(e) => handleChange('carType', e.target.value)}
          >
            {CAR_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="mpg">MPG (Miles Per Gallon):</label>
          <input
            type="number"
            id="mpg"
            min="0"
            step="0.1"
            value={localProfile.mpg}
            onChange={(e) => handleChange('mpg', parseFloat(e.target.value) || '')}
            placeholder="e.g., 25"
          />
        </div>

        <div className="form-group">
          <label htmlFor="wearTearRate">Wear & Tear Rate (per mile):</label>
          <input
            type="number"
            id="wearTearRate"
            min="0"
            step="0.01"
            value={0.10}
            readOnly
            disabled
            style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
          />
          <small>Fixed at $0.10 per mile</small>
        </div>

        <div className="form-group">
          <label>Gas Calculation Method:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gasMethod"
                value="mpg"
                checked={localProfile.gasMethod === 'mpg'}
                onChange={(e) => handleChange('gasMethod', e.target.value)}
              />
              Based on MPG & Gas Price
            </label>
            <label>
              <input
                type="radio"
                name="gasMethod"
                value="per-mile"
                checked={localProfile.gasMethod === 'per-mile'}
                onChange={(e) => handleChange('gasMethod', e.target.value)}
              />
              Fixed Cost Per Mile
            </label>
          </div>
        </div>

        {localProfile.gasMethod === 'mpg' ? (
          <div className="form-group">
            <label htmlFor="gasPrice">Gas Price (per gallon):</label>
            <input
              type="number"
              id="gasPrice"
              min="0"
              step="0.01"
              value={localProfile.gasPrice}
              onChange={(e) => handleChange('gasPrice', parseFloat(e.target.value) || '')}
              placeholder="e.g., 3.50"
            />
          </div>
        ) : (
          <div className="form-group">
            <label htmlFor="perMileRate">Gas Cost Per Mile:</label>
            <input
              type="number"
              id="perMileRate"
              min="0"
              step="0.01"
              value={localProfile.perMileRate}
              onChange={(e) => handleChange('perMileRate', parseFloat(e.target.value) || '')}
              placeholder="e.g., 0.15"
            />
          </div>
        )}

        <button className="save-button" onClick={handleSave}>
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default CarProfile;
