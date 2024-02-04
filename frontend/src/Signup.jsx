import { Heading } from "./components/Heading"
import { Button } from "./components/Button";
import { InputBox } from "./components/InputBox"
import { SubHeading } from "./components/SubHeading"
import { BottomWarning } from "./components/BottomWarning";

export const Signup = () => {
    return (
        <div className="bg-slate-300 h-screen border-black rounded flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white border-black shadow-md shadow-slate-400 text-center p-2 px-4 h-max">
                    <Heading label={"Sign up"} />
                    <SubHeading label={"Enter your information to create an account"} />
                    <InputBox label={"First Name"} placeholder={"John"} />
                    <InputBox label={"Last Name"} placeholder={"Doe"} />
                    <InputBox label={"Email"} placeholder={"example@gmail.com"} />
                    <InputBox label={"Password"} placeholder={"123456"} />
                    <div className="pt-5">
                        <Button label={"Sign up"} onClick={() => {
                        console.log("clicked")
                    }} />
                    </div>
                    <BottomWarning message={"Already have an account? "} buttonText={"Sign in"} to={"/signin"} />
                </div>
                
            </div>
        </div>
    )
}