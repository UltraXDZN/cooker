import { Link, useParams } from "react-router-dom";
import Header from "../components/header";
import dummyEvents from "../data/dummyEvents";
import { useEffect, useState } from "react";
import Button from "../components/Button";

export default function EventPage() {
  const { eventID } = useParams();
  const [event, setEvent] = useState({});
  const [editCommentIndex, setEditCommentIndex] = useState(null);
  const [editedComment, setEditedComment] = useState(null);

  useEffect(() => {
    setEvent(
      (prevEvent) =>
        dummyEvents.find((ev) => ev.id === parseInt(eventID)) || prevEvent
    );
  }, [eventID]);

  const handleEditComment = (index, comment) => {
    setEditedComment(comment);
    setEditCommentIndex(index);
  };

  const handleCancelEditComment = () => {
    setEditedComment(null);
    setEditCommentIndex(null);
  };

  const confirmEditComment = (index) => {
    setCommentState((prevComments) => {
      const updatedComments = [...prevComments];
      updatedComments[index].comment = editedComment;
      return updatedComments;
    });
    setEditCommentIndex(null);
  };

  const handleRemoveComment = (index) => {
    setEvent(
      (prevEvent) =>
        event.analyst_comments.filter((comment) => comment.index !== index) ||
        prevEvent
    );
  };

  return (
    <>
      <Header title={"Event"} />
      <div className="max-w-[500px] mx-auto pt-8 pb-8">
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
            Status:
            <span className=" font-bold"> {event.status}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-bold">Comments:</span>
          {event && event.analyst_comments ? (
            event.analyst_comments.map((comment) => (
              <div
                key={comment.index}
                className=" bg-slate-100 py-2 px-4 rounded-lg"
              >
                <small className=" text-gray-500 text-xs">
                  {comment.timestamp}
                </small>
                <h3 className=" font-bold">{comment.username}</h3>
                {editCommentIndex === comment.index ? (
                  <input
                    type="text"
                    className="border-2 p-4 w-full my-4 rounded-md"
                    value={editedComment}
                    onChange={(e) => setEditedComment(e.target.value)}
                  />
                ) : (
                  <p>{comment.comment}</p>
                )}
                <div className=" flex flex-row-reverse gap-2">
                  {editCommentIndex === comment.index ? (
                    <button
                      className=" bg-red-500 text-white rounded-lg py-2 px-8 text-center"
                      onClick={() => handleCancelEditComment()}
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      className=" bg-red-500 text-white rounded-lg py-2 px-8 text-center"
                      onClick={() => handleRemoveComment(comment.index)}
                    >
                      Remove
                    </button>
                  )}
                  {editCommentIndex === comment.index ? (
                    <button
                      className=" bg-blue-600 text-white rounded-lg py-2 px-8 text-center"
                      onClick={() => confirmEditComment()}
                    >
                      Confirm
                    </button>
                  ) : (
                    <button
                      className=" bg-blue-600 text-white rounded-lg py-2 px-8 text-center"
                      onClick={() =>
                        handleEditComment(comment.index, comment.comment)
                      }
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No Comments</p>
          )}
        </div>
      </div>
    </>
  );
}
