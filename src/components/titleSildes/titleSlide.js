import "./titleSlide.css"

function TitleSlide({post,index,id,onClick}) {
  return (
    <tr key={id} id={id} index={index} onClick={onClick}>
       <td className="valueCells" style={{width:"10%"}}>{index}.</td>
       <td className="valueCells" style={{width:"58%"}}>{post.title}</td>
       <td className="valueCells" style={{width:"10%"}}>{post.likelihood}</td>
       <td className="valueCells" style={{width:"10%"}}>{post.intensity}</td>
       <td className="valueCells" style={{width:"10%"}}>{post.relevance}</td>
    </tr>
  );

}

export default TitleSlide;
