import UserListing from "./pages/users/UserListing";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";

export const routes = [
    { id: 'register', path: '/register', component: <Register></Register> },
    { id: 'login', path: '/login', component: <Login></Login> },
    { id: 'user', path: '/user', component: <UserListing></UserListing>, isProtected: true },
];