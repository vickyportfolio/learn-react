// import React, { useState } from 'react';
// import './Task.css';
// import { useEffect } from 'react';
// const Task =({taskName, taskId, deleteTask, status,completed})=>{
// const [text, settext] = useState('');
//     useEffect(()=>{
//        console.log('mounted');
//        return ()=>{
//         console.log('unmounted')
//        };
//     },[]);
    
//     return(
//         <div className='task'>
//         <div id={taskId} style={{color:completed && 'green'}}>{taskName}</div>
//         <button onClick={()=>status(taskId)} style={{background:completed?'green':'red', marginRight:completed&& '-9px'}} className='status'> {completed ? 'completed' :' Pending' }</button>
//         <button onClick={()=> deleteTask(taskId)} className='delete'>X</button>
//        </div>
//     );
// }

// export default Task;

import React, { useState } from 'react';

const Loop=({name,value,optionconstant})=>{
const [optionArray, setoptionArray]=useState([]);
const optionAppend = ()=>{
const option = document.querySelectorAll('.common');
const boxArray = [];
 Array.from(option).map(elem => {
    let val = elem.value;
    let txt = elem.options[elem.selectedIndex].text;
 let optionDetails={
    value:val,
    text:txt,
 }
boxArray.push(optionDetails);
})

boxArray.map((box)=>{
optionconstant.map((constant,index,array)=>{
if(box.value == constant.value){
console.log('hai');
delete optionconstant[index];
}
})
})
setoptionArray(optionconstant);
};

return(
    <div id='before-after'>
    <select className='common' onClick={optionAppend}>
     <option value={value}>{name}</option>
    {
        optionArray.map((option)=>{
            return(
                <option value={option.value}>{option.text}</option>
            )
        })
    }
    </select>
    <i className='icon window minimize dash' style={{fontSize:'1.5rem'}}></i>
    </div>
)


}

export default Loop;