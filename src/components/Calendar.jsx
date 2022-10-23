import React from "react";
import { CalendarComponent } from "@syncfusion/ej2-react-calendars";
import { useStateContext } from "../contexts/ContextProvider";
import moment from "moment/moment";

import { loadCldr, L10n } from "@syncfusion/ej2-base";

import * as numberingSystems from "../../node_modules/cldr-data/supplemental/numberingSystems.json";
import * as gregorian from "../../node_modules/cldr-data/main/fr/ca-gregorian.json";
import * as numbers from "../../node_modules/cldr-data/main/fr/numbers.json";
import * as timeZoneNames from "../../node_modules/cldr-data/main/fr/timeZoneNames.json";
import frenchLangaugePack from "../internationalization/french";

loadCldr(numberingSystems, gregorian, numbers, timeZoneNames);
L10n.load(frenchLangaugePack);

const Calendar = () => {
  const { setSelectedDate } = useStateContext();
  const onChange = (props) => {
    setSelectedDate(moment(props.value).toDate());
  };

  return <CalendarComponent change={onChange} locale="fr" />;
};

export default Calendar;
