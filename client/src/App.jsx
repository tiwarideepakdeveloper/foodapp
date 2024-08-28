import { routes } from './routes.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";

console.log(routes)

const App = () => {
    return (
      <BrowserRouter>
      <Routes>
        { routes.map((route, index) => (
          <Route key={index}
            exact path={route.path}
            element={route.component}
          ></Route>
          ))
        }
      </Routes>
      </BrowserRouter>
      );
}

export default App;