import axios from "axios";
import { useEffect, useState } from "react";

export function BalanceComp() {
    const [balance, setBalance] = useState(0);

    useEffect( () => {

        axios.get('http://localhost:3000/api/v1/account/balance', {
            headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    })
      .then(response => {
        setBalance(response.data.balance);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }, [balance]);
    
    return (
        <div className="flex">
            <div className="font-bold flex flex-col justify-center ml-5 mt-2">
                <div>Your Balance: Rs {Math.floor (balance)}</div>
            </div>
            

        </div>
    )
}