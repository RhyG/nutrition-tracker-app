import React, { createContext, useEffect, useState } from "react";
import storage from "../lib/async-storage";

const JournalContext = createContext();

const defaultData = {
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: [],
  Saturday: [],
  Sunday: [],
};

function JournalProvider({ children }) {
  const [journalData, setJournalData] = useState(defaultData);

  useEffect(() => {
    const getData = async () => {
      const storedData = await storage.getItem("journalData", defaultData);
      setJournalData(storedData);
    };

    getData();
  }, []);

  const updateJournal = async (data) => {
    await storage.setItem("journalData", data);
    setJournalData(data);
  };

  const clearJournal = async () => {
    console.log("clearing");
    await storage.setItem("journalData", defaultData);
    setJournalData(defaultData);
  };

  return (
    <JournalContext.Provider
      value={{
        journalData,
        updateJournal,
        clearJournal,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
}

const JournalConsumer = JournalContext.Consumer;

export { JournalProvider, JournalConsumer };
export default JournalContext;
