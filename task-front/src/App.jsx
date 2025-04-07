import React, { useState } from "react";
import AddEmail from "./components/AddEmail";
import EmailList from "./components/EmailList";
import MostFrequently from "./components/MostFrequently";
import "./App.css";

function App() {
  const [emailList, setEmailList] = useState([]);

  const handleAddEmail = (email) => {
    setEmailList((prev) => [...prev, email]);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col gap-6 items-center p-6 max-w-xl w-full">
        <AddEmail onAddEmail={handleAddEmail} />
        <EmailList emails={emailList} />
        <MostFrequently />
      </div>
    </div>
  );
}

export default App;
