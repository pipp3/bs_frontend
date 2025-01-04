import { PropsWithChildren } from "react"

export default function ErrorMessage({children}:PropsWithChildren) {
  return (
    <div className="text-center bg-red-600 text-white font-bold p-3 uppercas my-3">
      {children}
    </div>
  )
}
