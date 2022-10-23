import moment from "moment/moment";
import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

const initialState = {
  date: moment().toDate(),
};

export const ContextProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(initialState.date);
  const [scheduleObj, setScheduleObj] = useState(null);

  return (
    <StateContext.Provider
      value={{ selectedDate, setSelectedDate, scheduleObj, setScheduleObj }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
