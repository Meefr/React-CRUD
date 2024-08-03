const key = "products";
export const initialProducts = JSON.parse(localStorage.getItem(key));
export const updateLocalStorage = (newProducts) => {
  localStorage.setItem(key, JSON.stringify(newProducts));
};
export const getData = () => {
  return JSON.parse(localStorage.getItem(key));
};
export const initialzeProducts = (func) =>
  func(() => [...JSON.parse(localStorage.getItem(key))] || []);
