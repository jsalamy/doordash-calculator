import { useState, useEffect } from 'react';
import Calculator from './components/Calculator';
import CarProfile from './components/CarProfile';
import Results from './components/Results';
import { calculateProfit } from './utils/calculations';
import { saveProfile, loadProfile, clearProfile } from './utils/cookieStorage';
import './App.css';

function App() {
  const [profile, setProfile] = useState(null);
  const [calculation, setCalculation] = useState(null);

  useEffect(() => {
    // Load saved profile from cookies on mount
    const savedProfile = loadProfile();
    if (savedProfile) {
      setProfile(savedProfile);
    }
  }, []);

  const handleProfileChange = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  const handleSaveProfile = (profileToSave) => {
    const success = saveProfile(profileToSave);
    if (success) {
      setProfile(profileToSave);
      alert('Profile saved successfully!');
    } else {
      alert('Error saving profile. Please try again.');
    }
  };

  const handleClearProfile = () => {
    if (window.confirm('Are you sure you want to clear your saved profile?')) {
      clearProfile();
      setProfile(null);
      alert('Profile cleared.');
    }
  };

  const handleCalculate = (inputs) => {
    if (!profile) {
      alert('Please set up your car profile first!');
      return;
    }

    const result = calculateProfit(
      inputs.fee,
      inputs.tip,
      inputs.miles,
      profile
    );

    setCalculation(result);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>DoorDash Profit Calculator</h1>
        <p>Calculate your actual profit after gas and wear & tear costs</p>
      </header>

      <main className="app-main">
        <div className="content-wrapper">
          <div className="left-panel">
            <CarProfile
              profile={profile}
              onProfileChange={handleProfileChange}
              onSave={handleSaveProfile}
            />
            {profile && (
              <button className="clear-button" onClick={handleClearProfile}>
                Clear Saved Profile
              </button>
            )}
          </div>

          <div className="right-panel">
            <Calculator onCalculate={handleCalculate} />
            {calculation && <Results calculation={calculation} />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
