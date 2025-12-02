import { useEffect, useState } from "react";

export default function Home() {
  const [backendMessage, setBackendMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:5000/api/hello")
      .then((res) => res.json())
      .then((data) => setBackendMessage(data.message))
      .catch(() => setBackendMessage("Error fetching message"));
  }, []);

  return (
    <div>
      <h2>Home Page</h2>
      <p>Backend says: {backendMessage}</p>
    </div>
  );
}
