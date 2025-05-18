import { useState } from "react";
import { postData } from "./service/service";
import axios from "axios";

function App() {
  const [data, setData] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.trim()) return;

    setLoading(true);
    
    try {
      await postData(data);
      setData("");
      await fetchKafkaResponse();
    } catch (err) {
      console.error("Error:", err);
      setResponse("Error processing request");
      setLoading(false);
    }
  };

  const fetchKafkaResponse = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const result = await axios.get("http://localhost:8080/kafka");
      setResponse(result.data);
    } catch (err) {
      console.error("Error fetching Kafka response:", err);
      setResponse("Error fetching Kafka response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="text-center">
        <input
          placeholder="Enter something"
          type="text"
          value={data}
          onChange={handleChange}
          className=" p-2 rounded w-64  border-b-amber-50 border-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Submit"}
        </button>
      </form>

      {response && (
        <div className="mt-7 text-xl text-center">
          <strong>Kafka Response:</strong> {response}
        </div>
      )}

      <div className="mt-16 text-center max-w-2xl">
        <h3 className="text-3xl font-bold mb-2">How This Works?</h3>
        <p className="text-lg">
          Your message → Spring backend (via Controller) → Kafka Server (a topic in Kafka) → A Consumer reads the message → Sends it back to you.
        </p>
      </div>
    </div>
  );
}

export default App;