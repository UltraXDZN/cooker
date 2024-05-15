import { useState } from "react";
import Header from "../components/header";
import { Link, useParams } from "react-router-dom";

export default function EditEventPage() {
  const { eventID } = useParams();

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

  const ex = {
    id: 1,
    name: "Phishing Attack",
    affected_brand: "Example Brand",
    description: "Description of the attack",
    malicious_url: "http://malicious.com/",
    malicious_domain_registration_date: "2024-01-01T00:00:00",
    dns_records: ["A record", "NS record"],
    matching_keywords: ["keyword1", "keyword2"],
    status: "todo",
    analyst_comments: [],
  };

  return (
    <>
      <Header title={"Create Event"} />
      <form className=" max-w-72 mx-auto py-2">
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
          <input
            type="text"
            className="rounded-full border-2 py-2 px-4"
            placeholder="DNS A..."
            required
            value={maliciousUrl}
            onChange={(e) => {
              setMaliciusUrl(e.target.value);
            }}
          />
          <input
            type="text"
            className="rounded-full border-2 py-2 px-4"
            placeholder="DNS NS..."
            required
            value={maliciousUrl}
            onChange={(e) => {
              setMaliciusUrl(e.target.value);
            }}
          />
          <input
            type="text"
            className="rounded-full border-2 py-2 px-4"
            placeholder="DNS MX..."
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
