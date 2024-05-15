import { Link, useParams } from "react-router-dom";
import Header from "../components/header";
import dummyEvents from "../data/dummyEvents";
import { useEffect, useState } from "react";
import Button from "../components/Button";

export default function EventPage() {
  const { eventID } = useParams();
  const [event, setEvent] = useState({});

  useEffect(() => {
    setEvent(
      (prevEvent) =>
        dummyEvents.find((ev) => ev.id === parseInt(eventID)) || prevEvent
    );
  }, [eventID]);

  const handleEditComment = () => {};
  const handleRemoveComment = () => {};

  return (
    <>
      <Header title={"Event"} />
      <div className="max-w-[500px] mx-auto pt-8">
        <div className="flex flex-col gap-2 pb-4">
          <Link to={"/events"}>
            <Button name={"All Events"} />
          </Link>
          <h2 className="text-3xl font-bold">{event.name}</h2>
          <h3 className=" text-gray-700">{event.affected_brand}</h3>
          <p>{event.description}</p>
          <hr></hr>
          <p>
            Malicious URL:
            <span className=" font-bold"> {event.malicious_url}</span>
          </p>
          <p>
            Malicious Domain Registration Date:
            <span className=" font-bold">
              {" "}
              {event.malicious_domain_registration_date}
            </span>
          </p>
          <hr></hr>
          DNS Records:
          <div className="flex gap-2">
            {event && event.dns_records ? (
              event.dns_records.map((record) => (
                <div
                  key={record}
                  className="rounded-full py-2 px-4 bg-gray-300 text-gray-800"
                >
                  {record}
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
          Keywords:
          <div className="flex gap-2 pb-2">
            {event && event.matching_keywords ? (
              event.matching_keywords.map((keyword) => (
                <div
                  key={keyword}
                  className="rounded-full py-2 px-4 bg-gray-300 text-gray-800"
                >
                  {keyword}
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <hr></hr>
          <div>
            {" "}
            Malicious Domain Registration Date:
            <span className=" font-bold"> {event.status}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-bold">Comments:</span>
          {event && event.analyst_comments ? (
            event.analyst_comments.map((comment) => (
              <div
                key={comment.comment}
                className=" bg-slate-100 py-2 px-4 rounded-lg"
              >
                <small className=" text-gray-500 text-xs">
                  {comment.timestamp}
                </small>
                <h3 className=" font-bold">{comment.username}</h3>
                <p>{comment.comment}</p>
                <div className=" flex flex-row-reverse gap-2">
                  <button className=" bg-red-500 text-white rounded-lg py-2 px-8 text-center">
                    Remove
                  </button>
                  <button className=" bg-blue-600 text-white rounded-lg py-2 px-8 text-center">
                    Edit
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}
