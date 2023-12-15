import { useEffect, useState } from 'react';
import curve from '../assets/images/curve.svg';

function Milestone({ milestone }) {
  const [completed, setCompleted] = useState(milestone.completed);
  return (
    <div className={`col-span-2 rounded-lg shadow-xl flex flex-col justify-center items-center p-4 ${completed ? 'bg-green-200':'bg-white'}`}>
      <div className="rounded-full flex justify-center items-center text-center">
        <span className="text-xl font-bold">{milestone.milestone}</span>
      </div>
      {milestone.tasks.map((task, i) => (
        <div key={i} className="flex flex-col justify-center items-center rounded-lg border border-gray-300 p-2 my-2 w-full">
          <div>
            <span className="text-lg font-bold underline">
              {task.task_name} 
            </span>
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
        <button className='w-full rounded-full bg-black text-white p-4 hover:bg-gray-800' onClick={()=>setCompleted(true)}>
          Mark as complete
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
    <div className="col-span-3 flex flex-col justify-center items-center m-0 h-full">
      <img src={curve} alt="" className="w-full h-full drop-shadow-lg object-cover" style={style} />
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
    for (var i = 0; ms.length > 0; i++) {
      // console.log(i, i%4);
      if(i%4==0 || i%4==3) {
        components.push(<Milestone key={i} milestone={ms.pop()} />);
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
    <div className="w-full p-2 grid grid-cols-5">
      {comps}
    </div>
  )
}