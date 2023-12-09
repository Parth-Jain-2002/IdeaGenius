import ResearchCard from "../components/ResearchCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";
import Sidebar from "../components/Layout/Sidebar";

export default function ResearchBank() {
  const [threads, setThreads] = useState([]);
  const [topics, setTopics] = useState({});
  const { ideaid } = useParams();

  function getTopics() {
    axios
      .get(`http://localhost:8000/get_topics`, {
        params: {
          userid: localStorage.getItem("ideagen_user_id"),
        },
      })
      .then(
        (response) => {
          //console.log(response);
          setTopics(response.data.topics);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  function getThreads() {
    axios
      .get(`http://localhost:8000/get_threads`, {
        params: {
          userid: localStorage.getItem("ideagen_user_id"),
          ideaid: ideaid,
        },
      })
      .then(
        (response) => {
          //console.log(response);
          //console.log(response.data.data);
          setThreads(response.data.data);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    getThreads();
    getTopics();
  }, [ideaid]);

  return (
    <section className="grid h-screen grid-cols-5">
      <Sidebar />
      <main className="flex flex-col bg-[#f8f9fb] col-span-4 p-4">
        <Navbar link={"/dashboard"} />
        <section className="space-y-4 overflow-y-scroll max-h-[88vh] min-h-[88vh] overflow-x-hidden">
          <h2 className="text-3xl mt-4 font-semibold">Research Bank</h2>
          <div className="mt-8 grid grid-cols-3 gap-5">
            {threads.map((thread) => (
              <ResearchCard
                imgSrc={thread.imgsrc}
                title={thread.title}
                url={thread.url}
                chatid={thread.chatid}
                topics={topics}
                currentTopic={ideaid}
                getThreads={getThreads}
              />
            ))}
          </div>
        </section>
      </main>
    </section>
  );
}