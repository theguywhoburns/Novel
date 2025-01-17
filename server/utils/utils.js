import { config as dotenvConfig } from 'dotenv-esm';

dotenvConfig();

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getDistanceFromCoordinatesInKm = (lat1, lon1, lat2, lon2) => {
  const EARTH_R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const centralAngle = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_R * centralAngle;
};

export const generateVerificationCode = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

export const getDotenvVariable = (name) => {
  const value = name;

  if (!value) {
    throw new Error(`Missing ${name} environment variable`);
  }

  return value;
};