import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarView({ onDateSelect }) {
  const [date, setDate] = useState(new Date());

  // Handle date change
  const handleChange = (newDate) => {
    setDate(newDate);

    // Send selected date to parent (optional future feature)
    if (onDateSelect) {
      onDateSelect(newDate);
    }
  };

  return (
    <div className="card calendar-card">

      <h2>🗓 Schedule Calendar</h2>

      <Calendar
        onChange={handleChange}
        value={date}
        className="custom-calendar"
      />

      <div className="selected-date">
        📌 Selected:{" "}
        <strong>{date.toDateString()}</strong>
      </div>

    </div>
  );
}