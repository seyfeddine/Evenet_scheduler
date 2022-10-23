import React, { useEffect } from "react";
import {
  ScheduleComponent,
  Day,
  Week,
  Inject,
  Resize,
  ViewsDirective,
  ViewDirective,
} from "@syncfusion/ej2-react-schedule";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { useState } from "react";
import moment from "moment/moment";
import { useStateContext } from "../contexts/ContextProvider";
import { loadCldr, L10n } from "@syncfusion/ej2-base";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import * as numberingSystems from "../../node_modules/cldr-data/supplemental/numberingSystems.json";
import * as gregorian from "../../node_modules/cldr-data/main/fr/ca-gregorian.json";
import * as numbers from "../../node_modules/cldr-data/main/fr/numbers.json";
import * as timeZoneNames from "../../node_modules/cldr-data/main/fr/timeZoneNames.json";

import * as uuid from "uuid";

import parseFormat from "moment-parseformat";

import frenchLangaugePack from "../internationalization/french";
import scheduleData from "../data/scheduleData";
loadCldr(numberingSystems, gregorian, numbers, timeZoneNames);
L10n.load(frenchLangaugePack);

const Scheduler = () => {
  const { selectedDate, scheduleObj, setScheduleObj } = useStateContext();
  const [modifiedData, setModifiedData] = useState([]);

  const popupOpen = (args) => {
    if (args.type === "Editor" || args.type === "QuickInfo") {
      args.duration = 5;
    } else if (args.type === "DeleteAlert") {
      // TODO: add the logic to delete from API HERE
      args.cancel = true;
      setModifiedData((oldData) =>
        oldData.filter((item) => item.Id !== args.data.Id)
      );
    }
  };

  const onAddClick = (props) => {
    const dateFormat = parseFormat(document.querySelector("#EndTime").value);
    let startDate = document.querySelector("#StartTime").value;
    let endDate = document.querySelector("#EndTime").value;
    let title = document.querySelector("#Summary").value;
    if (!startDate || !endDate) {
      alert("Précisez les dates de début et de fin S.V.P");
      return;
    }

    let startTime = moment(startDate, dateFormat);
    let endTime = moment(endDate, dateFormat);

    // TODO: add the logic to add to the API HERE

    setModifiedData((oldData) => [
      ...oldData,
      {
        Id: uuid.v1(),
        StartTime: startTime.add(1, "h").toISOString(),
        EndTime: endTime.add(1, "h").toISOString(),
        Subject: title || "sans titre",
      },
    ]);
    scheduleObj.closeEditor();
    scheduleObj.closeQuickInfoPopup();
  };
  const footerTemplate = (props) => {
    return (
      <div className="quick-info-footer">
        {props.elementType === "cell" ? (
          <div className="cell-footer">
            <ButtonComponent
              id="add"
              cssClass="e-flat"
              content="Ajouter"
              isPrimary={true}
              onClick={onAddClick}
            />
          </div>
        ) : (
          <div className="event-footer">
            <ButtonComponent id="delete" cssClass="e-flat" content="Delete" />
            <ButtonComponent
              id="more-details"
              cssClass="e-flat"
              content="More Details"
              isPrimary={true}
            />
          </div>
        )}
      </div>
    );
  };
  // in this fucntion we set the data as an object accepted by the component
  useEffect(() => {
    setModifiedData([]);
    scheduleData.forEach((value, index) => {
      let suffix = ".000Z";

      setModifiedData((oldValue) => [
        ...oldValue,
        {
          Id: uuid.v1(),
          Subject: value.subject || "Ajouter un titre",
          StartTime: moment(value.day + "T" + value.start + suffix)
            .toDate()
            .toISOString(),
          EndTime: moment(value.day + "T" + value.end + suffix)
            .toDate()
            .toISOString(),
        },
      ]);
    });
  }, []);

  const editorTemplate = (props) => {
    return props !== undefined ? (
      <table
        className="custom-event-editor"
        style={{ width: "100%", cellpadding: "5" }}
      >
        <tbody>
          <tr>
            <td className="e-textlabel">Titre</td>
            <td colSpan={4}>
              <input
                id="Summary"
                className="e-field e-input"
                type="text"
                name="Subject"
                style={{ width: "100%" }}
              />
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">De</td>
            <td colSpan={4}>
              <DateTimePickerComponent
                onChange={(props) => {
                  const dateFormat = parseFormat(
                    document.querySelector("#EndTime").value
                  );
                  let startTime = moment(props.value);
                  let endTime = moment(
                    document.querySelector("#EndTime").value,
                    dateFormat
                  );

                  if (startTime.diff(endTime) >= 0) {
                    // if the start time is after the end time
                    endTime = startTime.add(5, "minutes");
                    let newValue = endTime.format(dateFormat);
                    document.querySelector("#EndTime").value = newValue;
                  }
                }}
                step={5}
                format="dd/MM/yy hh:mm a"
                id="StartTime"
                data-name="StartTime"
                value={new Date(props.startTime || props.StartTime)}
                className="e-field"
              ></DateTimePickerComponent>
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">Au</td>
            <td colSpan={4}>
              <DateTimePickerComponent
                onChange={(props) => {
                  const dateFormat = parseFormat(
                    document.querySelector("#StartTime").value
                  );
                  let endTime = moment(props.value);
                  let startTime = moment(
                    document.querySelector("#StartTime").value,
                    dateFormat
                  );

                  if (endTime.diff(endTime) <= 0) {
                    // if the end time is before the start
                    startTime = endTime.add(-5, "minutes");
                    let newValue = startTime.format(dateFormat);
                    document.querySelector("#StartTime").value = newValue;
                  }
                }}
                step={5}
                format="dd/MM/yy hh:mm a"
                id="EndTime"
                data-name="EndTime"
                value={new Date(props.endTime || props.EndTime)}
                className="e-field"
              ></DateTimePickerComponent>
            </td>
          </tr>
        </tbody>
      </table>
    ) : (
      <div></div>
    );
  };
  const eventRendered = (props) => {
    if (props.data.CategoryColor !== null)
      props.element.style.backgroundColor = "#CC4455";
  };

  return (
    <ScheduleComponent
      ref={(t) => {
        setScheduleObj(t);
      }}
      timeScale={{ enable: true, slotCount: 2 }}
      allowMultiRowSelection
      locale="fr"
      startHour="0:00"
      endHour="0:00"
      height="650px"
      eventSettings={{
        dataSource: modifiedData,
        allowAdding: true,
        allowEditing: false,
        allowDeleting: true,
      }}
      selectedDate={selectedDate}
      timezone="UTC+1"
      editorTemplate={editorTemplate}
      quickInfoTemplates={{
        content: editorTemplate,
        footer: footerTemplate,
        templateType: "Cell",
      }}
      quickInfoTemplatesContent={editorTemplate}
      eventRendered={eventRendered}
      popupOpen={popupOpen}
    >
      <ViewsDirective>
        <ViewDirective option="Day" />
        <ViewDirective option="Week" />
      </ViewsDirective>
      <Inject services={[Day, Week, Resize]} />
    </ScheduleComponent>
  );
};

export default Scheduler;
