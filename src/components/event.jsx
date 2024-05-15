import { Link } from "react-router-dom";

export default function Event({ event }) {
  return (
    <div className="border-2 rounded-xl py-4 w-full">
      <div className="pt-8 pb-4 flex justify-center items-center flex-col">
        <h2 className="font-bold ">{event.name}</h2>
        <p>{event.description}</p>
      </div>
      <hr></hr>
      <div className="flex justify-center items-center gap-4 pt-4">
        <Link
          to={`/events/${event.id}/edit`}
          className=" bg-blue-600 text-white rounded-full py-2 px-4"
        >
          Edit
        </Link>
        <Link
          to={`/events/${event.id}`}
          className=" bg-blue-600 text-white rounded-full py-2 px-4"
        >
          View
        </Link>
      </div>
    </div>
  );
}
