// export function DayTimeLine({ slots, day, i }) {
//   return (
//     <div
//       key={i}
//       style={{
//         flex: 1,
//         borderRight: "1px solid #ccc",
//         minWidth: "140px",
//         position: "relative",
//         height: "fit-content",
//       }}
//     >
//       <div
//         style={{
//           textAlign: "center",
//           padding: "10px",
//           borderBottom: "1px solid #ccc",
//           position: "sticky",
//           top: 0,
//           background: "white",
//           zIndex: 4,
//         }}
//       >
//         <strong>{day}</strong>
//       </div>
//       {hoursOfDay.map((hour) => (
//         <div
//           key={hour}
//           style={{
//             borderBottom: "1px solid #eee",
//             padding: "10px",
//             fontSize: "14px",
//             height: "60px",
//             zIndex: 5,
//           }}
//         >
//           {dayjs(hour, "HH:mm").format("h:mm a")}
//         </div>
//       ))}
//       {slots
//         .filter((slot) => daysOfWeek[slot.day] === day)
//         .map((slot) => {
//           const { top, height } = calculateEventStyle(slot);
//           return (
//             <ScheduleSlot
//               key={slot.title}
//               slot={slot}
//               top={top}
//               height={height}
//             />
//           );
//         })}
//     </div>
//   );
// }

// export function ScheduleSlot({ slot, top, height }) {
//   const style = {
//     position: "absolute",
//     top: `${top}px`,
//     left: 0,
//     right: 0,
//     height: `${height}px`,
//     background: getServiceColor(slot.service_type_id),
//     color: getServiceColor(slot.service_type_id),
//     padding: "10px",
//     borderRadius: "4px",
//     boxSizing: "border-box",
//     cursor: "pointer",
//   };
//   return (
//     <div key={slot.title} style={style} className="schedule-slot">
//       {slot.startTime} - {slot.endTime}
//     </div>
//   );
// }
