import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState} from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";
import Kanban from "./Kanban";

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

function App() {
    let navigate = useNavigate();
    function handleClick(calevent){
        navigate(`/events/${calevent._id}`)
    }
    const [initialState, setInitialState] = useState();
    useEffect(()=>{
      fetch('/api').then(res=>{
          if(res.ok){
            let json = res.json()
            return json;
        }
      }).then(jsonResponse => setInitialState(jsonResponse))
  }, [])

    return (
        <div className="App">
            <Calendar
                onSelectEvent={handleClick}
                localizer={localizer}
                events={initialState}
                startAccessor="start"
                endAccessor="end"
                titleAccessor="title"
                style={{ height: 700, margin: "50px" }}
            />
        </div>
    );
}

export default App;

// const events = [
//     {
//         title: "Big Meeting",
//         allDay: true,
//         start: new Date(2021, 6, 0),
//         end: new Date(2021, 6, 0),
//     },
//     {
//         title: "Vacation",
//         start: new Date(2022, 11, 24),
//         end: new Date(2022, 11, 25),
//     },
//     {
//         title: "Conference",
//         start: new Date(2021, 6, 20),
//         end: new Date(2021, 6, 23),
//     },
// ];


    //const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    // const [allEvents, setAllEvents] = useState(events);


    // <h1>Calendar</h1>
    // <h2>Add New Event</h2>
    // <div>
    //     <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
    //     <DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
    //     <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
    //     <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
    //         Add Event
    //     </button>
    // </div>


    // function handleAddEvent() {
        
    //     for (let i=0; i<allEvents.length; i++){

    //         const d1 = new Date (allEvents[i].start);
    //         const d2 = new Date(newEvent.start);
    //         const d3 = new Date(allEvents[i].end);
    //         const d4 = new Date(newEvent.end);

    //         if (
    //           ( (d1  <= d2) && (d2 <= d3) ) || ( (d1  <= d4) &&
    //             (d4 <= d3) )
    //           )
    //         {   
    //             alert("CLASH"); 
    //             break;
    //          }    
    //     }               
    //     setAllEvents([...allEvents, newEvent]);
    // }