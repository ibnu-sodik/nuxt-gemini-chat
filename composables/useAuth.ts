import { useLogto } from "./useLogto";
import { ref, computed } from "vue";

interface User {
    email?: string;
    id?: string;
}

export function useAuth() {
    const logto = useLogto();
    const user = ref<User | null>(null);

    const fetchUser = async () => {
        const isAuth = await logto.isAuthenticated();
        if (isAuth) {
            const claims = await logto.getIdTokenClaims();
            user.value = {
                email: claims?.email || undefined,
                id: claims?.sub,
            };
        } else {
            user.value = null;
        }
    };

    const logout = async () => {
        await logto.signOut();
        user.value = null;
    };

    return {
        user: computed(() => user.value),
        fetchUser,
        logout,
    };
}
