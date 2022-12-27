import { useState } from "react";
import "./NumberPlate.css"
import axios from "axios";


let NumberPlate=({title,val,arr})=>{
    let [info,setinfo]=useState(val);

    let HandleChange=async(e)=>{
        // console.log(e.target.name+" "+e.target.value);
        let {name,value}=e.target
        // console.log({[name]:value})
        const response=await axios.post("https://article-inventry.cyclic.app/getCount",{[name]:value});
        //console.log(response.data);
        setinfo(response.data)
    }

    return(
      <div style={{position:"relative",margin:"0 7px"}}>
      <span style={{position:"absolute",left:"10px",top:"-11px",padding:"2px 7px",background:"white"}}>{title}</span>
      <div style={{border:"2px solid black",padding:"0px 5px",borderRadius:"6px"}}>
      <select  style={{width:"150px"}}  onChange={HandleChange} className="dd" id={`${title.toLowerCase()}123`} name={`${title.toLowerCase()}`}>
      {arr.map((val)=> {
        if(val===""){
                return;
        }
        return <option >{val}</option>
})}
                               
      </select> 
      <p style={{fontSize:"70px",margin:"24px 0",padding:"0 30px"}}>{info}</p>
      </div>
     </div>
        
    )
}

export default NumberPlate;