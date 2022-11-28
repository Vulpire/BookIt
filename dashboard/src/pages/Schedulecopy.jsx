import React, { useEffect, useState} from 'react'
import { Navbar, Footer, Sidebar} from '../components'; 
import { useStateContext } from '../contexts/ContextProvider';
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { useNavigate } from "react-router-dom";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../App.css";
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

const Groups = () => {
    const { currentMode, activeMenu} = useStateContext();
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
    <div>
        <div className="flex relative dark:bg-main-dark-bg">
          {/* <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            
          </div> */}
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
            <div
                className={
                    activeMenu
                    ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                    : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
                }
            >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                <Navbar />
            </div>
            
            {/* page content */}
            <div className="App">
            <Calendar
                onSelectEvent={handleClick}
                localizer={localizer}
                events={initialState}
                startAccessor="start"
                endAccessor="end"
                titleAccessor="title"
                views={["month", "agenda"]}
                style={{ height: 700, margin: "50px" }}
                messages={{agenda:"Table", month:"Calendar"}}
            />
            </div>

            {/* footer */}
            <Footer />
          </div>
        </div>
    </div>
  )
}

export default Groups