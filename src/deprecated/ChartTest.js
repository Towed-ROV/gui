// import React, { useEffect, useState } from "react";

// const ChartTest = ({ sensorData }) => {

//   const [chartData, setChartData] = useState([]);

//     useEffect(() => {
//         const newChartData = [...chartData];
//         sensorData.forEach((sensor) => {
//         if (sensor.name === "roll") {
//             sensor.time = new Date().getTime();
//             newChartData.push(sensor);
//         }
//         });
//         if (newChartData.length > 1000) {
//         newChartData.slice(0, 25);
//         }
//         setChartData(newChartData);
//   }, [sensorData]);

//   return (
//       <Flex>
//           <LineChart data={data}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="time"/>
//             <YAxis />
//             <Line type="monotone" dataKey="value" />
//         </LineChart>
//       </Flex>
//   );
// };

// export default ChartTest;
