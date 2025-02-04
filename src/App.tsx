import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AccountsPage from "./pages/accounts";
import NewPostPage from "./pages/new-post";
import ScheduledPage from "./pages/scheduled";
import SettingsPage from "./pages/settings";
import BillingPage from "./pages/settings/billing";
import NotificationsPage from "./pages/settings/notifications";
import AuthPage from "./pages/auth";

const queryClient = new QueryClient();

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="app-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/auth" element={<AuthPage />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Index />
                  </PrivateRoute>
                }
              />
              <Route
                path="/accounts"
                element={
                  <PrivateRoute>
                    <AccountsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/new-post"
                element={
                  <PrivateRoute>
                    <NewPostPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/scheduled"
                element={
                  <PrivateRoute>
                    <ScheduledPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <PrivateRoute>
                    <SettingsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/settings/billing"
                element={
                  <PrivateRoute>
                    <BillingPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/settings/notifications"
                element={
                  <PrivateRoute>
                    <NotificationsPage />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;