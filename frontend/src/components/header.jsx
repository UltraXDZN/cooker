import { Link } from "react-router-dom";

export default function Header({ title }) {
  return (
    <div className=" bg-blue-600">
      <h1 className=" text-white text-3xl py-16 font-bold text-center">
        {title}
      </h1>
    </div>
  );
}
