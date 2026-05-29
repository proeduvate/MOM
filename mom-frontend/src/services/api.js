import { meetings, momData } from "../data/mockData";

export const getMeetings = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(meetings), 500);
  });
};

export const getMoM = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(momData[id]), 500);
  });
};

export const updateMoM = (id, data) => {
  return new Promise((resolve) => {
    momData[id] = data;
    setTimeout(() => resolve({ success: true }), 500);
  });
};