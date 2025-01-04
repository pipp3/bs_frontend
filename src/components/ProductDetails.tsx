import {
  Form,
  useNavigate,
  ActionFunctionArgs,
  redirect,
  useFetcher,
} from "react-router-dom";
import { Product } from "../types";
import { formatCurrency } from "../utils/index";
import { deleteProduct } from "../services/ProductService";

type ProductDetailsProps = {
  product: Product;
};

export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await deleteProduct(+params.id);
    return redirect("/");
  }
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const isAvalible = product.avalible;
  return (
    <tr className="bg-gray-100 hover:bg-gray-200 border-b border-gray-300">
      <td className="text-left px-4 py-2 font-medium text-gray-800">
        {product.name}
      </td>
      <td className="text-left px-4 py-2 text-gray-700">
        {formatCurrency(product.price)}
      </td>
      <td
        className={`text-left px-4 py-2 font-semibold ${
          isAvalible ? "text-green-600" : "text-red-600"
        }`}
      >
        <fetcher.Form method="POST" action="">
          <button
            value={product.id}
            className={`${
              isAvalible ? "text-green-400" : "text-red-600"
            } rounded-md w-full bg-slate-100 border border-black-100 hover:cursor-pointer p-2`}
            type="submit"
            name="id"
          >
            {product.avalible ? "Disponible" : "No Disponible"}
          </button>
        </fetcher.Form>
      </td>
      <td className="text-left px-4 py-2">
        <div className="flex gap-2 items-center">
          <button
            onClick={() =>
              navigate(`/productos/${product.id}/editar`, {
                state: { product },
              })
            }
            className="bg-cyan-500 rounded-md text-white p-2 font-normal"
          >
            Editar
          </button>
          <Form
            method="POST"
            action={`/productos/${product.id}/eliminar`}
            onSubmit={(e) => {
              if (!confirm("¿Estas seguro de eliminar este producto?")) {
                e.preventDefault();
              }
            }}
          >
            <input
              type="submit"
              value="Eliminar"
              className="bg-red-600 rounded-md text-white p-2 font-normal cursor-pointer"
            />
          </Form>
        </div>
      </td>
    </tr>
  );
}
