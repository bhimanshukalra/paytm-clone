import { useCallback, useEffect, useState } from "react"
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type User = {
  firstName: string;
  lastName: string;
  _id: number;
}

export function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState("");

  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(response.data.users ?? []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  }, [filter]);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchUsers();
    }, 400); // 400ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [filter, fetchUsers]);

  return <div>
    <div className="font-bold mt-6 text-lg">
        Users
    </div>
    <div className="my-2">
        <input type="text" onChange={(e) => setFilter(e.target.value)} placeholder="Search users" className="w-full px-2 py-1 border rounded border-slate-200" />
    </div>
    <div>
        {users.map(renderUserItem)}
    </div>
  </div>;

  function renderUserItem(user: {
    firstName: string;
    lastName: string;
    _id: number;
  }) {

    const handleSendMoney = () => {
      navigate(`/send?id=${user._id}&name=${user.firstName} ${user.lastName}`);
    }
    
    return (
      <div className="flex justify-between">
        <div className="flex">
          <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
            <div className="flex flex-col justify-center h-full text-xl">
              {user.firstName[0]}
            </div>
          </div>
          <div className="flex flex-col justify-center h-ful">
            <div>
              {user.firstName} {user.lastName}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
          <Button onClick={handleSendMoney} label={"Send Money"} />
        </div>
      </div>
    );
  }
}
