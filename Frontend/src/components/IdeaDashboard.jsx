import axios from "axios";
import React, { useState, useEffect } from "react";
import chatIcon from "../assets/images/chat_icon.png";
import { useNavigate } from "react-router-dom";
import PeopleCard from "../components/PeopleCard";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

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


const IdeaDashboard = ({ topicid }) => {
  const [topicDetails, setTopicDetails] = useState([]);
  const [peopleData, setPeopleData] = useState([{}]);


  const [competitors, setCompetitors] = useState([]);
  const [tables, setTables] = useState([]);

  const [customerInterest, setCustomerInterest] = useState({});
  const [competitorChart, setCompetitorChart] = useState({});
  const [competitorChartLoading, setCompetitorChartLoading] = useState(true);
  const [customerInterestLoading, setCustomerInterestLoading] = useState(true);

  const [images, setImages] = useState([]);
  const lineChartOptions = {
    scales: {
      x: {},
      y: {
        beginAtZero: true,
      },
    },
  };

  const navigate = useNavigate();

  const parseRevenue = (revenueString) => {
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
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const capitalizeWords = (str) => {
    if (!str) {
      return '';
    }
    return str.split(' ').map(word => capitalizeFirstLetter(word)).join(' ');
  };

  const getPeople = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/get_recommended_people`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ideaid: topicid,
          }),
        }
      );

      const data = await response.json();
      // console.log(data.response);
      return data.response;
    } catch (error) {
      console.log(error);
    }
  };
  const getPeeps = async () => {
    try {
      const data = await getPeople();
      const top3People = data.slice(0, 3); // Get the first 3 elements

      setPeopleData(top3People);

      // console.log("ideaid: ", ideaid);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getTopics = () => {
    axios
      .get(`http://localhost:8000/get_topic`, {
        params: {
          userid: localStorage.getItem("ideagen_user_id"),
          topicid: topicid,
        },
      })
      .then(
        (response) => {
          //console.log("response:", response.data);
          setTopicDetails(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
  };



  const getInsights = () => {
    axios
      .post(`http://localhost:8000/get_insights`, {
        userid: localStorage.getItem("ideagen_user_id"),
        ideaid: topicid,
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
            setCustomerInterestLoading(false);
          }


          setCompetitorChart(CompetitorChartData);
          setCompetitorChartLoading(false);


        },
        (error) => {
          console.log(error);
        }
      );
  }

  useEffect(() => {
    getTopics();
    getPeeps();
    getInsights();



  }, [topicid]);

  const handleIdeaGeneration = () => {
    navigate(`../idea/${topicid}`);
  }
  const handleIdeaRefinement = () => {
    navigate(`../vision-doc/${topicid}`);
  }

  const exploreMarketInsight = () => {
    navigate(`/market-insight/${topicid}`)
  }

  const explorePeople = () => {
    navigate(`/people/${topicid}`);
  }

  return (
    <div className="w-full h-full p-4">
      <div className="flex items-center justify-between px-10 py-4 dark:bg-gray-900 rounded-3xl border-2 border-sky-200 shadow-lg bg-blue-100">
        <div className=" flex flex-col justify-between w-full">
          <div className="flex flex-col">
            <div className="flex flex-row justify-between mb-1">
              <h3 className="text-2xl font-semibold">{capitalizeWords(topicid)}</h3>
              <div className="self-end items-center hover:bg-blue-300 flex flex-row bg-white px-2 rounded-lg">
                {" "}
                <img src={chatIcon} alt="chat icon" className="h-4 w-4 ml-2 " />
                {topicDetails.generated ? (
                  <button
                    onClick={() => {
                      handleIdeaRefinement();
                    }}
                    className="px-2 py-1 font-semibold text-black"
                  >
                    Refine Idea
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleIdeaGeneration();
                    }}
                    className="px-2 py-2 font-bold text-gray-700 rounded-lg"
                  >
                    Generate Idea
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-row p-1">
              <p className="text-gray-600 text-base ">
                {capitalizeWords(topicDetails.description)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full mt-6">
        <div className="w-2/3 h-full flex flex-col gap-2 rounded-l-lg ">
          <h1 className="text-xl font-semibold p-2 ">Market Trends Analysis</h1>
          <div className=" w-full">
            {competitorChartLoading || customerInterestLoading ? (
              <p>Loading...</p>
            ) : (
              <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={45}
                totalSlides={4}
                isPlaying={true}
                className="w-full pr-2 rounded-lg"
              >
                <Slider className="w-full h-full rounded-lg my-auto">
                  <Slide index={0} className="w-full  justify-center rounded-lg  h-full">
                    {tables.length > 0 && tables[0].length > 0 ? (
                      <table className="table-auto w-full h-full">
                        <thead className="text-xs font-semibold uppercase text-gray-400 bg-[#efefef]">
                          <tr>
                            {tables[0][0].length > 0 && tables[0][0].map((header, index) => (
                              <th key={index} className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-left">{header}</div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-100">
                          {tables[0].slice(1).map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              {row && Array.isArray(row) ? (
                                row.map((cell, cellIndex) => (
                                  <td key={cellIndex} className="p-2 whitespace-nowrap">
                                    <div className="flex items-center">
                                      <div className="font-medium text-gray-800">{cell}</div>
                                    </div>
                                  </td>
                                ))
                              ) : null}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p>No data available</p>
                    )}
                  </Slide>
                  <Slide index={1} className="w-full rounded-lg  h-full">

                    <h2 className="text-black text-lg font-medium mb-4">
                      Customer Interest Trends
                    </h2>
                    <Line data={customerInterest} options={lineChartOptions} />

                  </Slide>
                  <Slide index={2} className="w-full rounded-lg  h-full">
                    <h2 className="text-black text-lg font-medium mb-4">
                      Competitors in the Market
                    </h2>

                    <div className="w-3/5 mx-auto h-full">
                      <Pie className="object-contain h-72" data={competitorChart} />
                    </div>
                  </Slide>
                  {images && Array.isArray(images) && images.length > 0
                    ? images.map((image, index) => (
                      <Slide key={index} index={index} className="w-full rounded-lg h-full">
                        <div className=" p-6 rounded-md shadow-md mb-4">
                          <img
                            src={image}
                            alt={`Market Insights`}
                            className="rounded-lg w-full h-72 object-contain"
                          />
                        </div>
                      </Slide>
                    ))
                    : <p>No images available</p>
                  }

                </Slider>
                <div className="flex mt-2 justify-between">
                  <ButtonBack><svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 7L10 12L15 17" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                  </ButtonBack>
                  <ButtonNext><svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 7L15 12L10 17" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                  </ButtonNext>
                </div>
              </CarouselProvider>
            )}

          </div>
          <button onClick={() => { exploreMarketInsight() }} className="p-2 mb-2 ml-4 w-32 rounded-full border-blue-700 bg-blue-100 hover:bg-blue-700 text-blue-700 hover:text-white">Explore More</button>

        </div>
        <div className="w-1/3 border-l-2 h-full flex flex-col gap-2 rounded-r-lg ">
          <h1 className="text-xl font-semibold px-4 py-2">Recommended People on Trumio</h1>
          <div className=" px-4">
            {peopleData
              ? peopleData.map((person) => (
                <div className="my-1" key={person.name}>
                  <PeopleCard.Small
                    name={person.name}
                    jobTitle={person.jobTitle}
                  />
                </div>

              ))
              : null}

          </div>
          <a className="p-2 mb-2 w-32 rounded-full border-blue-700 bg-blue-100 hover:bg-blue-700 text-blue-700 hover:text-white  ml-auto mr-4 text-center" href={`/people/${topicid}`}>Explore More</a>
        </div>
      </div>
    </div>
  );
};

export default IdeaDashboard;
