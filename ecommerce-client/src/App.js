import { BrowserRouter, Outlet, Route, Router, Routes } from "react-router-dom";
import ForgetPassword from "./components/auth/ForgetPassword";
import Footer from "./components/user/footer/Footer";
import Header from "./components/user/header/Header";
import Main from "./components/user/main/Main";
import 'react-toastify/dist/ReactToastify.css';
import ChangePasswordWithToken from "./components/auth/ChangePasswordWithToken";
import OkPassword from "./components/auth/OkPassword";
import HeaderSupport from "./components/user/header/HeaderSupport";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { RedirectOauth2 } from "./components/oauth2/RedirectOauth2";
import NotFound from "./components/error/NotFound";
import Left from "./components/admin/Left";
import HeaderAdmin from "./components/admin/HeaderAdmin";
import UserManagement from "./components/admin/UserManagement";
import MyProfile from "./components/auth/MyProfile";
import ProfileNav from "./components/auth/ProfileNav";
import ChangePassword from "./components/auth/ChangePassword";
import CategoryManagement from "./components/admin/category/CategoryManagement";
import CloudinaryUploader from "./components/UploadImage";
import CreateVariation from "./components/admin/category/variation/CreateVariation";
import ListVariation from "./components/admin/category/variation/ListVarialtion";
import ListProduct from "./components/admin/product/ListProduct";
import EditProduct from "./components/admin/product/EditProduct";
import Settings from "./components/admin/Settings";
import SetBanner from "./components/admin/SetBanner";
import QRScanner from "./components/QRScanner";

const Layout = ({ children }) => (
  <div className="App">
    <header>
      <Header />
    </header>
    {children}
    <Footer />
  </div>
);

const LayoutProfile = ({ children }) => (
  <div className="App">
    <header>
      <Header />
    </header>

    <body className="bg-gray-100  py-4 ">
      <div className="container max-w-[1200px] mx-auto rounded-lg overflow-hidden">
        <div className=" flex ">
          <ProfileNav />
          {children}
        </div>
      </div>
    </body>
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

const LayoutAdmin = ({ children }) => (
  <div className="App flex">
    <Left />
    <div className="w-full">
      <HeaderAdmin />
      {children}
    </div>
  </div>
);

function App() {

  return (
    (<BrowserRouter>
      <Routes>
        <Route path={`/upload`} element={<CloudinaryUploader/>}/>
        <Route
          element={
            <Layout>
              <Outlet />
            </Layout>
          }>
          <Route path="/" element={<Main />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/qr" element={<QRScanner />} />



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

        <Route path="oauth2/redirect" element={<RedirectOauth2 />} />
        <Route path="not-found" element={<NotFound />} />


        <Route
          element={
            <LayoutAdmin>
              <Outlet />
            </LayoutAdmin>
          }>
          <Route path="/admin/user-management" element={<UserManagement />} />
          <Route path="/admin/category-management" element={<CategoryManagement />} />
          <Route path="/admin/create-variation" element={<CreateVariation />} />
          <Route path="/admin/list-variation" element={<ListVariation />} />
          <Route path="/admin/list-product" element={<ListProduct />} />
          <Route path="/admin/edit-product" element={<EditProduct />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/banner" element={<SetBanner />} />
        </Route>
        <Route
          element={
            <LayoutProfile>
              <Outlet />
            </LayoutProfile>
          }>
          <Route path="/profile/my-profile" element={<MyProfile />} />
          <Route path="/profile/change-password" element={<ChangePassword />} />

        </Route>
      </Routes>
    </BrowserRouter>)

  );
}

export default App;
