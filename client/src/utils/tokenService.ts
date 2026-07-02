


export const tokenService = {
  getToken: () => localStorage.getItem("token"),
  setToken: (token: string) => (localStorage.setItem("token", token)),
};
