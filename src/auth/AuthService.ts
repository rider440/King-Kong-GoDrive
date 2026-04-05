import api from "../api/axiosInstance";

export const loginUser = async (data: any) => {
    const params = new URLSearchParams();
    for (const key in data) {
        params.append(key, data[key]);
    }
    const res = await api.post("/api/Auth/login", params, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
    return res.data;
};

export const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
};