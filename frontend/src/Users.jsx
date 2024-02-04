import { useState } from "react"
import { InputBox } from "./components/InputBox"
import { Button } from "./components/Button"

export const Users = () => {
    const [users, setUsers] = useState([{
        firstName: "Sahil",
        lastName: "Kuthe",
        _id: 1
    }])

    return (
        <>
            <div className="font-bold mt-5 text-lg ml-5">Users</div>
            <div className="ml-5 mr-5 mt-3">
                <InputBox placeholder={"Select users..."} />
            </div>
            <div>
                {users.map(user => <User user={user}/>)}
            </div>
        
        </>
    )
}

function User({ user }) {
    return <div className="flex justify-between">
        <div className="flex ml-5 ">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-2 mr-2">
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

        <div className="flex flex-col justify-center h-ful mr-5 mt-2">
            <Button label={"Send Money"} />
        </div>
    </div>
}