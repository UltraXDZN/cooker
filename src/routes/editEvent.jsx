import { useEffect, useState } from "react";
import Header from "../components/header";
import { Link, useParams } from "react-router-dom";
import dummyEvents from "../data/dummyEvents";
import Button from "../components/Button";

export default function EditEventPage() {
  const { eventID } = useParams();

  useEffect(() => {
    const event = dummyEvents.find((ev) => ev.id === parseInt(eventID));
    setName(event.name);
    setAffectedBrand(event.affected_brand);
    setDescription(event.description);
    setMaliciusUrl(event.malicious_url);
    setRegistrationDate(event.malicious_domain_registration_date);
    setDns(event.dns_records);
    setKeywords(event.matching_keywords);
    setStatus(event.status);
  }, [eventID]);

  const [name, setName] = useState("");
  const [affected_brand, setAffectedBrand] = useState("");
  const [description, setDescription] = useState("");
  const [maliciousUrl, setMaliciusUrl] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  const [dnsRecords, setDns] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [status, setStatus] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {};

  return (
    <>
      <Header title={"Edit Event " + eventID} />
      <form className=" max-w-72 mx-auto py-2">
        <Link to={"/events"}>
          <Button name={"All Events"} />
        </Link>
        <div className="flex flex-col gap-2 py-2">
          <label>
            Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            className="rounded-full border-2 py-2 px-4"
            placeholder="Name..."
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2 py-2">
          <label>
            Affected Brand <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            className="rounded-full border-2 py-2 px-4"
            placeholder="Affected Brand..."
            required
            value={affected_brand}
            onChange={(e) => {
              setAffectedBrand(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2 py-2">
          <label>
            Description <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            className="rounded-full border-2 py-2 px-4"
            placeholder="Description..."
            required
            maxLength={1500}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2 py-2">
          <label>
            Malicious URL <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            className="rounded-full border-2 py-2 px-4"
            placeholder="Malicius Url..."
            required
            value={maliciousUrl}
            onChange={(e) => {
              setMaliciusUrl(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2 py-2">
          <label>
            Malicious Domain Registration Date
            <span className="text-red-400">*</span>
          </label>
          <input
            type="datetime-local"
            className="rounded-full border-2 py-2 px-4"
            placeholder="Refistration Date..."
            required
            value={registrationDate}
            onChange={(e) => {
              setRegistrationDate(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2 py-2">
          <label>
            DNS Records (seperate by comma ",")
            <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            className="rounded-full border-2 py-2 px-4"
            placeholder="DNS Records ..."
            required
            value={dnsRecords}
            onChange={(e) => {
              setDns(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2 py-2">
          <label>
            Keywords (seperate by comma ",")
            <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            className="rounded-full border-2 py-2 px-4"
            placeholder="Keywords..."
            required
            value={keywords}
            onChange={(e) => {
              setKeywords(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2 py-2">
          <label>
            Status
            <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            className="rounded-full border-2 py-2 px-4"
            placeholder="Status..."
            required
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          />
        </div>
        <span className="text-red-500">{errorMessage}</span>
        <button
          className="rounded-full w-full bg-blue-600 py-2 px-4 text-white mt-4"
          onClick={handleSubmit}
        >
          Create
        </button>
      </form>
    </>
  );
}
