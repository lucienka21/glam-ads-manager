import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import DocumentHistory from "./pages/DocumentHistory";
import ReportGenerator from "./pages/ReportGenerator";
import InvoiceGenerator from "./pages/InvoiceGenerator";
import ContractGenerator from "./pages/ContractGenerator";
import PresentationGenerator from "./pages/PresentationGenerator";
import Leads from "./pages/Leads";
import Clients from "./pages/Clients";
import ClientProfile from "./pages/ClientProfile";
import RoleManagement from "./pages/RoleManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/history" element={<ProtectedRoute><DocumentHistory /></ProtectedRoute>} />
            <Route path="/leads" element={<ProtectedRoute><Leads /></ProtectedRoute>} />
            <Route path="/clients" element={<ProtectedRoute><Clients /></ProtectedRoute>} />
            <Route path="/clients/:id" element={<ProtectedRoute><ClientProfile /></ProtectedRoute>} />
            <Route path="/roles" element={<ProtectedRoute><RoleManagement /></ProtectedRoute>} />
            <Route path="/report-generator" element={<ProtectedRoute><ReportGenerator /></ProtectedRoute>} />
            <Route path="/invoice-generator" element={<ProtectedRoute><InvoiceGenerator /></ProtectedRoute>} />
            <Route path="/contract-generator" element={<ProtectedRoute><ContractGenerator /></ProtectedRoute>} />
            <Route path="/presentation-generator" element={<ProtectedRoute><PresentationGenerator /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
