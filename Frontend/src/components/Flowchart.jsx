import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import curveLg from '../assets/images/curveLg.svg';
import curve from '../assets/images/curve.svg'

function Milestone({ milestone, index }) {
  const [completed, setCompleted] = useState(milestone.completed);
  const [loading, setLoading] = useState(false);
  const { ideaid } = useParams();

  function complete(){
    setLoading(true);
    axios
      .get(`http://localhost:8000/complete_milestone`, {
        params: {
          userid: localStorage.getItem("ideagen_user_id"),
          ideaid: ideaid,
          milestone: index
        },
      })
      .then(
        (response) => {
          setLoading(false);
          setCompleted(true);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  return (
    <div className={`z-20 col-span-5 md:col-span-3 lg:col-span-2 rounded-lg shadow-xl flex flex-col justify-center items-center border-black border-[3px] p-4 bg-white my-6 lg:my-0 ${completed ? 'border-green-500':''}`}>
      <div className="rounded-full flex justify-center items-center text-center mb-4">
        <span className="text-xl font-bold">{milestone.milestone}</span>
      </div>
      {milestone.tasks.map((task, i) => (
        <div key={i} className={`flex flex-col justify-center items-center rounded-lg border border-black p-2 my-2 w-full ${completed ? ' border-[3px] border-green-500' : 'shadow-[inset_0_0_50px_-12px_rgb(0_0_0/0.25)]'}`}>
          <div className="text-lg font-bold underline text-center w-full">
            {task.task_name} 
          </div>
          <div className="w-full opacity-50 font-thin flex justify-center items-center">
            <span className="text-sm font-semibold mr-2">{task.estimated_time}</span>|
            <span className="text-sm font-semibold ml-2">{task.difficulty}</span>
          </div>
          <div className="flex justify-center items-center my-2 text-center">
            <span className="text-sm">{task.description}</span>
          </div>
          <div className="flex flex-col text-left w-full whitespace-nowrap overflow-hidden overflow-ellipsis">
            {task.resources.map((resource, i) => (
              <span key={i} className="text-sm font-semibold mr-2 max-w-full overflow-hidden whitespace-nowrap text-ellipsis" title={resource}>{resource}</span>
            ))}
          </div>
        </div>
      ))}
      {
        !completed ?
        <button className={`w-full rounded-full bg-black text-white p-4 hover:bg-gray-800 ${loading?'bg-gray-500 hover:bg-gray-500':''}`} onClick={complete} disabled={loading}>
          Mark as complete {loading ? <span className="animate-pulse">...</span> : null}
        </button> : null
      }
    </div>
  );
}

function Track({ flip, hidden }){
  const style = {};
  if (flip) {
    style.transform = "scale(-1, 1)";
  }
  if (hidden) {
    style.visibility = "hidden";
  }
  // Use a random hue transform for each track
  style.filter = `hue-rotate(${Math.floor(Math.random() * 360)}deg)`;
  return (
    <div className="hidden col-span-5 md:col-span-2 lg:col-span-3 md:flex flex-col justify-center items-center m-0 h-[110%] lg:h-full">
      <img src={curveLg} alt="" className="w-full h-full drop-shadow-lg object-cover hidden lg:block" style={style} />
      <img src={curve} alt="" className="w-full h-full drop-shadow-lg object-cover lg:hidden" style={style} />
    </div>
  );
}

/**
 * @typedef Milestone
 * @property {string} milestone
 * @property {Array<Task>} tasks
 */

/**
 * @typedef Task
 * @property {string} task_name
 * @property {string} description
 * @property {string} estimated_time
 * @property {string} difficulty
 * @property {Array<string>} resources
 */

/**
 * 
 * @param {{milestones: Array<Milestone>}} {milestones} The milestones of the learning path
 * @returns 
 */
export default function Milestones({ milestones }) {
  var [comps, setComps] = useState([]);

  useEffect(()=>{
    var components = []
    var ms = Array.from(milestones.slice().reverse());
    var j = 0;
    for (var i = 0; ms.length > 0; i++) {
      // console.log(i, i%4);
      if(i%4==0 || i%4==3) {
        components.push(<Milestone key={i} milestone={ms.pop()} index={j} />);
        j++;
      } else if (i%4==1){
        components.push(<Track key={i} flip={false}/>);
      } else if (i%4==2){
        if(ms.length > 1){
          components.push(<Track key={i} flip={true}/>);
        } else {
          components.push(<Track key={i} hidden={true}/>);
        }
      }
    }
    console.log(components);
    setComps(components);
  }, []);
  
  return (
    <div className="w-full md:p-2 grid grid-cols-5">
      {comps}
    </div>
  )
}