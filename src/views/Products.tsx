import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom";
import { getProducts, updateProductAvalible } from "../services/ProductService";
import ProductDetails from "../components/ProductDetails";
import { Product } from "../types";

export async function loader() {
  const products = await getProducts();

  return products;
}

export async function action({request}:ActionFunctionArgs) {

  const data= Object.fromEntries(await request.formData())
  //console.log(+data.id)
  await updateProductAvalible(+data.id)
  return {}
}

export default function Products() {
  const products = useLoaderData() as Product[];
  return (
    <div>
      <div className="justify-between flex">
        <h2 className="text-4xl text-slate-400 font-black">Productos</h2>
        <Link
          to="productos/crear"
          className="rounded-md  bg-indigo-400 font-semibold text-white hover:bg-indigo-500 text-sm shadow-sm px-4 py-2"
        >
          Agregar Producto
        </Link>
      </div>
      <div>
        <table className="w-full mt-4 border-collapse border border-gray-300 shadow-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-left px-4 py-2 text-gray-800 font-semibold border-b border-gray-300">
                Nombre
              </th>
              <th className="text-left px-4 py-2 text-gray-800 font-semibold border-b border-gray-300">
                Precio
              </th>
              <th className="text-left px-4 py-2 text-gray-800 font-semibold border-b border-gray-300">
                Disponible
              </th>
              <th className="text-left px-4 py-2 text-gray-800 font-semibold border-b border-gray-300">
                Accion
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <ProductDetails key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
