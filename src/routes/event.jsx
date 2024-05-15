import { useParams } from "react-router-dom";
import Header from "../components/header";
import dummyEvents from "../data/dummyEvents";
import { useEffect, useState } from "react";

export default function EventPage() {
  const { eventID } = useParams();
  const [event, setEvent] = useState(
    dummyEvents.find((ev) => ev.id === eventID)
  );

  useEffect(() => {}, []);

  console.log(event);
  return (
    <>
      <Header title={"Event"} />
      <div>{eventID}</div>
    </>
  );
}
