import "./App.css";
import { AuthProvider } from "./auth";
import appRoutes from "../routes/app/app";
import authRoutes from "../routes/auth/auth";
import userRoutes from "../routes/user/user";
import ledgerRoutes from "../routes/ledger/ledger";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { View } from "../components/view/view";
import { PrivateRoute } from "./auth";
import { toast, ToastContainer } from "react-toastify";

function App() {
  const routes = [...authRoutes, ...appRoutes, ...userRoutes, ...ledgerRoutes];

  return (
    <BrowserRouter>
      <ToastContainer />
      <AuthProvider>
        <Routes>
          {routes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  route.permission ? (
                    <PrivateRoute permission={route.permission}>
                      <View
                        display={route.view}
                        layout={route.layout}
                        title={route.title}
                      />
                    </PrivateRoute>
                  ) : (
                    <View
                      display={route.view}
                      layout={route.layout}
                      title={route.title}
                    />
                  )
                }
              />
            );
          })}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

/*
 <AuthProvider>
   <BrowserRouter>
     <Routes>
       {routes.map((route) => {
         return (
           <Route
             key={route.path}
             path={route.path}
             element={
               <View
                 display={route.view}
                 //  layout={route.layout}
                 //  title={route.title}
               />
             }
           />
         );
       })}
     </Routes>
   </BrowserRouter>
 </AuthProvider>; */
