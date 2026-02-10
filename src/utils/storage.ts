// export const getStoredId = (): string => {
//   const id = sessionStorage.getItem("id");
//   return id?.trim() || "";
// };
// export const getToken = (): string => {
//   const token = sessionStorage.getItem("token");
//   return token?.trim() || "";
// };

export const getAuth = () => {
  // if (!localStorage.getItem("browser_alive")) {
  //   return { token: null, userId: null, login: null };
  // }

  return {
    token: localStorage.getItem("token"),
    userId: localStorage.getItem("id"),
    login: localStorage.getItem("login"),
    email: localStorage.getItem("email"),
  };
};
