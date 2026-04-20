// export const getStoredId = (): string => {
//   const id = sessionStorage.getItem("id");
//   return id?.trim() || "";
// };
// export const getToken = (): string => {
//   const token = sessionStorage.getItem("token");
//   return token?.trim() || "";
// };
// 1-4-26
// export const getAuth = () => {

//   return {
//     token: localStorage.getItem("token"),
//     userId: localStorage.getItem("id"),
//     login: localStorage.getItem("login"),
//     email: localStorage.getItem("email"),
//   };
// };
// src/utils/storage.ts

// Set auth data
export const setAuth = (
  token: string,
  userId: string,
  login?: string,
  email?: string
) => {
  localStorage.setItem("token", token);
  localStorage.setItem("id", userId);

  if (login) localStorage.setItem("login", login);
  if (email) localStorage.setItem("email", email);
};

// Get auth data
export const getAuth = () => {
  const token = localStorage.getItem("token")?.trim() || null;
  const userId = localStorage.getItem("id")?.trim() || null;
  const login = localStorage.getItem("login")?.trim() || null;
  const email = localStorage.getItem("email")?.trim() || null;

  return { token, userId, login, email };
};

// Clear auth (logout)
export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("id");
  localStorage.removeItem("login");
  localStorage.removeItem("email");
  localStorage.removeItem("user_profile");
};

export const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("id");
  localStorage.removeItem("login");
  localStorage.removeItem("email");
  localStorage.removeItem("expiry");
  localStorage.removeItem("user_profile");

  sessionStorage.clear();

  window.location.href = "/login";
};