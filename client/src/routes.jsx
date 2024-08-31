import UserListing from "./pages/users/UserListing";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";

export const routes = [
    { path: '/register', component: <Register></Register> },
    { path: '/login', component: <Login></Login> },
    { path: '/user', component: <UserListing></UserListing> },
];