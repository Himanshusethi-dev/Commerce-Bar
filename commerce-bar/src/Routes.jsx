import { createBrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import App from "./App";
import Home from "./pages/home/Home";
import CollectionsList from "./pages/collectionsList/CollectionsList";
import ProductPage from "./pages/productPage/ProductPage";
import ProductList from "./pages/productListing/ProductList";
import Login from "./pages/Account/Login";
import Register from "./pages/Account/Register";
import Customer from "./pages/Account/Customer";
import Cart from "./pages/cart/Cart";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <App />,
                children: [
                    {
                        path: "/",
                        element: <Home />
                    },
                    {
                        path: "collections-list",
                        element: <CollectionsList />
                    },
                    {
                        path: "collections/:handle",
                        element: <ProductList />
                    },
                    {
                        path: "products/:handle",
                        element: <ProductPage />
                    },
                    {
                        path: "account/login",
                        element: <Login />
                    },
                    {
                        path: 'account/signup',
                        element: <Register />
                    },
                    {
                        path: 'account/profile',
                        element: <Customer />
                    },
                    {
                        path: 'cart',
                        element: <Cart />
                    }

                ]
            }
        ]
    }
])