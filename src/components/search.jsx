import { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState();

  return (
    <input
      type="text"
      placeholder="Search..."
      className="w-full rounded-lg py-2 px-4 border-2"
    />
  );
}
