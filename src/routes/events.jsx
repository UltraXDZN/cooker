import { useEffect, useState } from "react";
import Event from "../components/event";
import Header from "../components/header";
import Search from "../components/search";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
import dummyEvents from "../data/dummyEvents";

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
        <div className="py-8">
          <Search />
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
