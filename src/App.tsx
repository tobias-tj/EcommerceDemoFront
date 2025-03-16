import AppRoutes from "./AppRoutes";
import { Toaster } from "sonner";

const App: React.FC = () => {
  return (
    <div>
      <AppRoutes></AppRoutes>
      <Toaster position="top-center" richColors />
    </div>
  );
};

export default App;
