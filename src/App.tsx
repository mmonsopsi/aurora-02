import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";
import Index from "./pages/Index";
import Setup from "./pages/Setup";

const queryClient = new QueryClient();

const App = () => {
  const { theme } = useTheme();

  return (
    <div className={theme}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="min-h-screen bg-background">
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/setup" element={<Setup />} />
                <Route path="/chat" element={<Index />} />
                <Route path="/" element={<Navigate to="/setup" replace />} />
              </Routes>
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;