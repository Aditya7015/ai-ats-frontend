import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import Chatbot from "./components/Chatbot"; // <-- ADD THIS LINE

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Toaster position="top-center" />
      <AppRoutes />
      
      {/* ADD THESE 3 LINES 👇 */}
      <Chatbot
        userId="guest_user"
        userRole="candidate"
        position="bottom-right"
      />
      
      <Footer />
    </BrowserRouter>
  );
}

export default App;