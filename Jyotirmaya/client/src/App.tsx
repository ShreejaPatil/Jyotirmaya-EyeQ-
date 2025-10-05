import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Onboarding from "@/pages/Onboarding";
import Home from "@/pages/Home";
import Capture from "@/pages/Capture";
import Results from "@/pages/Results";
import Booking from "@/pages/Booking";
import Profile from "@/pages/Profile";

function ProtectedRoute({ component: Component }: { component: () => JSX.Element }) {
  const isOnboarded = localStorage.getItem('user_onboarded') === 'true';
  
  if (!isOnboarded) {
    return <Redirect to="/" />;
  }
  
  return <Component />;
}

function Router() {
  const isOnboarded = localStorage.getItem('user_onboarded') === 'true';

  return (
    <Switch>
      <Route path="/">
        {isOnboarded ? <Redirect to="/home" /> : <Onboarding />}
      </Route>
      <Route path="/home">
        <ProtectedRoute component={Home} />
      </Route>
      <Route path="/capture">
        <ProtectedRoute component={Capture} />
      </Route>
      <Route path="/results">
        <ProtectedRoute component={Results} />
      </Route>
      <Route path="/booking">
        <ProtectedRoute component={Booking} />
      </Route>
      <Route path="/profile">
        <ProtectedRoute component={Profile} />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
