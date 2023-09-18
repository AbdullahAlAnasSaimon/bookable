import "./App.css";
import { Toaster } from "./components/ui/toaster";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <>
      <div>
        <Toaster />
        <MainLayout />
      </div>
    </>
  );
}

export default App;
