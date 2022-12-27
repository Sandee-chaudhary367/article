import { useEffect, useState } from "react";
import axios from "axios";

const Filter=({setArticle,setArticles,lastFilterValue,setlastFilterValue,BringArticles2,FilterValue,setFilterValue})=>{
    const [Loading,setLoading]=useState(true);
    const [distinct,setDistinct]=useState(null);
    const handleChange = async (e) => {
        const { name, value } = e.target;
        //console.log(name+"-|"+value+"|-");
        let arr=FilterValue.split("/");
        if(name==="topic"){
           arr[0]=value;
        }else if(name==="sector"){
           arr[1]=value;
        }else if(name==="region"){
           arr[2]=value;
        }else if(name==="country"){
           arr[3]=value;
        }else if(name==="source"){
           arr[4]=value;
        }else if(name==="end_year"){
           arr[5]=value;
        }
        let str=arr.join("/");
        await setFilterValue(str);
        //await setLastIndex(0);
    };

    const BringNewData=async()=>{
        try{    
                
                //console.log(FilterValue+"|"+lastFilterValue)
                if(FilterValue===lastFilterValue){
                       await  setlastFilterValue(FilterValue)
                        return;
                }
                await setlastFilterValue(FilterValue)
                const response=await axios.post("https://article-inventry.cyclic.app/getFilteredData",{FilterValue:FilterValue});
                //console.log(response.data);
                if(response.data.length===0){
                        return;
                }
                await setArticles(response.data)
                await setArticle(response.data[0])
        }catch(e){
          console.log(e);
          setLoading(true);
        } 
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
    
   
    useEffect(()=>{
       BringNewData();
    },[FilterValue])
    
  
    return(
        
        <div style={{position:"absolute",backgroundColor:"rgb(188, 196, 205)",border:"1px solid black",borderRadius:"7px",zIndex:"1",padding:"15px 0"}}>
            {Loading? 
            <div></div>:
                <table style={{width:"100%"}}>
                <tbody>

                <tr>
                <td>
                        <label for="topic" style={{display:"inline"}}>Topics</label><br></br>
                        <select id="topic12" name="topic" onChange={handleChange}>
                                <option   selected value={FilterValue.split("/")[0]}>{FilterValue.split("/")[0]===""?"--None--":FilterValue.split("/")[0]}</option>
                                <option   value="">--None--</option>
                                {distinct.topic.map((val)=> {
                                        if(val===""){
                                                return;
                                        }
                                        return <option>{val}</option>
                                })}                     
                        </select>                
                </td>
                                
                <td>
                        <label for="sector" style={{display:"inline"}}>Sector</label><br></br>
                        <select id="sector12" name="sector"  onChange={handleChange}>
                                <option   selected value={FilterValue.split("/")[1]}>{FilterValue.split("/")[1]===""?"--None--":FilterValue.split("/")[1]}</option>
                                <option   value="">--None--</option>   
                                {distinct.sector.map((val)=> {
                                        if(val===""){
                                                return;
                                        }
                                        return <option>{val}</option>
                                })}                       
                        </select>
                </td>

                <td>
                        <label for="region" style={{display:"inline"}}>Region</label><br></br>
                        <select id="Region12" name="region"  onChange={handleChange}>
                                <option   selected value={FilterValue.split("/")[2]}>{FilterValue.split("/")[2]===""?"--None--":FilterValue.split("/")[2]}</option>
                                <option   value="">--None--</option>   
                                {distinct.region.map((val)=>  {
                                        if(val===""){
                                                return;
                                        }
                                        return <option>{val}</option>
                                })}                   
                        </select>
                </td>

                <td>
                        <label for="country" style={{display:"inline"}}>Country</label><br></br>
                        <select id="country12" name="country"  onChange={handleChange}>
                        <option   selected value={FilterValue.split("/")[3]}>{FilterValue.split("/")[3]===""?"--None--":FilterValue.split("/")[3]}</option>
                        <option   value="">--None--</option>    
                                {distinct.country.map((val)=> {
                                        if(val===""){
                                                return;
                                        }
                                        return <option>{val}</option>
                                })}                    
                        </select>
                </td>

                <td>
                        <label for="source" style={{display:"inline"}}>Source</label><br></br>
                        <select style={{width:"150px"}} id="source12" name="source"  onChange={handleChange}>
                        <option   selected value={FilterValue.split("/")[4]}>{FilterValue.split("/")[4]===""?"--None--":FilterValue.split("/")[4]}</option>
                        <option   value="">--None--</option>   
                                {distinct.source.map((val)=>  {
                                        if(val===""){
                                                return;
                                        }
                                        return <option>{val}</option>
                                })}                       
                        </select>
                </td>

                </tr>
          
                <tr>
                      
                <td colSpan={5}>
                        <label for="end_year" style={{display:"inline"}}>End Year</label><br></br>
                        <select style={{width:"150px"}} id="endYear12" name="end_year" onChange={handleChange}>
                        <option   selected value={FilterValue.split("/")[5]}>{FilterValue.split("/")[5]===""?"--None--":FilterValue.split("/")[5]}</option>
                        <option   value="">--None--</option> 
                                {distinct.end_year.map((val)=> {
                                        if(val===""){
                                                return;
                                        }
                                        return <option>{val}</option>
                                })}            
                        </select>
                </td>

                </tr>
                
                </tbody>
                </table>
}           </div>
    );
} 

export default Filter;