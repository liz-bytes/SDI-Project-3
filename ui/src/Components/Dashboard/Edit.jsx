import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Edit = () => {

  const {id} = useParams();

  let [soldier, setSoldier] = useState({
    first_name: '',
    last_name: '',
    deployment_name: '',
    mos_name: ''
  })

  useEffect(()=>{
    fetch(`http://localhost:5173/soldiers`)
    .then(rawData => rawData.json())
    .then(data => {
      return(data.filter(soldier => soldier.id == id)[0])
    })
    .then(foundSoldier => setSoldier(foundSoldier))
  }, [id])

  const Patch = (info) => {
    info.preventDefault();

    fetch(`http://localhost:5173/soldiers/${soldier.id}`, {
      method: 'PATCH',
      headers: {'ContentType': 'application/json'},
      body: JSON.stringify(soldier)
    })
    .then(response => {
      return(response.json())
    })
    .catch(error => console.log("Error updating soldier: ", error))
  }

  const Save = (info) => {
    setSoldier(prevInfo => ({
      ...prevInfo,
      [info.target.id]: info.target.value
    }))
  }

  return(
  
    <form onSubmit={Patch}>
      <div>
        <h3>
          <label htmlFor="first_name">First Name: </label>
          <input type="text" id="first_name" value={soldier.first_name} onChange={Save}/>
          <label htmlFor="last_name">Last Name: </label>
          <input type="text" id="last_name" value={soldier.last_name} onChange={Save}/>
        </h3>

        <label htmlFor="deployment_name">Deployment: </label>
        <input type="text" id="deployment_name" value={soldier.deployment_name} onChange={Save}/>
        <label htmlFor="mos_name">MOS: </label>
        <input type="text" id="mos_name" value={soldier.mos_name} onChange={Save}/>

      </div>
      <button type="submit" onClick={Patch}>Save</button>
    </form>
  )

  }

  export default Edit;
