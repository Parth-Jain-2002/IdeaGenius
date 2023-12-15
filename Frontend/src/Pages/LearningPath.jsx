import axios from "axios";
import React, { useState, useEffect } from "react";
import chatIcon from "../assets/images/chat_icon.png";
import Sidebar from "../components/Layout/Sidebar";
import Navbar from "../components/Layout/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import data_img from "../assets/images/Data-amico.png"
import { Link } from "react-router-dom";
import { useCallback } from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';
export default function LearningPath() {
    const { ideaid } = useParams();
    const [learningPath, setlearningPath] = useState([]);
    const [topicDetails, setTopicDetails] = useState([]);
    const topicid = ideaid;
    const milestones = [
        {
            "milestone": "Foundations of Good Education",
            "tasks": [
                {
                    "task_name": "Understand the importance of education",
                    "description": "Learn about the significance of education in personal and professional development.",
                    "resources": ["The Importance of Education by John Dewey", "Why Education Matters by Sir Ken Robinson"],
                    "estimated_time": "4 hours",
                    "difficulty": "easy",
                    "prerequisites": []
                },
                {
                    "task_name": "Identify effective teaching methods",
                    "description": "Research and analyze various teaching methodologies and their effectiveness in promoting student engagement and understanding.",
                    "resources": ["The Art of Teaching by Jay Parini", "Teaching Strategies That Work by Jane Bluestein"],
                    "estimated_time": "6 hours",
                    "difficulty": "moderate",
                    "prerequisites": ["Understand the importance of education"]
                }
            ]
        },
        {
            "milestone": "Implementing Effective Teaching Methods",
            "tasks": [
                {
                    "task_name": "Design an engaging lesson plan",
                    "description": "Create a lesson plan incorporating effective teaching strategies and technologies to promote student engagement and understanding.",
                    "resources": ["Lesson Planning: A Guide for Teachers by Robert J. Marzano", "Using Technology in the Classroom by Alan November"],
                    "estimated_time": "8 hours",
                    "difficulty": "challenging",
                    "prerequisites": ["Identify effective teaching methods"]
                },
                {
                    "task_name": "Implement formative assessments",
                    "description": "Develop and implement formative assessments to measure student progress and adjust instruction accordingly.",
                    "resources": ["Formative Assessment: A Guide for Teachers by Margaret Heritage", "Assessment for Learning by Grant Wiggins and Amy Sh Barry"],
                    "estimated_time": "6 hours",
                    "difficulty": "moderate",
                    "prerequisites": ["Design an engaging lesson plan"]
                }
            ]
        }
    ]


    const navigate = useNavigate();
    const generateNodesAndEdges = (milestones) => {
        let nodes = [];
        let edges = [];
        
        milestones.forEach((milestone, milestoneIndex) => {
          // Add milestone node
          nodes.push({
            id: `milestone-${milestoneIndex}`,
            data: { label: (<div className="w-full itmes-center p-2 justify-center text-xl font-semibold">{milestone.milestone}</div>) },
            position: { x: milestoneIndex * 800, y: 100 },
            style: {
              width: 300,
              height: 100,
              background: '#dbeafe', // Blue color
              color: '#000', // White text color
              borderRadius: '8px', // Rounded corners
              textAlign: 'center',
            },
          });
      
          // Add task nodes inside milestone node
          milestone.tasks.forEach((task, taskIndex) => {
            nodes.push({
              id: `task-${milestoneIndex}-${taskIndex}`,
              data: {
                label: (
                  <div className="flex flex-col w-full itmes-center my-auto py-20 justify-center">
                    <p className="text-2xl font-semibold pb-2">{task.task_name}</p>
                    <p className="text-lg font-medium">Description: {task.description}</p>
                    <p className="text-lg font-medium">Resources: {task.resources.join(', ')}</p>
                    <p className="text-lg font-medium">Estimated Time: {task.estimated_time}</p>
                    <p className="text-lg font-medium">Difficulty: {task.difficulty}</p>
                  </div>
                ),
              },
              position: { x: milestoneIndex * 700, y: (taskIndex + 1) * 450 },
              style: {
                width: 500,
                height: 380,
                background: '#ecf0f1', // Light gray color
                borderRadius: '8px',
                padding: '16px', // Increased padding
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Light shadow
              },
            });
      
            // Connect milestone to the first task
            if (taskIndex === 0) {
              edges.push({
                id: `edge-${milestoneIndex}-${taskIndex}`,
                source: `milestone-${milestoneIndex}`,
                target: `task-${milestoneIndex}-${taskIndex}`,
                style: { stroke: '#3498db' }, // Blue edge color
              });
            }
      
            // Connect tasks within a milestone
            if (taskIndex < milestone.tasks.length - 1) {
              edges.push({
                id: `edge-${milestoneIndex}-${taskIndex}-${taskIndex + 1}`,
                source: `task-${milestoneIndex}-${taskIndex}`,
                target: `task-${milestoneIndex}-${taskIndex + 1}`,
                style: { stroke: '#3498db' },
              });
            }
      
            // Connect the last task of the milestone to the next milestone
            if (taskIndex === milestone.tasks.length - 1 && milestoneIndex < milestones.length - 1) {
              edges.push({
                id: `edge-between-${milestoneIndex}-${milestoneIndex + 1}`,
                source: `task-${milestoneIndex}-${taskIndex}`,
                target: `milestone-${milestoneIndex + 1}`,
                style: { stroke: '#3498db' },
              });
            }
          });
        });
      
        return { nodes, edges };
      };
    const { nodes, edges } = generateNodesAndEdges(milestones);


    function getTopicDetails() {
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
                    const generated = response.data.generated;
                    if (generated) {
                    getLearningPath();
                      }
                  
                    setTopicDetails(response.data);
                },
                (error) => {
                    console.log(error);
                }
            );
    };

      function getLearningPath() {
        axios
        .post(`http://localhost:8000/generate_learning_path`, {
            userid: localStorage.getItem("ideagen_user_id"),
            ideaid: ideaid,
        })
        .then(
            (response) => {
                console.log(response.data);
                
                setlearningPath(JSON.parse(response.data));
            },
            (error) => {
                console.log(error);
            }
        );
      }

    useEffect(() => {
        getTopicDetails();
        getLearningPath();
    }, [topicid]);


    useEffect(() => {

    }, [ideaid]);

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    function capitalizeWords(str) {
        if (!str) {
            return '';
        }
        return str.split(' ').map(word => capitalizeFirstLetter(word)).join(' ');
    };

    return (
        <section className="grid h-full text-black xl:grid-cols-5 grid-cols-4">
            <Sidebar />
            <main className="flex h-full flex-col w-full bg-white col-span-4">
                <Navbar />
                <div className="w-full h-full p-8">
                    <div className="flex items-center justify-between px-10 py-4 rounded-3xl border-2 border-sky-200 shadow-lg bg-blue-100">
                        <div className="flex flex-col justify-between w-full items-center md:flex-row">
                            <div className="flex flex-col w-full">
                                <h3 className="text-2xl font-semibold text-center md:text-left">{capitalizeWords(topicid)}</h3>
                                <p className="text-gray-600 text-base w-full text-center md:text-left p-1">
                                    {capitalizeWords(topicDetails.description)}
                                </p>
                            </div>
                            {/* <div className="items-center hover:bg-blue-300 flex flex-row bg-white px-2 rounded-lg w-96 max-w-full justify-center">
                                {" "}
                                <img src={chatIcon} alt="chat icon" className="h-4 w-4 ml-2 " />
                                {topicDetails.generated ? (
                                    <button
                                        onClick={() => {
                                            handleIdeaRefinement();
                                        }}
                                        className="px-2 py-1 font-semibold text-black"
                                    >
                                        Generate Learning Path
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            handleIdeaGeneration();
                                        }}
                                        className="px-2 py-2 font-bold text-gray-700 rounded-lg"
                                    >
                                        Generate Idea First
                                    </button>

                                )}

                            </div> */}
                            
                        </div>
                    </div>

{topicDetails.generated ? (<div style={{ width: '100vw', height: '100vh' }}>
                        <ReactFlow nodes={nodes} edges={edges} />
                    </div>) : (<div className="flex w-full mt-16 flex-col-reverse md:flex-row">
              <img src={data_img} className="w-full md:w-1/2"></img>
              <h1 className="text-2xl leading-10 text-slate-500 items-center h-2/3 my-auto content-center text-center md:text-left flex-1">Generate Problem Statement to access Learning Path for the Idea</h1>
            </div>)}
                    
                </div>

            </main>
        </section>
    )

}