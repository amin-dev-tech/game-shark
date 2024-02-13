// bootstrap imports
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";

// library imports
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// rrd imports
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <main className="py-5">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
