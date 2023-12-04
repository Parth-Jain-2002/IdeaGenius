import { useEffect, useState } from "react"
import { useParams } from "react-router"
import axios from "axios"
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js'
import Navbar from "../components/Layout/Navbar";

ChartJS.register(
  CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend 
);


export default function MarketInsight() {
  const { ideaid } = useParams();
  const [competitors, setCompetitors] = useState([]);
  const [traffic, setTraffic] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customerInterest, setCustomerInterest] = useState([]);
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    axios.post(`http://localhost:8000/get_insights`, {
      idea_id: ideaid
    }
    ).then((response) => {
      setCompetitors(response.data.competitors);
      setTraffic(response.data.trafficData);
      // setCustomerInterest(response.data.interest_over_time);
      // setKeywords(response.data.keywords)   
      console.log(response.data)
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

  // Data for Line Chart
  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Domain Traffic',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const lineChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };




  return (
    <div className="bg-[#efefef] flex flex-col p-4">
      <Navbar link={"/dashboard"}/>
      <header className="bg-gray-500 text-white p-4 rounded-lg">
        <h1 className="text-2xl font-bold">Market Insights for Idea {ideaid} </h1>
      </header>

     
      <main className="flex-1 p-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-gray-200 p-6 rounded-md shadow-md">
            <h2 className="text-black text-lg font-semibold mb-2">Competitors</h2>
            <p className="text-black text-3xl font-bold">1,234</p>
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
            <h2 className="text-black text-lg font-semibold mb-4">Customer Interest Trends</h2>
            <Bar data={barChartData} options={barChartOptions} />
          </div>

          
          <div className="bg-gray-200 p-6 rounded-md shadow-md">
            <h2 className="text-black text-lg font-semibold mb-4">Domain Traffic</h2>
            <Line data={lineChartData} options={lineChartOptions} />
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
  )
}

