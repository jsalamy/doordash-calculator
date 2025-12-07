import Cookies from 'js-cookie';

const PROFILE_COOKIE_NAME = 'doordash_car_profile';
const COOKIE_EXPIRY_DAYS = 365; // 1 year

export const saveProfile = (profile) => {
  try {
    const profileData = JSON.stringify(profile);
    Cookies.set(PROFILE_COOKIE_NAME, profileData, { expires: COOKIE_EXPIRY_DAYS });
    return true;
  } catch (error) {
    console.error('Error saving profile to cookie:', error);
    return false;
  }
};

export const loadProfile = () => {
  try {
    const profileData = Cookies.get(PROFILE_COOKIE_NAME);
    if (profileData) {
      return JSON.parse(profileData);
    }
    return null;
  } catch (error) {
    console.error('Error loading profile from cookie:', error);
    return null;
  }
};

export const clearProfile = () => {
  try {
    Cookies.remove(PROFILE_COOKIE_NAME);
    return true;
  } catch (error) {
    console.error('Error clearing profile cookie:', error);
    return false;
  }
};
