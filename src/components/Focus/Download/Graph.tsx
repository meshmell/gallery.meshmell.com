import moment from "moment";
import { useEffect, useState } from "react";
import { AreaChart, Area, ResponsiveContainer, Tooltip, CartesianGrid, XAxis, YAxis } from "recharts";

import { getDownloadSum } from "@/src/utils/getDownloadSum";

export const transformData = (rawData: Record<string, { timeStamp: number }>): { date: string, downloadCount: number }[] => {
  const countsByDate: Record<string, number> = {};

  Object.values(rawData).forEach(value => {
    const date = new Date(value.timeStamp).toLocaleDateString();
    countsByDate[date] = (countsByDate[date] || 0) + 1;
  });

  return Object.entries(countsByDate).map(([date, downloadCount]) => ({ date, downloadCount }));
};

type DownloadData = {
  date: string;
  downloadCount: number;
}

const DownloadGraph = ({ focusedModelsDownloadData }: any) => {
  const [formattedData, setFormattedData] = useState<DownloadData[]>([]);

  useEffect(() => {
    const data = transformData(focusedModelsDownloadData);
    setFormattedData(data);
  }, [focusedModelsDownloadData]);

  if (formattedData.length === 0) {
    return null;
  }

  return (
    <div className="relative flex flex-col justify-center mx-auto w-[280px] sm:w-[330px] h-[200px]">
      <div className="text-center text-lg font-medium">Downloads: {getDownloadSum(focusedModelsDownloadData)}</div>
      <ResponsiveContainer
        width="100%"
        height={100}
        className='flex justify-center items-center'
      >
        <AreaChart
          data={formattedData}
          height={100}
          margin={{
            top: 5,
            right: 25,
            left: -30,
            bottom: 0,
          }}
        >
          <CartesianGrid opacity={0.1} vertical={false} />
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tickFormatter={() => ""}
            tick={{ fontSize: "12px" }}
          />
          <YAxis
            tickFormatter={(value) => value.toFixed(0)}
            tickCount={3}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="downloadCount" stroke="#8884d8" strokeWidth={2} fillOpacity={1} fill="url(#color)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active) {
    return (
      <div className="bg-white p-2 rounded-md shadow-md absolute mx-[65px] w-[200px] h-[70px] left-1/2 top-1/2 transform translate-y-[130%]">
        <p className="text-gray-500 text-lg">{`${moment(label).format("YYYY-MM-DD")}`}</p>
        <p className="text-orange-400 text-base font-bold">{`Unique downloads: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
}

export default DownloadGraph;
