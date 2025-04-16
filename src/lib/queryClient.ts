import { QueryClient } from "@tanstack/react-query";

export default new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 30,
            gcTime: 1000 * 60 * 5,
        }
    }
});