
import { Link,Form,useActionData, ActionFunctionArgs,redirect } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";

export async function action({request}: ActionFunctionArgs) {
  const data= Object.fromEntries(await request.formData())
  let error=''
  if (Object.values(data).includes('')){
    error='Todos los campos son obligatorios'
  }
  if(error.length){
    return error
  }
  await addProduct(data)

  return redirect;
}

export default function NewProduct() {

  const error=useActionData() as string
 
  return (
    <div>
      <div className="justify-between flex">
        <h2 className="text-4xl text-slate-400 font-black">Registrar Producto</h2>
        <Link
          to="/"
          className="rounded-md  bg-indigo-400 font-semibold text-white hover:bg-indigo-500 text-sm shadow-sm px-4 py-2"
        >
          Volver a Productos
        </Link> 
       
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form className="mt-10 flex flex-col p-2" method="POST">
          <label className="text-gray-800 text-xl my-1" htmlFor="name">Nombre del Producto</label>
          <input className="rounded-md p-2 bg-gray-50  text-black my-1" type="text" name="name" />
          <label className="text-gray-800 text-xl my-1" htmlFor="price">Precio del Producto</label>
          <input className="rounded-md p-2 bg-gray-50 text-black my-1" name="price" type="number" />

          <button className="rounded-md  bg-indigo-400 font-semibold text-white hover:bg-indigo-500 text-sm shadow-sm px-4 py-2 mt-2" type="submit">Registrar Producto</button>
        </Form>
    </div>
  );
}
