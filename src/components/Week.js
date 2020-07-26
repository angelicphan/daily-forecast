import React from "react";
import "../css/Week.css";
import Day from "./Day";

// This component is directly contained in the App Component,
// and will render the weather info of the week
class Week extends React.Component {
  // Constructor
  constructor(props) {
    super(props);
    this.state = {};
  }

  // ****************

  // Renders weather info for the week, creating a Day
  // component for each day given
  render() {
    const week = this.props.weekInfo;
    const days = week.map((step, day) => {
      const name = getDayOfWeek(week[day].dt);
      const date = getTheDate(week[day].dt);
      return (
        <div key={day} className="One-Day">
          <div>
            <Day dayInfo={week[day]} date={date} name={name}></Day>
          </div>
        </div>
      );
    });

    return <div>{days}</div>;
  }
}

export default Week;
// ******************************************************************

// This function will return the date of the given day as a string
// representing the month and day
function getTheDate(today) {
  const date = new Date(today * 1000);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return month + "/" + day;
}

// This function will return the name of the day of the week of the
// given day
function getDayOfWeek(today) {
  const Days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const date = new Date(today * 1000);
  const day = date.getUTCDay(today * 1000);
  return Days[day];
}
