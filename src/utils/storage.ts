// export const getStoredId = (): string => {
//   const id = sessionStorage.getItem("id");
//   return id?.trim() || "";
// };
// export const getToken = (): string => {
//   const token = sessionStorage.getItem("token");
//   return token?.trim() || "";
// };

export const getAuth = () =>({
  userId: sessionStorage.getItem("id")?.trim() || "",
  email: sessionStorage.getItem("email")?.trim() || "",
  login: sessionStorage.getItem("login")?.trim() || "",
  token: sessionStorage.getItem("token") || ""
})