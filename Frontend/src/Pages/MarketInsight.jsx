import { useEffect, useState } from "react"
import { useParams } from "react-router"
import axios from "axios"
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js'
import Navbar from "../components/Layout/Navbar";
import 'chartjs-adapter-date-fns';
import { enUS } from 'date-fns/locale';

ChartJS.register(
  CategoryScale, LinearScale, BarElement, PointElement, LineElement, TimeScale, Title, Tooltip, Legend
);


export default function MarketInsight() {
  const { ideaid } = useParams();
  const [competitors, setCompetitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customerInterest, setCustomerInterest] = useState({});


  useEffect(() => {
    axios.post(`http://localhost:8000/get_insights`, {
      idea_id: ideaid
    }
    ).then((response) => {
      console.log(response.data);
      setCompetitors(response.data.competitors);
      const result_df = response.data.interest_over_time;
      const parsedResult = JSON.parse(result_df);
      console.log(parsedResult);

      
      if (parsedResult && parsedResult.sum_frequency) {
        // Extract data from the parsed result
        const sumFrequencyData = parsedResult.sum_frequency;
  
        // Convert Unix timestamps to a readable date format
        const dates = Object.keys(sumFrequencyData).map((timestamp) => new Date(Number(timestamp)).toLocaleDateString());
        console.log(dates)
        const data = {
          labels: dates,
          datasets: [
            {
              label: 'Customer Interest Trends',
              data: Object.values(sumFrequencyData),
              fill: false,
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 2,
            },
          ],
        };
  
        setCustomerInterest(data);
      }
      setLoading(false);

    }, (error) => {
      console.log(error)
    })

    



  }, [ideaid])

  const barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Customer Interest',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
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
      x: {
                
      },
      y: {
        beginAtZero: true,
      },
    },
  };




  return ( loading ? (
    <h1>Loading Market Insights</h1>
  ) :  (
    <div className="bg-[#efefef] flex flex-col p-4">
      <Navbar link={"/dashboard"} />
      <header className="bg-gray-500 text-white p-4 rounded-lg">
        <h1 className="text-2xl font-bold">Market Insights for Idea {ideaid} </h1>
      </header>


      <main className="flex-1 p-4">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          <div className="bg-gray-200 p-6 rounded-md shadow-md">
            <h2 className="text-black text-lg font-semibold mb-2">Competitors</h2>
            <div className="competitors-list-container max-h-48 overflow-y-auto">
              <ul className="list-none p-0">
                {competitors.map((competitor, index) => (
                  <li key={index} className="border border-gray-500 p-2 mb-2 rounded-lg">
                    {competitor}
                  </li>
                ))}
              </ul>
            </div>
          </div>


          <div className="bg-gray-200 p-6 rounded-md shadow-md">
            <h2 className="text-black text-lg font-semibold mb-2">Market Size</h2>
            <p className="text-black text-3xl font-bold">$5,678</p>
          </div>


          <div className="bg-gray-200 p-6 rounded-md shadow-md">
            <h2 className="text-black text-lg font-semibold mb-2">Market Growth</h2>
            <p className="text-black text-3xl font-bold">6,789</p>
          </div>


          <div className="bg-gray-200 p-6 rounded-md shadow-md">
            <h2 className="text-black text-lg font-semibold mb-2">Return of Investment</h2>
            <p className="text-black text-3xl font-bold">789</p>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">

          <div className=" bg-gray-200 p-6 rounded-md shadow-md">
            <h2 className="text-black text-lg font-semibold mb-4">Domain Traffic</h2>
            <Bar data={barChartData} options={barChartOptions} />
          </div>


          <div className="bg-gray-200 p-6 rounded-md shadow-md">
            <h2 className="text-black text-lg font-semibold mb-4">Customer Interest Trends</h2>
            <Line data={customerInterest} options={lineChartOptions} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">

          <div className=" bg-gray-200 p-6 rounded-md shadow-md">
            <h2 className="text-black text-lg font-semibold mb-4">Flowchart Images</h2>
          </div>


          <div className="bg-gray-200 p-6 rounded-md shadow-md">
            <h2 className="text-black text-lg font-semibold mb-4">TAM & SAM</h2>
          </div>
        </div>

      </main>
    </div>
  ))
}

