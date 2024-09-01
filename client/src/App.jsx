import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./utils/AuthProvider";
import CustomRoutes from './utils/CustomRoutes';

const App = () => {
    return (
        <AuthProvider>
          <BrowserRouter>
                  <CustomRoutes></CustomRoutes>
          </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
