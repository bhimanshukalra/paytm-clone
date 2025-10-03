import { Link } from 'react-router-dom'

export const BottomWarning = ({label, linkText, linkDestination}: {label: string, linkText: string, linkDestination: string}) => {
  return (
    <div className="py-2 text-sm flex justify-center">
        <div>{label}</div>
        <Link className="pointer underline pl-1 cursor-pointer" to={linkDestination}>
          {linkText}
        </Link>
    </div>
  )
}