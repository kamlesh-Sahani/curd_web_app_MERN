import React, { useEffect, useState } from "react";
import "../style/todo.scss";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
const Todo = () => {
  const [data,setData]= useState([]);
  const [addData,setAddData]= useState({
    nameTask:'',
    description:''
  })
  const [update,setUpdate]= useState(false);
  const [load,setLoad] = useState(false);

  const BASE_URL = "http://localhost:5000";



//create data or add data

const handleValue= (event)=>{
  const {name,value} = event.target;
  setAddData((pre)=>({
    ...pre,
    [name]:value
  }))
}

const handleSubmit = async(event)=>{
  event.preventDefault();
  try{
    const response = await axios.post(`${BASE_URL}/create`,addData);
    setLoad(true);
      setAddData({
        nameTask:'',
        description:''
      })
   
  }catch(error){
    console.log(error);
  }

}


//delete data
const handleDelete =async (id)=>{
  try{
     await axios.delete(`${BASE_URL}/delete/${id}`)
     setLoad(true)
  }catch(error){
    console.log(error)
  }
}

  
  //getData
  useEffect(() => {
    const fetchGetdata = async () => {
        try {
            const {data:{task}} = await axios.get(`${BASE_URL}/getdata`);
            setData(task);
        } catch (error) {
            console.log(error);
          
        }
    }
    setLoad(false)
    fetchGetdata();
}, [load]);


// edit or Update the Data

const handleUpdate = async(id,name,des)=>{
  try{
    setAddData({
      nameTask:name,
      description:des
    })
    await axios.put(`${BASE_URL}/update/${id}`,addData);
    await axios.delete(`${BASE_URL}/delete/${id}`);
  setLoad(true)
  }catch(error){
    console.log(error);
  }
}
// Task Components
const List = ({name,des,id}) => (
  <div className="item">
    <div>
      <h3>{name}</h3>
      <br />
      <p>
       {des}
      </p>
    </div>
    <div className="action">
      <FaEdit className="icon" onClick={()=>handleUpdate(id,name,des)} />
      <AiFillDelete className="icon" onClick={()=>handleDelete(id)}/>
    </div>
  </div>
);



  return (
    <div className="todo">
      <h1>TODO list</h1>
      <form method="post" onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter The Task" name="nameTask" onChange={handleValue} value={addData.nameTask}/>
        <input
          type="text"
          placeholder="Enter the description"
          name="description"
          onChange={handleValue}
          value={addData.description}
        />
        <button type="submit">Save</button>
      </form>
      <div className="list">
        {
          data.map((item)=>{
            return <List key={item._id} name={item.nameTask} des={item.description} id={item._id}/>
          })
        }
      </div>
    </div>
  );
};

export default Todo;
