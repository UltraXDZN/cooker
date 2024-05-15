import { Link } from "react-router-dom";

export default function Header({ title }) {
  return (
    <div className=" bg-blue-600 grid place-content-center">
      <Link to="/" className=" text-white text-3xl py-16 font-bold">
        {title}
      </Link>
    </div>
  );
}
