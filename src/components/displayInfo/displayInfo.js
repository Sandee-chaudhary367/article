import "./displayInfo.css"

function DisplayInfo({title,info}) {
  return (
    <div style={{position:"relative",margin:"0 10px"}}>
       <span style={{position:"absolute",left:"10px",top:"-11px",padding:"2px 7px",background:"white"}}>{title}</span>
       <p style={{border:"1.5px solid black",padding:"10px 5px",borderRadius:"3px"}}>{info}</p>
    </div>
  );

}

export default DisplayInfo;