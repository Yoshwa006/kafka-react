import { useState } from "react";
import {postData} from "./service/service";
import axios from 'axios'

function App(){

  const[data, setData]  = useState("")
  const[res , setRes] = useState("")

  const handleChange = (e) =>{
      setData(e.target.value);

  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    postData(data)
    setData("")

    //
   setTimeout(async () => {
  try {
    const res = await axios.get("http://localhost:8080/kafka");
    console.log(res.data);
    setRes(prev => res.data.slice(0, -1)); // correct usage
  } catch (err) {
    console.error("Error fetching response:", err);
  }
}, 500);
  };



  return (
    <div className = "text-center">
      <h1 class = "text-center">idbsd</h1>
      <form onSubmit={handleSubmit} >
        <input 
        placeholder="Enter something"
        type = "text"
        value = {data}
        onChange = {handleChange}
        />
        <button type="submit"> Submit </button>
        </form>

        {res && (
        <div style={{ marginTop: "10px" }}>
          <strong class = "text-xl">Kafka Response:</strong> {res}
        </div>
      )}
    </div>
  )
} export default App;