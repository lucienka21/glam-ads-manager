import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { AppErrorBoundary } from "@/components/layout/AppErrorBoundary";
import { useAppSettings } from "@/hooks/useAppSettings";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import DocumentHistory from "./pages/DocumentHistory";
import ReportGenerator from "./pages/ReportGenerator";
import InvoiceGenerator from "./pages/InvoiceGenerator";
import ContractGenerator from "./pages/ContractGenerator";
import PresentationGenerator from "./pages/PresentationGenerator";
import Leads from "./pages/Leads";
import LeadProfile from "./pages/LeadProfile";
import Clients from "./pages/Clients";
import ClientProfile from "./pages/ClientProfile";
import Campaigns from "./pages/Campaigns";
import EmailTemplates from "./pages/EmailTemplates";
import Tasks from "./pages/Tasks";
import RoleManagement from "./pages/RoleManagement";
import SalesFunnelPage from "./pages/SalesFunnelPage";
import UserProfile from "./pages/UserProfile";
import Notifications from "./pages/Notifications";
import Team from "./pages/Team";
import Calendar from "./pages/Calendar";
import SmsTemplates from "./pages/SmsTemplates";
import MonthlyReport from "./pages/MonthlyReport";
import Settings from "./pages/Settings";
import ROICalculator from "./pages/ROICalculator";
import ProposalGenerator from "./pages/ProposalGenerator";
import CampaignGenerator from "./pages/CampaignGenerator";
import GraphicsCreator from "./pages/GraphicsCreator";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  // Initialize app settings and apply theme
  useAppSettings();
  
  return (
    <BrowserRouter>
      <AppErrorBoundary>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><DocumentHistory /></ProtectedRoute>} />
          <Route path="/leads" element={<ProtectedRoute><Leads /></ProtectedRoute>} />
          <Route path="/leads/:id" element={<ProtectedRoute><LeadProfile /></ProtectedRoute>} />
          <Route path="/clients" element={<ProtectedRoute><Clients /></ProtectedRoute>} />
          <Route path="/clients/:id" element={<ProtectedRoute><ClientProfile /></ProtectedRoute>} />
          <Route path="/campaigns" element={<ProtectedRoute><Campaigns /></ProtectedRoute>} />
          <Route path="/funnel" element={<ProtectedRoute><SalesFunnelPage /></ProtectedRoute>} />
          <Route path="/email-templates" element={<ProtectedRoute><EmailTemplates /></ProtectedRoute>} />
          <Route path="/roles" element={<ProtectedRoute><RoleManagement /></ProtectedRoute>} />
          <Route path="/profile/:id" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
          <Route path="/team" element={<ProtectedRoute><Team /></ProtectedRoute>} />
          <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
          <Route path="/sms-templates" element={<ProtectedRoute><SmsTemplates /></ProtectedRoute>} />
          <Route path="/monthly-report" element={<ProtectedRoute><MonthlyReport /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/report-generator" element={<ProtectedRoute><ReportGenerator /></ProtectedRoute>} />
          <Route path="/invoice-generator" element={<ProtectedRoute><InvoiceGenerator /></ProtectedRoute>} />
          <Route path="/contract-generator" element={<ProtectedRoute><ContractGenerator /></ProtectedRoute>} />
          <Route path="/presentation-generator" element={<ProtectedRoute><PresentationGenerator /></ProtectedRoute>} />
          <Route path="/roi-calculator" element={<ProtectedRoute><ROICalculator /></ProtectedRoute>} />
          <Route path="/proposal-generator" element={<ProtectedRoute><ProposalGenerator /></ProtectedRoute>} />
          <Route path="/campaign-generator" element={<ProtectedRoute><CampaignGenerator /></ProtectedRoute>} />
          <Route path="/graphics-creator" element={<ProtectedRoute><GraphicsCreator /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppErrorBoundary>
    </BrowserRouter>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
