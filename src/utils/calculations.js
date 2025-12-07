/**
 * Calculate gas cost based on miles driven
 * @param {number} miles - Miles driven
 * @param {string} method - 'mpg' or 'per-mile'
 * @param {number} mpg - Miles per gallon (required if method is 'mpg')
 * @param {number} gasPrice - Price per gallon (required if method is 'mpg')
 * @param {number} perMileRate - Cost per mile (required if method is 'per-mile')
 * @returns {number} Gas cost
 */
export const calculateGasCost = (miles, method, mpg, gasPrice, perMileRate) => {
  if (!miles || miles <= 0) return 0;
  
  if (method === 'mpg') {
    if (!mpg || mpg <= 0 || !gasPrice || gasPrice < 0) return 0;
    return (miles / mpg) * gasPrice;
  } else if (method === 'per-mile') {
    if (!perMileRate || perMileRate < 0) return 0;
    return miles * perMileRate;
  }
  
  return 0;
};

/**
 * Calculate wear and tear cost
 * @param {number} miles - Miles driven
 * @param {number} wearTearRate - Cost per mile for wear and tear
 * @returns {number} Wear and tear cost
 */
export const calculateWearAndTear = (miles, wearTearRate) => {
  if (!miles || miles <= 0 || !wearTearRate || wearTearRate < 0) return 0;
  return miles * wearTearRate;
};

/**
 * Calculate total profit from a delivery
 * @param {number} fee - Delivery fee
 * @param {number} tip - Tip amount
 * @param {number} miles - Miles driven
 * @param {object} profile - Car profile with calculation settings
 * @returns {object} Calculation breakdown
 */
export const calculateProfit = (fee, tip, miles, profile) => {
  const earnings = (fee || 0) + (tip || 0);
  
  const gasCost = calculateGasCost(
    miles,
    profile.gasMethod || 'mpg',
    profile.mpg,
    profile.gasPrice,
    profile.perMileRate
  );
  
  const wearTear = calculateWearAndTear(miles, profile.wearTearRate || 0);
  
  const totalCosts = gasCost + wearTear;
  const profit = earnings - totalCosts;
  
  return {
    earnings,
    gasCost,
    wearTear,
    totalCosts,
    profit
  };
};
