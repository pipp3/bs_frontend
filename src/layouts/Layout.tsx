import { Outlet } from "react-router-dom"

function Layout() {
  return (
    <div>
      <header className="bg-gray-800 text-white p-4">
        <div className="mx-auto max-w-6xl text-center py-10">
          <h1 className="text-4xl font-extrabold text-white">
            Administrador de Productos
          </h1>
        </div>
      </header>
      <main>
        <div className="container mx-auto mt-4 max-w-6xl p-4">
          <div className="bg-white shadow-md rounded-md p-4">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Layout
