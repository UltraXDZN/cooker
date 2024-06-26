import { useState } from "react";
import Header from "../components/header";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {};

  return (
    <>
      <Header title={"Login"} />
      <div></div>
      <form className="max-w-64 mx-auto py-2">
        <Link className=" text-blue-600 underline" to={"/register"}>
          Dont have an account? Register!
        </Link>
        <div className="flex flex-col gap-2 py-2">
          <label>
            Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            className="rounded-full border-2 py-2 px-4"
            placeholder="Email..."
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2 py-2">
          <label>
            Password <span className="text-red-400">*</span>
          </label>
          <input
            type="password"
            className="rounded-full border-2 py-2 px-4"
            placeholder="Password..."
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <span className="text-red-500">{errorMessage}</span>
        <button
          className="rounded-full w-full bg-blue-600 py-2 px-4 text-white mt-4"
          onClick={handleSubmit}
        >
          Login
        </button>
      </form>
    </>
  );
}
