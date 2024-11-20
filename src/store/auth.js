
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const USER_AUTH_STORAGE = 'userAuthStorage';

export const useAuthStore = create(
    persist(
        (set) => ({
            user: {
                name: '',
                email: '',
                password: '',
                canvasToken: '',
                createdAt: '',
            },
            setUserInfo: (data) => set({ user: data }),
        }),
        {
            name: USER_AUTH_STORAGE,
        },
    ),
);

