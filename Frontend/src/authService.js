import api from "./axiosApi";
import { jwtDecode } from "jwt-decode";

export const login = async (email, senha) => {
    let loggedIn = false;
    const loginEndpoint = "auth/entrar";
    await api.post(loginEndpoint, { "email": email, "senha": senha })
        .then((response) => {
            if (response.status === 200) {
                if (response.data.token) {
                    sessionStorage.setItem("ongId", getUserData().id);
                    loggedIn = true;
                }
            } else {
                console.log("Login error: " + response);
            }
        })
        .catch((error) => {
            console.log(error.message);
        });
    return loggedIn;
};

export const logout = () => {
    localStorage.removeItem("token");
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const isLogged = () => {
    const token = getToken();
    if (token) {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
};

export const getUserData = () => {
    const token = getToken();
    if (token) {
        const decoded = jwtDecode(token);
        return decoded;
    } else {
        return null;
    }
};