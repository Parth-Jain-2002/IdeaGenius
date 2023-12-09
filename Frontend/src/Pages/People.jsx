import React, { useEffect, useState } from "react";
import PeopleCard from "../components/PeopleCard";
import { useParams } from "react-router-dom";

import Navbar from "../components/Layout/Navbar";
import Sidebar from "../components/Layout/Sidebar";

export default function People() {
  const [peopleData, setPeopleData] = useState([{}]);
  const { ideaid } = useParams();

  const getPeeps = async () => {
    try {
      const data = await getPeople();
      setPeopleData(data);
      // console.log("ideaid: ", ideaid);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
            ideaid: ideaid,
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

  useEffect(() => {
    getPeeps();
  }, []);

  return (
    <section className="grid h-screen grid-cols-5">
      <Sidebar />
      <main className="flex flex-col bg-[#eee] col-span-4 p-4">
        <Navbar link={"/dashboard"} />
        <section className="space-y-4 overflow-y-scroll max-h-[88vh] min-h-[88vh] overflow-x-hidden p-2">
          <h2 className="text-3xl mt-4 font-semibold">
            People you may know from alumni circle
          </h2>
          <div className="grid grid-cols-3 justify-center items-center">
            {peopleData
              ? peopleData.map((person) => (
                  <div className="p-4 h-full" key={person.name}>
                    <PeopleCard
                      name={person.name}
                      jobTitle={person.jobTitle}
                      jobDescription={person.jobDescription}
                      institution={person.institution}
                    />
                  </div>
                ))
              : null}
          </div>
          {/* <h2 className="text-3xl mt-8 font-semibold">People you may need for your student team</h2>
          <div className='grid grid-cols-3 justify-center items-center'>
            {peopleData.map((person) => (
              <div className='p-4 h-full'>
                <PeopleCard name={person.name} jobTitle={person.jobTitle} jobDescription={person.jobDescription} institution={person.institution} />
              </div>
            ))}
          </div>
          <h2 className="text-3xl mt-4 font-semibold">People you may need for potential funding rounds</h2>
          <div className='grid grid-cols-3 justify-center items-center'>
            {peopleData.map((person) => (
              <div className='p-4 h-full'>
                <PeopleCard name={person.name} jobTitle={person.jobTitle} jobDescription={person.jobDescription} institution={person.institution} />
              </div>
            ))}
          </div> */}
        </section>
      </main>
    </section>
  );
}
