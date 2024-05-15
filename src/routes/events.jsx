import { useState } from "react";
import Event from "../components/event";
import Header from "../components/header";

const dummyEvents = [
  {
    id: 1,
    name: "Event1",
  },
  {
    id: 12,
    name: "Event2",
  },
];

export default function EventsPage() {
  const [events, setEvents] = useState(dummyEvents);

  return (
    <>
      <div>
        <Header title={"Events"} />
        {events.map((event) => (
          <Event key={event.id} event={event} />
        ))}
      </div>
    </>
  );
}
