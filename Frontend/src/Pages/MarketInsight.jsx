import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Line, Bar, Pie } from "react-chartjs-2";
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
  ArcElement,
} from "chart.js";
import Navbar from "../components/Layout/Navbar";
import "chartjs-adapter-date-fns";
//import { enUS } from 'date-fns/locale';
import Lottie from "lottie-react";
import animationData from "../assets/animations/MarketInsight.json";
import randomcolor from 'randomcolor';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
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
  const [competitorChart, setCompetitorChart] = useState({});
  const [images, setImages] = useState([]);

  function parseRevenue(revenueString) {
    // Remove commas
    const withoutCommas = revenueString.replace(/,/g, '');

    // Extract numerical part
    const numericPart = withoutCommas.slice(1, -1);
    console.log(numericPart);
    // Convert to numeric value based on the last character (B, M, K)
    const multiplier = {
      'B': 1e9,
      'M': 1e6,
      'K': 1e3,
    }[withoutCommas.slice(-1).toUpperCase()] || 1;
    console.log(multiplier);
    console.log(parseFloat(numericPart));
    return parseFloat(numericPart) * multiplier;
  };

  useEffect(() => {
    axios
      .post(`http://localhost:8000/get_insights`, {
        userid: localStorage.getItem("ideagen_user_id"),
        ideaid: ideaid,
      })
      .then(
        (response) => {
          console.log(response.data);
          setCompetitors(response.data.competitors);
          setTables(response.data.tables);
          setImages(response.data.images);

          const revenueStrings = response.data.competitor_revenue;
          const revenueData = revenueStrings.map(parseRevenue);
          console.log(revenueData);
          const competitorData = response.data.competitors
          const competitorLength = response.data.competitors.length
          const CompetitorChartData = {
            labels: competitorData || [],
            datasets: [{
              data: revenueData || [],
              backgroundColor: randomcolor({ count: competitorLength }) || [],
            }],
          };

          
          setCompetitorChart(CompetitorChartData);
          

          const result_df = response.data.interest_over_time;
          const parsedResult = JSON.parse(result_df);

          if (parsedResult && parsedResult.sum_frequency) {
            // Extract data from the parsed result
            const sumFrequencyData = parsedResult.sum_frequency;

            // Convert Unix timestamps to a readable date format
            const dates = Object.keys(sumFrequencyData).map((timestamp) =>
              new Date(Number(timestamp)).toLocaleDateString()
            );

            const customerInterestData = {
              labels: dates || [],
              datasets: [
                {
                  label: "Customer Interest Trends",
                  data: Object.values(sumFrequencyData) || [],
                  fill: false,
                  borderColor: "rgba(75,192,192,1)",
                  borderWidth: 2,
                },
              ],
            };

            setCustomerInterest(customerInterestData);
            //setCustomerInterestLoading(false);
          }


          setCompetitorChart(CompetitorChartData);
          //setCompetitorChartLoading(false);
          setLoading(false);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [ideaid]);


  const lineChartOptions = {
    scales: {
      x: {
      },
      y: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false,
  };

  const pieChartOptions = {
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          fontSize: 14,
          padding: 10,
        }
      }
    },
    maintainAspectRatio: false

  };

  return loading ? (
    <div className="bg-[#efefef] min-h-screen flex items-center justify-center">
      <main className="bg-[#efefef] flex flex-col w-full">
        <Navbar link={"/dashboard"} noBurger={true} />
        <header className="bg-gray-500 text-white m-2 p-4 rounded-lg">
          <h1 className="text-2xl font-bold text-center">
            Market Insights for Idea {ideaid}
          </h1>
        </header>
        <div className="flex flex-col items-center p-4">
          <h1 className="text-3xl font-semibold my-4 text-center">Loading Market Insights</h1>
          <Lottie
            className="w-full lg:w-1/2 xl:w-[40%]"
            animationData={animationData}
          />
        </div>
      </main>
    </div>
  ) : (
    <div className="bg-[#efefef] flex flex-col">
      <Navbar link={"/dashboard"} noBurger={true} />
      <header className="bg-gray-500 text-white m-2 p-4 rounded-lg">
        <h1 className="text-2xl font-bold">
          Market Insights for Idea {ideaid}{" "}
        </h1>
      </header>

      <main className="flex-1 p-4">
        {tables.length > 0 && tables[0].length > 0 &&
          <div >
            <div className="bg-gray-200 p-6 rounded-md shadow-md relative mb-4">
              <div className="antialiased bg-[#efefef] text-gray-600 h-full rounded-lg mb-5">
                <div className="flex flex-col justify-center h-full">
                  <div className="w-full mx-auto bg-[#efefef] shadow-lg rounded-lg border border-gray-200 h-full">
                    <div className="p-3 h-full">
                      <div className="overflow-x-auto h-full">

                        <table className="table-auto w-full h-full">
                          <thead className="text-xs font-semibold uppercase text-gray-400 bg-[#efefef]">
                            <tr>
                              {tables.length > 0 && tables[0].length > 0 &&
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
                            {tables.length > 0 && tables[0].slice(1).map((row, rowIndex) => (
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
                Source: Future Market Insights
              </p>
            </div>
          </div>
        }

        {customerInterest && (
          <div className="bg-gray-200 pb-8 pt-4 pl-4 pr-4 rounded-md shadow-md mb-4 h-96">
            <h2 className="text-black text-lg font-semibold">
              Customer Interest Trends
            </h2>

            <Line data={customerInterest} options={lineChartOptions} />


          </div>
        )}

        {competitors && competitors.length > 0 && (
          <div className=" bg-gray-200 p-10 rounded-md mb-4 shadow-md h-96">
            <h2 className="text-black text-lg font-semibold">
              Competitors in the Market
            </h2>

            <Pie data={competitorChart} options={pieChartOptions} />


          </div>
        )}


        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">

          {images.length > 0 && images.slice(0, 2).map((image, index) => (
            <div key={index} className=" bg-gray-200 p-6 rounded-md shadow-md mb-4">
              <img
                src={image}
                alt={`Market Insights`}
                className="rounded-lg w-full h-full"

              />
            </div>
          ))}


        </div>




      </main>
    </div>
  );
}