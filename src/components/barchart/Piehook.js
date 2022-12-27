import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Pie = props => {
  const ref = useRef(null);
  const createPie = d3
    .pie()
    .value(d => d.count)
    .sort(null);
  const createArc = d3
    .arc()
    .innerRadius(props.innerRadius)
    .outerRadius(props.outerRadius);
  const colors = d3.scaleOrdinal(d3.schemeCategory10);
  const format = d3.format('d');

  useEffect(() => {
    console.log(props.data)
    const data = createPie(props.data);
    const group = d3.select(ref.current);

    const groupWithData1=group.selectAll("g.arc").data(data);

    const groupWithUpdate = groupWithData1
      .enter()
      .append('g')
      .attr('class', 'arc');

    const path = groupWithUpdate.append('path').merge(groupWithData1.select('path.arc'));

    path
      .attr('class', 'arc')
      .attr('d', createArc)
      .attr('fill', (d, i) => colors(i));

    const text = groupWithUpdate.append('text').merge(groupWithData1.select('text'));

    text
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('transform', d => `translate(${createArc.centroid(d)})`)
      .style('fill', 'white')
      .style('font-size', 10)
      .text(d => format(d.value));

    const groupWithData = group.selectAll('.legends').data(data);
    
    const legends=groupWithData.enter().append("g").classed("legends",true).attr("transform",(d,i)=>{
        return "translate(105," +(i+1)*20+")"
    });
    
   // console.log(groupWithData.select("rect"));
    let lrect=legends.append("rect").merge(groupWithData.select("rect"));
    
    lrect.classed("lrect",true).attr("width",10).attr("height", 10)
    .attr("fill", function(d, i) {
      console.log(d)
      return colors(i);
    })

    let ltxt=legends.append("text").merge(groupWithData.select("text"));
    
    ltxt.classed("ltxt",true).attr("x",20).attr("y", 10)
    .attr("fill", function(d, i) {
      return "black";
    }).text((d)=>d.data._id.toLowerCase())


  }, [props.data]);

  return (
    <svg width={props.width+60} height={props.height+20}>
      <g ref={ref} transform={`translate(${props.outerRadius} ${props.outerRadius})`} />
    </svg>
  );
};

export default Pie;