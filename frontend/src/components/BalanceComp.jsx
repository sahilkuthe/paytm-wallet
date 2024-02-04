export function BalanceComp({balance}) {
    return (
        <div className="flex">
            <div className="font-bold flex flex-col justify-center ml-5 mt-2">
                <div>Your Balance: Rs{ balance}</div>
            </div>
            

        </div>
    )
}