import { Link } from "react-router-dom";
import Header from "../components/header";

export default function HomePage() {
  return (
    <>
      <Header title={"Home"} />
      <div className="flex justify-center gap-16 py-16">
        <Link className=" border-2 px-8 py-4 rounded-xl" to={"/login"}>
          Login
        </Link>
        <Link className=" border-2 px-8 py-4 rounded-xl" to={"/register"}>
          Register
        </Link>
      </div>
    </>
  );
}
