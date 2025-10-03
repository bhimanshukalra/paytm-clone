import { Appbar, Balance, Users } from "../components"

export const Dashboard = () => {
  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance value={10000} />
        <Users />
      </div>
    </div>
  )
}
