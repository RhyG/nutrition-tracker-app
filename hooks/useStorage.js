import React, { useRef, useEffect } from "react";

import useIsInitialRender from "./useIsInitialRender";
import storage from "../lib/async-storage";

const defaultJournalData = {
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: [],
  Saturday: [],
  Sunday: [],
};

const defaultGoals = {
  calories: 0,
  protein: 0,
};

export default function useStorage(fn, items) {
  const isInitialRender = useIsInitialRender();

  const journalData = useRef(defaultJournalData);
  const goals = useRef(defaultGoals);

  useEffect(() => {
    const getData = async () => {
      const storedData = await storage.getItem("journalData", defaultJournalData);
      journalData.current = storedData;
    };

    getData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      await storage.setItem("journalData", items);
    };

    if (!isInitialRender) saveData();
  }, [items]);

  const updateData = async (key, items) => {
    await storage.setItem(key, items);
  };

  return { goals: goals.current, journalData: journalData.current, updateData };
}
