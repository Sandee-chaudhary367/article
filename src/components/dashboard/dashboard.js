import React, { useEffect, useState } from "react";
import axios from "axios";
import BarChart from "../barchart/barchart"
import Pie from "../barchart/Piehook"
import NumberPlate from "../NumberPlate/NumberPlate"
import "./dashboard.css"

let DashBoard=()=>{

  let [Loading,setLoading]=useState(true);
  let [distinct,setDistinct]=useState(null);
  let [c1,setc1]=useState([
    { _id: 'investment', count: 4 },
    { _id: 'fossil fuel', count: 1 },
    { _id: 'bank', count: 4 },
    { _id: 'shale gas', count: 1 },
    { _id: 'Washington', count: 1 }
  ]);
  let [c2,setc2]=useState([
    { _id: 'Healthcare', count: 2 },
    { _id: 'Information Technology', count: 15 },
    { _id: 'Government', count: 18 },
    { _id: 'Financial services', count: 39 },
    { _id: 'Transport', count: 5 }
  ]);
  let [c3,setc3]=useState([
    { xAxisValue: 'Nigeria', yAxisValue: 6 },
  { xAxisValue: 'Mali', yAxisValue: 1 },
  { xAxisValue: 'Iraq', yAxisValue: 11 },
  { xAxisValue: 'Ukraine', yAxisValue: 2 },
  { xAxisValue: 'Saudi Arabia', yAxisValue: 18 }
  ]);

  const handleChange=async(e)=>{
         // console.log(e.target.name+" "+e.target.value);
         let {name,value}=e.target
         console.log({name:value});
         const response=await axios.post("https://article-inventry.cyclic.app/getPieData",{name:value});
         console.log(response.data)
         if(name==="Catorgory1"){
            setc1(response.data)
         }else{
          setc2(response.data)
         }
        //setc1(response.data)
        
  }  

  const BringDistinct=async()=>{
    try{
    const response=await axios.get("https://article-inventry.cyclic.app/getDistinctValue");
    //console.log(response.data);
    await setDistinct(response.data)
    setLoading(false);
    }catch(e){
      console.log(e);
      setLoading(true);
    } 
 }
 

useEffect(()=>{
    BringDistinct()
},[])



  return (
    <React.Fragment>
    {!distinct?<React.Fragment></React.Fragment>:<React.Fragment>
    <div className="Leftpart"> 
       <div className="topLeft">
        <div>
        <NumberPlate style={{width:"200px"}} title="Topic" val="1" arr={distinct.topic}> </NumberPlate>
        </div>
        <div>
        <NumberPlate style={{width:"200px"}} title="Sector" val="19" arr={distinct.sector}> </NumberPlate>
        </div>
        <div>
        <NumberPlate style={{width:"200px"}} title="Source" val="2" arr={distinct.source}> </NumberPlate>
        </div>
       </div>
       <div className="bottomLeft">
       <div>
       <label for="Catorgory1" style={{display:"inline"}}>Catorgory : </label>
       <select onChange={handleChange} style={{width:"200px"}} className="dd2" id="Catorgory1" name="Catorgory1">
       <option selected >Topic</option>
       <option >Sector</option>
       <option >Source</option>                 
       </select> 
       <Pie data={c1} width={290} height={200} innerRadius={70} outerRadius={100} />
       </div>
       <div>
       <label for="Catorgory2" style={{display:"inline"}}>Catorgory : </label>
       <select onChange={handleChange} style={{width:"200px"}} className="dd2" id="Catorgory2" name="Catorgory2">
       <option selected>Sector</option>
       <option>Topic</option>
       <option >Source</option>                 
       </select>  
       <Pie data={c2} width={290} height={200} innerRadius={70} outerRadius={100} />
       </div>
       </div>
    </div>

    <div className="RightPart">
    <BarChart
    width={450}
    height={620}
    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
    data={c3}
  />
    </div>
    </React.Fragment>}
    </React.Fragment>
  )
}

export default DashBoard;
