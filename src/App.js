import './App.css';
import axios from "axios";
import React, { useState,useEffect} from 'react';
import TitleSlide from './components/titleSildes/titleSlide';
import DisplayInfo from './components/displayInfo/displayInfo';
import Filter from './components/filter/filter';
import BarChart from './components/barchart/barchart';
import Pie from './components/barchart/Piehook';
import DashBoard from './components/dashboard/dashboard';

function App() {
  const [articles,setArticles]=useState([]);
  const [article,setArticle]=useState(null);
  const [Loading,setLoading]=useState(true);
  const [ShowFilter,setShowFilter]=useState(false);
  const [FilterValue,setFilterValue]=useState("/////");
  const [lastFilterValue,setlastFilterValue]=useState("/////");
  const [sortArr,setSortArr]=useState([0,0,0,0,0]);
  const [showDashboard,setshowDashboard]=useState(false);
  let BringArticles2=async()=>{
    try{    
     
     // console.log(FilterValue+"|"+lastFilterValue)
            const response=await axios.post("https://article-inventry.cyclic.app/getFilteredData",{FilterValue});
            //console.log(response.data);
            await setArticles(response.data)
    }catch(e){
      console.log(e);
      setLoading(true);
    } 
}

  const BringArticles=async()=>{
    try{
    const response=await axios.get("https://article-inventry.cyclic.app/getArticle");
    //console.log(response.data);
    await setArticles(response.data)
    await setArticle(response.data[0])
    setLoading(false);
    }catch(e){
      console.log(e);
      setLoading(true);
    } 
  }

  const BringArticlesById=async(e)=>{
    try{
    //console.log(e.target.parentNode.getAttribute("index"))
    const id=e.target.parentNode.id
    const response=await axios.get("https://article-inventry.cyclic.app/getArticleById/"+id);
    //console.log(response.data);
    await setArticle(response.data)
    }catch(e){
      console.log(e);
    } 
  }

  const handleSortString=(e)=>{
    let name=e.target.innerHTML.toLowerCase();
    let value=e.target.getAttribute("index")
 
    if(sortArr[value]===1){
       let arr=[0,0,0,0,0];
       let newArticles = articles.slice();
       newArticles.sort((a,b)=> {
          if(a[`${name}`].toLowerCase()>b[`${name}`].toLowerCase()){
            return -1;
          }else if (a[`${name}`].toLowerCase()<b[`${name}`].toLowerCase()){
              return 1;
          }
          return 0;
       });
       setArticles(newArticles);
       arr[value]=-1;
       setSortArr(arr)
    }else if(sortArr[value]===-1){
       let arr=[0,0,0,0,0];
       setSortArr(arr)
       BringArticles2();
    }else{
       let arr=[0,0,0,0,0];
       let newArticles = articles.slice();
       newArticles.sort((a,b)=> {
        if(a[`${name}`].toLowerCase()<b[`${name}`].toLowerCase()){
          return -1;
        }else if (a[`${name}`].toLowerCase()>b[`${name}`].toLowerCase()){
            return 1;
        }
        return 0;
     });
       setArticles(newArticles);
       arr[value]=1;
       setSortArr(arr)
 
    }

   }

  const handleSort=(e)=>{
   let name=e.target.innerHTML.toLowerCase();
   let value=e.target.getAttribute("index")
   //console.log(name+" |-"+value+"-|-"+sortArr[value]+"-|")

   if(sortArr[value]===1){
      let arr=[0,0,0,0,0];
      let newArticles = articles.slice();
      newArticles.sort((a,b)=> a[`${name}`]-b[`${name}`]);
      setArticles(newArticles);
      arr[value]=-1;
      setSortArr(arr)
   }else if(sortArr[value]===-1){
      let arr=[0,0,0,0,0];
     // console.log("i have been click")
      BringArticles2();
      setSortArr(arr);
   }else{
      let arr=[0,0,0,0,0];
      let newArticles = articles.slice();
      newArticles.sort((a,b)=> b[`${name}`]-a[`${name}`]);
      setArticles(newArticles);
      arr[value]=1;
      setSortArr(arr)

   }
  }

 
  useEffect(()=>{
    BringArticles()
  },[])
  
  return (
    <div className="App">
       {Loading? 
         <div key="LoadingBox"></div>:<div key="insideBox" className="InsideBox">
           
            {showDashboard?<React.Fragment>
              <DashBoard></DashBoard>
              </React.Fragment>:<React.Fragment><div key="leftBox" className="LeftBox">
              
            <div style={{display:"flex",flexDirection:"row"}}>
                
                <div style={{width:"70%",margin:"0px",padding:"0px"}}>
                    <DisplayInfo title="Title" info={article.title}></DisplayInfo>
                    <DisplayInfo title="Insight" info={article.insight}>{article.insight}</DisplayInfo>
                </div>
                
                <div style={{width:"30%",margin:"0px",padding:"0px"}}>
                    <DisplayInfo title="Topic" info={article.topic}>{article.topic?article.topic:"-"}</DisplayInfo>
                    <DisplayInfo title="Sector" info={article.sector}>{article.sector?article.sector:"-"}</DisplayInfo>
                    <DisplayInfo title="Pestle" info={article.pestle}>{article.pestle?article.pestle:"-"}</DisplayInfo>
                </div>

            </div>

            <div key="titleBox" className="TitleBox">
                
                {ShowFilter?<Filter setArticles={setArticles} setArticle={setArticle} BringArticles2={BringArticles2} FilterValue={FilterValue} setFilterValue={setFilterValue} lastFilterValue={lastFilterValue} setlastFilterValue={setlastFilterValue}></Filter>:<div style={{display:"none"}}></div>}
                
                <table key="titleBar" className="titleSlideBar">
                    
                    <thead style={{position:"sticky",top:"0",background:"black",color:"white",fontWeight:"lighter"}}>
                    <th index="0" >Section</th>
                    <th  onClick={handleSortString} index="1">Title</th>
                    <th  onClick={handleSort} index="2">Likelihood</th>
                    <th  onClick={handleSort} index="3">Intensity</th>
                    <th  onClick={handleSort} index="4">Relevance</th>
                    </thead>

                    <tbody >
                    {
                      articles.map((e,i)=>{
                        return <TitleSlide key={`q${i+1}`} onClick={BringArticlesById} post={articles[i]} index={i+1} id={articles[i]._id}></TitleSlide>
                      })
                    }
                    </tbody>

                </table>

            </div>

            <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                <button onClick={()=>setShowFilter(!ShowFilter)} style={{padding:"2px 10px",margin:"2px 3px"}}>Filter</button>
                <button style={{padding:"2px 10px",margin:"2px 16px"}}>---</button>
            </div>

          </div>
          
          <div className="RightBox">
              <DisplayInfo title="Region" info={article.region}></DisplayInfo>
              <DisplayInfo title="Country" info={article.country}></DisplayInfo>
              <a href={article.url} style={{color:"black",textDecoration:"none"}}><DisplayInfo title="Source" info={article.source}></DisplayInfo></a>
              <DisplayInfo title="Published on" info={article.published}></DisplayInfo>
              <DisplayInfo title="Duration" info={`${article.start_year} - ${article.end_year}`}></DisplayInfo>
              <BarChart
              width={500}
              height={320}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              data={[
                { xAxisValue: "Likelihood", yAxisValue: article.likelihood },
                { xAxisValue: "Intensity", yAxisValue: article.intensity },
                { xAxisValue: "Relevance", yAxisValue: article.relevance },
                 { xAxisValue: "Impact", yAxisValue: article.impact===null?0:article.impact }
              ]}
            />
          </div></React.Fragment>}

         </div>}
        
          <div style={{padding:"15px", position:"fixed",bottom:"-5px",left:"48%",background:"white"}}>
         <button onClick={()=>{setshowDashboard(!showDashboard)}}>Dashboard</button>
         </div>
           
    </div>
  );
}

export default App;


