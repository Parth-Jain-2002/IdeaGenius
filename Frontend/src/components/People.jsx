import React, {useEffect} from 'react'
import PeopleCard from './PeopleCard'
import { useParams } from 'react-router-dom'

function People() {
  // user id
  const uid = localStorage.getItem("ideagen_user_id")
  // idea id
  const { ideaid } = useParams()
  const getPeople = () => {
    const obj= [
    { id: 1, name: 'John Doe', jobTitle: 'Software Engineer' },
    { id: 2, name: 'Jane Smith', jobTitle: 'Product Manager' },
    { id: 3, name: 'Jane Smith', jobTitle: 'Product Manager' },
    { id: 4, name: 'Jane Smith', jobTitle: 'Product Manager' },
    { id: 5, name: 'Jane Smith', jobTitle: 'Product Manager' },
    { id: 6, name: 'Jane Smith', jobTitle: 'Product Manager' },
    { id: 7, name: 'Jane Smith', jobTitle: 'Product Manager' },
    { id: 8, name: 'Jane Smith', jobTitle: 'Product Manager' },
  ];
    obj.map((person) => {
      console.log(person)
    })
    return obj
  }
  return (
    <div>
      <h3>people you may know</h3>
      <div>
        {getPeople().map((person) => (
          <PeopleCard name={person.name} jobTitle={person.jobTitle}/>
        ))}
      </div>
    </div>
  )
}

export default People