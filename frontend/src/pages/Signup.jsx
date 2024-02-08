import { useState } from "react";
import { Heading } from "../components/Heading";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { BottomWarning } from "../components/BottomWarning";
import axios, { Axios } from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="bg-slate-300 h-screen border-black rounded flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white border-black shadow-md shadow-slate-400 text-center p-2 px-4 h-max">
                    <Heading label="Sign up" />
                    <SubHeading label="Enter your information to create an account" />

                    <InputBox
                        onChange={(e) => {
                            setFirstName(e.target.value);
                        }}
                        label="First Name"
                        placeholder="John"
                    />

                    <InputBox
                        onChange={(e) => {
                            setLastName(e.target.value);
                        }}
                        label="Last Name"
                        placeholder="Doe"
                    />

                    <InputBox
                        onChange={(e) => {
                            setUserName(e.target.value);
                        }}
                        label="Email"
                        placeholder="example@gmail.com"
                    />

                    <InputBox
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        label="Password"
                        placeholder="123456"
                    />

                    <div className="pt-5">
                        <Button onClick={async () => {
                            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                                username,
                                firstName,
                                lastName,
                                password
                            });
                            localStorage.setItem("token", response.data.token);
                            navigate("/dashboard");
                        }} label="Sign up" />
                    </div>
                    <BottomWarning message="Already have an account? " buttonText="Sign in" to="/signin" />
                </div>
            </div>
        </div>
    );
};
