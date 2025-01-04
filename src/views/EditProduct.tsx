import {
  Link,
  Form,
  useActionData,
  ActionFunctionArgs,
  redirect,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { updateProduct } from "../services/ProductService";
import { getProductById } from "../services/ProductService";
import { Product } from "../types";

import ProdcutForm from "../components/ProductForm";

export async function loader({ params }: LoaderFunctionArgs) {
  if (params.id !== undefined) {
    const product = await getProductById(+params.id);
    if (!product) {
      throw new Response("", {
        status: 404,
        statusText: "Producto no encontrado",
      });
      //redirect('/')
    }
    return product;
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  let error = "";
  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
  }
  if (error.length) {
    return error;
  }
  if (params.id !== undefined) {
    await updateProduct(data, +params.id);

    return redirect("/");
  }
}
const avalibleOptions = [
  { value: "true", label: "Disponible" },
  { value: "false", label: "No Disponible" },
];

export default function EditProduct() {
  const error = useActionData() as string;
  const product = useLoaderData() as Product;
  //const location = useLocation();

  return (
    <div>
      <div>
        <div className="justify-between flex">
          <h2 className="text-4xl text-slate-400 font-black">
            Editar Producto
          </h2>
          <Link
            to="/"
            className="rounded-md  bg-indigo-400 font-semibold text-white hover:bg-indigo-500 text-sm shadow-sm px-4 py-2"
          >
            Volver a Productos
          </Link>
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Form className="mt-10 flex flex-col p-2" method="POST">
          <ProdcutForm 
          product={product}
          />

          <div className="mb-4">
            <label className="text-gray-800 text-xl my-1" htmlFor="avalible">
              Disponibilidad
            </label>
            <select
              className="mt-2 block w-full p-3 bg-slate-50 rounded-md text-black"
              name="avalible"
              defaultValue={product?.avalible.toString()}
            >
              {avalibleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <button
            className="rounded-md  bg-indigo-400 font-semibold text-white hover:bg-indigo-500 text-sm shadow-sm px-4 py-2 mt-2"
            type="submit"
          >
            Guardar Cambios
          </button>
        </Form>
      </div>
    </div>
  );
}
