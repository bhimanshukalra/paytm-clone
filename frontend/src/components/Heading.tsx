export function Heading({label}: {label?: string}) {
  return (
    <h1 className="text-bold font-bold underline">
      {label}
    </h1>
  )
}