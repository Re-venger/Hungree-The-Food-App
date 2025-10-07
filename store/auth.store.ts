import { getCurrentUser } from "@/lib/appwrite";
import { User } from "@/type";
import { create } from "zustand";

type AuthState = {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
    isFetchingUser?: boolean;

    setIsAuthenticated: (value: boolean) => void;
    setUser: (user: User | null) => void;
    setLoading: (value: boolean) => void;

    fetchAuthenticatedUser: () => Promise<void>;
};

const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    isLoading: true,
    isFetchingUser: false,

    setIsAuthenticated: (value) => set({ isAuthenticated: value }),
    setUser: (user) => set({ user }),
    setLoading: (value)=>set({isLoading: value}),

    fetchAuthenticatedUser: async()=>{
        // Avoid duplicate concurrent fetches and reduce rate limiting
        let shouldFetch = true;
        set((state) => {
            if (state.isFetchingUser) {
                shouldFetch = false;
                return {} as any;
            }
            return { isLoading: true, isFetchingUser: true } as any;
        });

        if (!shouldFetch) return;

        try {
            const user = await getCurrentUser();
            if(user){
                set({isAuthenticated: true, user: user as unknown as User});
            }else{
                set({isAuthenticated: false, user: null});
            }
        } catch (error) {
            console.log("Fetch authenticated user:", error);
            set({isAuthenticated: false, user:null});
        }finally{
            set({isLoading:false, isFetchingUser: false});
        }
    },
}));


export default useAuthStore;