import { Provider } from "@/components/ui/provider";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </Provider>
    </QueryClientProvider>
  );
}
