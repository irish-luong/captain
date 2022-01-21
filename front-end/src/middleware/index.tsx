
import { Refine, AuthProvider } from "@pankod/refine";



const mockUsers = [
  {
    "username": "admin",
    roles: ["admin"]
  }
] 

const authProvider: AuthProvider = {

  login: ({ username, password, remember }) => {

    const user = mockUsers.find((item) => item.username == username);

    if (user)
    {
      localStorage.setItem("auth", JSON.stringify(user));
      return Promise.resolve();
    }
    return Promise.reject();
  },

  logout: () => {
    localStorage.removeItem("auth");
    return Promise.resolve();
  },

  checkError: (error) => {
    if (error && error.statusCode === 401) {
      return Promise.reject();
  }
  return Promise.resolve();
  },

  checkAuth: () => localStorage.getItem("auth") ? Promise.resolve() : Promise.reject(),

  getPermissions: () => {
    const auth = localStorage.getItem("auth");
    if (auth) 
    {
      const parsedUser = JSON.parse(auth);
      return Promise.resolve(parsedUser.roles);
    }
    return Promise.reject()
  },

  getUserIdentity: () => {
    const auth = localStorage.getItem("auth");
    if (auth) 
    {
      const parsedUser = JSON.parse(auth);
      return Promise.resolve(parsedUser.roles);
    }
    return Promise.reject()
  }

}


export default authProvider;