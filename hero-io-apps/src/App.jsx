import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Apps from "./pages/Apps";
import AppDetails from "./pages/AppDetails";
import Installation from "./pages/Installation";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#13131a',
            color: '#f0f0f8',
            border: '1px solid #2e2e40',
            fontFamily: 'DM Sans, sans-serif',
          },
          success: { iconTheme: { primary: '#43e97b', secondary: '#0a0a0f' } },
        }}
      />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/apps/:id" element={<AppDetails />} />
          <Route path="/installation" element={<Installation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}