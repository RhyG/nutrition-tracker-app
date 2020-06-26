import React, { createContext, useEffect, useState } from "react";
import storage from "../lib/async-storage";

const GoalContext = createContext();

const defaultGoals = {
  calories: 2000,
  protein: 100,
};

function GoalProvider({ children }) {
  const [goals, setGoals] = useState(defaultGoals);

  useEffect(() => {
    const getData = async () => {
      const storedData = await storage.getItem("goals", defaultGoals);
      setGoals(storedData);
    };

    getData();
  }, []);

  const updateGoals = async (newGoals) => {
    await storage.setItem("goals", newGoals);
    setGoals(newGoals);
  };

  return (
    <GoalContext.Provider
      value={{
        goals,
        updateGoals,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
}

const GoalConsumer = GoalContext.Consumer;

export { GoalProvider, GoalConsumer };
export default GoalContext;
