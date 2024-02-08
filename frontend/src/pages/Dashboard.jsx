import { AppBar } from "../components/AppBar";
import { Users } from "../components/Users";
import { BalanceComp } from "../components/BalanceComp";
import axios from "axios";


export const Dashboard = () => {
    const balance = axios.get("http://localhost:3000/api/v1/account/balance").then()
    return <div>
        <AppBar />
        <div className="m-8">
            <BalanceComp balance={balance} />
            <Users />
        </div>

    </div>
}