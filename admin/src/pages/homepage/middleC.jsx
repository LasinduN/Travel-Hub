import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Nov",
    Colombo: 2400,
    Kandy: 2600,
    Galle: 3400,
    Jaffna: 6369,
  },
  {
    name: "Dec",
    Colombo: 3400,
    Kandy: 2550,
    Galle: 1400,
    Jaffna: 4529,
  },
  {
    name: "Jan",
    Colombo: 1800,
    Kandy: 2800,
    Galle: 4400,
    Jaffna: 1869,
  },
  {
    name: "Feb",
    Colombo: 4580,
    Kandy: 2300,
    Galle: 2400,
    Jaffna: 2454,
  },
  {
    name: "Mar",
    Colombo: 4500,
    Kandy: 6400,
    Galle: 2800,
    Jaffna: 3389,
  },
  {
    name: "Apr",
    Colombo: 4000,
    Kandy: 2400,
    Galle: 2400,
    Jaffna: 4555,
  },
  {
    name: "May",
    Colombo: 3000,
    Kandy: 1398,
    Galle: 2210,
    Jaffna: 3339,
  },
  {
    name: "Jun",
    Colombo: 2000,
    Kandy: 6800,
    Galle: 2290,
    Jaffna: 2339,
  },
  {
    name: "Jul",
    Colombo: 2780,
    Kandy: 3908,
    Galle: 2000,
    Jaffna: 1111,
  },
  {
    name: "Aug",
    Colombo: 1890,
    Kandy: 4800,
    Galle: 2181,
    Jaffna: 4555,
  },
  {
    name: "Sep",
    Colombo: 2390,
    Kandy: 3800,
    Galle: 2500,
    Jaffna: 4539,
  },
  {
    name: "Oct",
    Colombo: 3490,
    Kandy: 4300,
    Galle: 2100,
    Jaffna: 6369,
  },
];

function MiddleC() {
  return (
    <div className="w-full h-full bg-gray-200 rounded-[10px] ">
      <div className="flex flex-col w-full h-full pl-2 pr-2">
        <div className="flex flex-col items-center">
          <div className="font-tinos font-semibold text-lg text-gray-700 text-center">
            Most Profit Routes (Sri Lanka)
          </div>
          <div className="bg-gray-400 h-[1px] w-[20%] relative mb-2">
            <div className="absolute w-[8px] h-[8px] bg-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-gray-400" />
          </div>
        </div>
        <div className="w-full h-full pr-2">
          <ResponsiveContainer width="100%" height={165}>
            <LineChart data={data}>
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis
                dataKey="name"
                fontSize={11}
                style={{ fontFamily: "roboto", fontWeight: "300" }}
              />
              <YAxis
                type="number"
                domain={["dataMin - 100", "dataMax + 40"]}
                fontSize={12}
                width={40}
                tickCount={8}
                style={{ fontFamily: "roboto", fontWeight: "300" }}
              />
              <Tooltip />
              <Legend
                iconType="plainline"
                verticalAlign="top"
                height={30}
                wrapperStyle={{ fontSize: "12px", fontFamily: "roboto" }}
              />
              <Line
                dataKey="Colombo"
                stroke="#002147"
                dot={false}
                strokeWidth={2}
              />
              <Line
                dataKey="Kandy"
                stroke="#7A0736"
                dot={false}
                strokeWidth={2}
              />
              <Line
                dataKey="Galle"
                stroke="#028C98"
                dot={false}
                strokeWidth={2}
              />
              <Line
                dataKey="Jaffna"
                stroke="#E3AC2E"
                dot={false}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default MiddleC;
