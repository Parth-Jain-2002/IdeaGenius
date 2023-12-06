import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import Navbar from "../components/Layout/Navbar";
import "chartjs-adapter-date-fns";
//import { enUS } from 'date-fns/locale';
import Lottie from "lottie-react";
import animationData from "../assets/animations/MarketInsight.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend
);

export default function MarketInsight() {
  const { ideaid } = useParams();
  const [competitors, setCompetitors] = useState([]);
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customerInterest, setCustomerInterest] = useState({});

  useEffect(() => {
    axios
      .post(`http://localhost:8000/get_insights`, {
        idea_id: ideaid,
      })
      .then(
        (response) => {
          console.log(response.data);
          setCompetitors(response.data.competitors);
          setTables(response.data.tables);
          const result_df = response.data.interest_over_time;
          const parsedResult = JSON.parse(result_df);
          console.log(parsedResult);

          if (parsedResult && parsedResult.sum_frequency) {
            // Extract data from the parsed result
            const sumFrequencyData = parsedResult.sum_frequency;

            // Convert Unix timestamps to a readable date format
            const dates = Object.keys(sumFrequencyData).map((timestamp) =>
              new Date(Number(timestamp)).toLocaleDateString()
            );
            console.log(dates);
            const data = {
              labels: dates,
              datasets: [
                {
                  label: "Customer Interest Trends",
                  data: Object.values(sumFrequencyData),
                  fill: false,
                  borderColor: "rgba(75,192,192,1)",
                  borderWidth: 2,
                },
              ],
            };

            setCustomerInterest(data);
          }
          setLoading(false);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [ideaid]);

  const barChartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Customer Interest",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const lineChartOptions = {
    scales: {
      x: {},
      y: {
        beginAtZero: true,
      },
    },
  };

  return loading ? (
    <div className="bg-[#efefef] min-h-screen flex items-center justify-center">
      <main className="bg-[#efefef] flex flex-col p-4 w-full">
        <Navbar link={"/dashboard"} />
        <header className="bg-gray-500 text-white p-4 rounded-lg">
          <h1 className="text-2xl font-bold">
            Market Insights for Idea {ideaid}
          </h1>
        </header>
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold my-4">Loading Market Insights</h1>
          <Lottie
            className="w-full lg:w-1/2 xl:w-[40%]"
            animationData={animationData}
          />
        </div>
      </main>
    </div>
  ) : (
    <div className="bg-[#efefef] flex flex-col p-4">
      <Navbar link={"/dashboard"} />
      <header className="bg-gray-500 text-white p-4 rounded-lg">
        <h1 className="text-2xl font-bold">
          Market Insights for Idea {ideaid}{" "}
        </h1>
      </header>

      <main className="flex-1 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-200 p-6 rounded-md shadow-md md:col-span-1 lg:col-span-1">
            <h2 className="text-black text-lg font-semibold mb-2">
              Competitors
            </h2>
            <div className="competitors-list-container max-h-48 overflow-y-auto">
              <ul className="list-none p-0">
                {competitors.map((competitor, index) => (
                  <li
                    key={index}
                    className="border border-gray-500 p-2 mb-2 rounded-lg"
                  >
                    {competitor}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-gray-200 p-6 rounded-md shadow-md md:col-span-2 lg:col-span-2 relative">
            <div className="antialiased bg-[#efefef] text-gray-600 h-full rounded-lg mb-5">
              <div className="flex flex-col justify-center h-full">
                <div className="w-full mx-auto bg-[#efefef] shadow-lg rounded-lg border border-gray-200 h-full">
                  <div className="p-3 h-full">
                    <div className="overflow-x-auto h-full">
                      <table className="table-auto w-full h-full">
                        <thead className="text-xs font-semibold uppercase text-gray-400 bg-[#efefef]">
                          <tr>
                            {tables[0].length > 0 &&
                              tables[0][0].map((header, index) => (
                                <th
                                  key={index}
                                  className="p-2 whitespace-nowrap"
                                >
                                  <div className="font-semibold text-left">
                                    {header}
                                  </div>
                                </th>
                              ))}
                          </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-100">
                          {tables[0].slice(1).map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              {row.map((cell, cellIndex) => (
                                <td
                                  key={cellIndex}
                                  className="p-2 whitespace-nowrap"
                                >
                                  <div className="flex items-center">
                                    <div className="font-medium text-gray-800">
                                      {cell}
                                    </div>
                                  </div>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="absolute text-sm bottom-0 right-0 mb-1 mr-2 text-m text-gray-500">
              source: Future Market Insights
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className=" bg-gray-200 p-6 rounded-md shadow-md">
            <h2 className="text-black text-lg font-semibold mb-4">
              Domain Traffic
            </h2>
          </div>

          <div className="bg-gray-200 p-6 rounded-md shadow-md">
            <h2 className="text-black text-lg font-semibold mb-4">
              Customer Interest Trends
            </h2>
            <Line data={customerInterest} options={lineChartOptions} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className=" bg-gray-200 p-6 rounded-md shadow-md">
            <h2 className="text-black text-lg font-semibold mb-4">
              Flowchart Images
            </h2>
          </div>

          <div className="bg-gray-200 p-6 rounded-md shadow-md">
            <h2 className="text-black text-lg font-semibold mb-4">TAM & SAM</h2>
          </div>
        </div>
      </main>
    </div>
  );
}
