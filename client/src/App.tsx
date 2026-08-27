// import { useEffect, useState } from "react";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter } from "react-router-dom";

// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { Toaster } from "@/components/ui/toaster";
// import { TooltipProvider } from "@/components/ui/tooltip";

// import AppRoutes from "./routes/routes";
// import { LAUNCH_TIME } from "./config/launchTime";
// import ComingSoon from "./components/ComingSoon";
// // import NoticePopup from "./pages/Notice/Notice";

// // import ComingSoon from "./components/ComingSoon";
// // import { LAUNCH_TIME } from "./config/launchTime";
// // import SupportSticky from "./components/SupportSticky";

// const queryClient = new QueryClient();

// export default function App() {
//   const [isLive, setIsLive] = useState(false);

//   useEffect(() => {
//     const check = () => {
//       setIsLive(new Date() >= LAUNCH_TIME);
//     };

//     check(); // initial check

//     const interval = setInterval(check, 1000); // every 1 sec

//     return () => clearInterval(interval);
//   }, []);

//   if (!isLive) {
//     return <ComingSoon launchTime={LAUNCH_TIME} />;
//   }

//   return (
//     <QueryClientProvider client={queryClient}>
//       <TooltipProvider>
//         {/* <SupportSticky /> */}
//         <Toaster />
//         <Sonner />
//         {/* <NoticePopup /> */}

//         <BrowserRouter>
//           <AppRoutes />
//         </BrowserRouter>
//       </TooltipProvider>
//     </QueryClientProvider>
//   );
// }


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/routes";
import ScrollToTop from "./hooks/ScrollToTop";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <ScrollToTop />
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

