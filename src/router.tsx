import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products,{loader as productsLoader, action as updateAvalibleProduct} from "./views/Products";
import NewProduct, {action as createProduct} from "./views/NewProduct";
import EditProduct,{loader as editProductLoader, action as editProduct} from "./views/EditProduct";
import {action as deleteProduct} from "./components/ProductDetails";
export const Router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Products  />,
                loader: productsLoader,
                action: updateAvalibleProduct
            },
            {   
                path: "productos/crear",
                element: <NewProduct  />,
                action: createProduct
            },
            {
                path: "productos/:id/editar",
                element: <EditProduct  />,
                loader: editProductLoader,
                action: editProduct
            },
            {
                path: "productos/:id/eliminar",
                action: deleteProduct
            }
        ]
    }
]);