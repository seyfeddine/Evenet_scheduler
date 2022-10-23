# Getting Started with The project

## Instalation

after downloading the project run **_`npm install`_**

## Start the local server

### **_`npm start`_**

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Data Structure accepted by the component

this is the parsed data passed to the Scheduler.jsx component you must make the apropriate modifications to achieve the structure below.

```javascript
    {
      Id: index + 1, // YOU MUST PROVIDE AN ID FOR EVERY ITEM
          Subject: value.subject || "Add title", // THE TITLE OF THE EVENT
          Location: value.location || "", // LOCATION OF THE EVENT
          StartTime: moment(
            value.day + "T" + value.start + ".000Z"
          ).toISOString(), // STARTING TIME OF THE EVENT
          EndTime: moment(value.day + "T" + value.end + ".000Z").toISOString(), // ENDING TIME OF THE EVENT
    }
```
