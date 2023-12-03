import { useEffect, useState } from "react"
import { useParams } from "react-router"
import axios from "axios"
import { Line } from 'react-chartjs-2';



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
      setCustomerInterest(response.data.interest_over_time);
      setKeywords(response.data.keywords)   
      console.log(response.data)   
    }, (error) => {
      console.log(error)
    })
  }, [ideaid])
  

  


  return (
    <section>
      <div className="text-2xl font-bold mb-4">Market Insight for Idea {ideaid}</div>
      <section className="flex">
        <div>
          Competitors in the Market
          <div className="border rounded-md mb-4 mr-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employees</th>
                </tr>
              </thead>
              <tbody>
                {competitors.map((competitor, index) => (
                  <tr key={index} className={(index % 2 === 0) ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">{competitor.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{competitor.revenue}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{competitor.employees}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          Domain Traffic
          <div className="border rounded-md mb-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visits</th>

                </tr>
              </thead>
              <tbody>
                {traffic.map((trafficData, index) => (
                  <tr key={index} className={(index % 2 === 0) ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">{trafficData.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{trafficData.visits}</td>

                  </tr>
                ))}
              </tbody>
            </table>

          </div>

        </div>
      </section>
      <section>
        
      </section>


    </section>
  )
}

