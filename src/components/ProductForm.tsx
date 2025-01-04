import { Product } from '../types';
type ProductFormProps = {
    product?: Product
};

export default function ProductForm({product}:ProductFormProps) {
  return (
    <>
        <div className="mb-4">
            <label className="text-gray-800 text-xl my-1" htmlFor="name">
              Nombre del Producto
            </label>
            <input
              className="rounded-md p-2 bg-gray-50  text-black my-1"
              type="text"
              name="name"
              defaultValue={product?.name}
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-800 text-xl my-1" htmlFor="price">
              Precio del Producto
            </label>
            <input
              className="rounded-md p-2 bg-gray-50 text-black my-1"
              name="price"
              type="number"
              defaultValue={product?.price}
            />
          </div>
    </>
  )
}
