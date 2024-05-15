import { useEffect, useState } from "react";
import Event from "../components/event";
import Header from "../components/header";
import Search from "../components/search";
import dummyEvents from "../data/dummyEvents";
import { Link } from "react-router-dom";

export default function EventsPage() {
  const [events, setEvents] = useState(dummyEvents);

  // useEffect(() => {
  //   const q = query(collection(db, "events"));
  //   onSnapshot(q, (querySnapshot) => {
  //     setEvents(querySnapshot.docs);
  //   });
  // }, []);

  return (
    <>
      <Header title={"Events"} />
      <main className="max-w-[1280px] mx-auto">
        <div className="flex items-center py-8 gap-8">
          <Search />
          <Link
            to="/events/create"
            className=" bg-blue-600 text-white rounded-lg py-2 px-4 w-48 text-center"
          >
            Create Event
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-8">
          {events.map((event) => (
            <Event key={event.id} event={event} />
          ))}
        </div>
      </main>
    </>
  );
}
