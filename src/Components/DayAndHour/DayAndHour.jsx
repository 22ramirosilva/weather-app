import React, { useEffect, useState } from "react";

const days = ["Dom", "Lun", "Mar", "Mier", "Jue", "Vie", "Sab"];

const DayAndHour = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <>
        {days[date.getDay()]}, {date.toLocaleTimeString()}
      </>
    </div>
  );
};

export default DayAndHour;
