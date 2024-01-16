import { BrowserRouter, Outlet, Route, Router, Routes } from "react-router-dom";
import ForgetPassword from "./components/auth/ForgetPassword";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import 'react-toastify/dist/ReactToastify.css';
import ChangePasswordWithToken from "./components/auth/ChangePasswordWithToken";
import OkPassword from "./components/auth/OkPassword";
import HeaderSupport from "./components/header/HeaderSupport";

const Layout = ({ children }) => (
  <div className="App">
    <header>
      <Header />
    </header>
    {children}
    <Footer />
  </div>
);
const LayoutHeaderSupport = ({ children }) => (
  <div className="App">
    <header>
      <HeaderSupport />
    </header>
    {children}
    <Footer />
  </div>
);

function App() {
  return (
    (<BrowserRouter>
      <Routes>
        <Route
          element={
            <Layout>
              <Outlet />
            </Layout>
          }>
          <Route path="/" element={<Main />} />
          <Route path="/forget-password" element={<ForgetPassword />} />


        </Route>
        <Route
          element={
            <LayoutHeaderSupport>
              <Outlet />
            </LayoutHeaderSupport>
          }>
          <Route path="/change-password-wtk" element={<ChangePasswordWithToken />} />
          <Route path="/ok-password" element={<OkPassword />} />

        </Route>




      </Routes>
    </BrowserRouter>)

  );
}

export default App;
