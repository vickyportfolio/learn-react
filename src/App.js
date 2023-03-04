// import './App.css';
// import Task from './Task/Task';
// import {useState} from 'react';
// function App() {
//   const [todoList , setTodoList] = useState([]);
//   const [newTask, setNewTask] = useState('');

//   const handleChange = (event)=>{
//    setNewTask(event.target.value);
//   };

//   const addTask =()=>{
//     const task ={
//       id: todoList.length === 0 ? 1: todoList[todoList.length - 1].id +1,
//       taskName: newTask,
//       completed:false,
//     };
//     setTodoList([...todoList, task]);
//   }

//   const deleteTask = (id)=>{
//    const newTodoList = todoList.filter((task)=>{
//     return task.id !== id ;
//    });
//    setTodoList(newTodoList);
//   }

//   const status =(id)=>{
//    const statusList = todoList.map((list, index)=>{
//     if(list.id === id){
//       return {...list, completed:true};
//     }else{
//       return list;
//     }
//    })
//    setTodoList(statusList);
//   }
//   return(
//       <div className='App'>
//         <div className='container'>
//        <div className='addTask'>
//          <input onChange={handleChange}/>
//          <button onClick={addTask}>Add Task</button>
//        </div>
//        <div className='list'>
//          {todoList.length===0? <div className='dummy'>
//            <span>Enter notes here</span>
//          </div>
//           :todoList.map((task)=>{
//            return (<Task 
//                      taskName ={task.taskName} 
//                      taskId ={task.id} 
//                      deleteTask={deleteTask}
//                      status={status}
//                      completed ={task.completed}
//                     />);
//           })}

//        </div>
//        </div>
//       </div>);

// };

// export default App;
import './App.css';
import Loop from './Task/modal';
import { useState } from 'react';
import Axios from 'axios';
import 'semantic-ui-css/semantic.min.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [valueSelect, selectedValue] = useState('add_schema');
  const [textSelect, selectedText] = useState('');
  const [renderSelect, setrenderSelect] = useState([]);
  const selectEl = document.getElementById('selectClass');
  const optionsBox = document.getElementsByClassName('common');
  /*****header****/
  const Navbar = () => (
    <div className='navbar header'>
      <div className='left-header'>
        <i className="icon big angle left" ></i>
        <h3>View Audience</h3>
      </div>
    </div>
  );

  /******middle*****/
  const Overlay = ({ isOpen, setIsOpen }) => (
    <div
      onClick={() => isOpen ? setIsOpen(false) : setIsOpen(true)}
      className={`overlay ${isOpen ? "open" : ""}`
      }>
      <button
        onClick={() => setIsOpen(true)}
      >Save Segment</button>
    </div>
  );

  /******sidebar*****/
  const Modal = ({ isOpen }) => (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <nav className='header'>
        <div className='left-header'>
          <i className="icon big angle left" ></i>
          <h3>Saving Segment</h3>
        </div>
      </nav>
      <div className='content'>

        <div className='first-container'>
          <h5>Enter the Name of the Segment</h5>
          <input type='text' placeholder={'Name of the Segment'} />
          <h5>To save your segment, you need to add the schemas to build the query</h5>
        </div>

        <div className='second-container'>
          <span>-User Traits</span>
          <span>-Group Traits</span>
        </div>

        <div className='third-container'>

          <div className='box-content'>
            {
              renderSelect.map((detail) => {
                return (<Loop
                  name={detail.name}
                  value={detail.value}
                  optionconstant={detail.option}
                />)
              })}
          </div>

          <div className='last-container'>
            <select
              id='selectClass'
              value={valueSelect}
              text={textSelect}
              onChange={(e) => {
                const value = e.target.value;
                const text = e.target.options[e.target.selectedIndex].text;
                selectedValue(value);
                selectedText(text)
              }}
            >
              <option value='add_schema'>Add schema to segment</option>
              <option value='first_name'>First Name </option>
              <option value='last_name'>Last Name </option>
              <option value='gender'>Gender </option>
              <option value='age'>Age </option>
              <option value='account_name'>Account Name </option>
              <option value='city'>City </option>
              <option value='state'>State </option>
            </select>
            <i className='icon window minimize dash' style={{ fontSize: '1.5rem' }}></i>
          </div>

          <a href='#' className='link' onClick={addSchema}>Add new schema</a>
        </div>
        <div className='footer'>
          <button className='save' onClick={saveSegment} >Save the Segment</button>
          <button className='cancel' onClick={() => setIsOpen(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
  const addSchema = () => {
    let text = textSelect;
    let value = valueSelect;
    if (valueSelect != 'add_schema') {
      let defaultOption = [];

      Array.from(selectEl).map((elem) => {
        let valueName = elem.value;
        if (valueName != 'add_schema') {
          let textName = elem.text;
          let constantDetails = {
            value: valueName,
            text: textName,
          }
          defaultOption.push(constantDetails);
        }

      });

      let userDetails = {
        value,
        name: text,
        option: defaultOption
      };
      setrenderSelect([...renderSelect, userDetails]);
      selectedValue('add_schema');
    }
  }
  const saveSegment = () => {
    const boxArray = [];
    Array.from(optionsBox).map(elem => {
      let val = elem.value;
      let txt = elem.options[elem.selectedIndex].text;
      let saveDetails = {
        value: val,
        text: txt,
      }
      boxArray.push(saveDetails);
    })

    let serverDetails = {
      "segment_name": "last_10_days_blog_visits",
      "schema": boxArray,
    }
    const url = 'https://dummy.restapiexample.com/api/v1/create';

    const sendingData = async () => {
      try {
        let response = await fetch(url, {
          method: 'POST',
          headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(serverDetails)
        })
        let data = await response.json();
        console.log(data);
      } catch (err) {
        console.error(err);
      }

    }
    sendingData();
  }
  return (
    <>
      <Navbar
      />

      <Overlay
        isOpen={isOpen}
        setIsOpen={setIsOpen} />

      <Modal
        isOpen={isOpen}
      />


    </>
  );
};
export default App;