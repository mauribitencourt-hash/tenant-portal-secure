import { Routes, Route } from "react-router-dom";
import { TenantProvider } from "./contexts/TenantContext";
import HomePage from "./pages/HomePage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <TenantProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/imovel/:id" element={<PropertyDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </TenantProvider>
  );
}

export default App;
