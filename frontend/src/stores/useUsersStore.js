import {create} from "zustand"
import axios from "../lib/axios"
import {toast} from "react-hot-toast"

export const useUsersStore = create((set, get) => ({
    user: null,
    loading: false,
    checkingAuth: true,

    signup: async ({ name, email, password, confirmPassword }) => {
        set({ loading: true });

        if (password !== confirmPassword) {
            set({ loading: false });
            return toast.error("Пароли не совпадают");
        }

        try {
            const res = await axios.post("/auth/signup", { name, email, password });
            set({ user: res.data, loading: false });
        } catch (error) {
            set({ loading: false });
            const errorMessage = error.response?.data?.message || "Возникла ошибка, пожалуйста, повторите попытку позже";
            toast.error(errorMessage);
        }
    }
}));