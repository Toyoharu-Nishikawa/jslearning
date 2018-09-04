import {view} from "../view.js"
import {model} from "../model.js"
import {transpose, csvParse} from "./matrix.js"

"use strict"

class Table{
  constructor(N){
    this.N = N
    const table= document.createElement("table") 
    const tr = [...Array(N)].map(v=>document.createElement("tr"))
    const td = [...Array(N*N)].map(v=>document.createElement("td"))
    td.forEach((v,i)=>{
      tr[(i-i%N)/N].appendChild(v)
    })
    tr.forEach(v=>{
      table.appendChild(v)
    })
    this.table  = table
    this.td = td
  }
  get element(){
    return this.table
  }
  getCell(i,j){
    const N = this.N
    return  this.td[N*i+j]   
  }
}


export const plot ={
  table:null,
  parseData:function(csv){
    const data = csvParse(csv)
    const labels = data[0]
    const dataset = data.slice(1)
    return {
      labels: labels,
      dataset: dataset,
    }
  },
  plotData:function(labels, dataset, height, width){
    if(this.table){
      this.table.element.remove() 
      this.table =null
    }

    const table = new Table(labels.length)
    const values = transpose(dataset)
    labels.forEach((v,i,arr)=>{
      arr.forEach((u,j)=>{
        if(i===j){
          const x = values[i] 
          const elem =  table.getCell(i,j)
          const xlabel = v 
          plot.plotHistogram(elem, x, xlabel,height,width)
        }  
        else{
          const x = values[j] 
          const y = values[i] 
          const elem =  table.getCell(i,j)
          const xlabel = u 
          const ylabel = v 
          plot.plotScatter(elem, x, y, xlabel, ylabel, height,width)
        }
      }) 
    })
    view.elements.draw.appendChild(table.element)
    this.table = table
  },
  plotScatter:function(elem, x, y,  xlabel, ylabel,height,width){
     const trace1 = {
      x: x ,
      y: y ,
      marker: {size: 5}, 
      mode: 'markers', 
      name: 'sample', 
      type: 'scatter', 
    };

    const data = [trace1];
    const layout = {
      autosize: true, 
      height: height, 
      title: false, 
      width: width, 
      showlegend:false,
      xaxis: {
        autorange: true, 
        title: xlabel, 
        type: 'linear'
      }, 
      yaxis: {
        autorange: true, 
        title: ylabel, 
        type: 'linear'
      },
      margin:{
        l: 50,
        r: 50,
        b: 40,
        t: 20,
        pad:0,
      },
    };
    Plotly.newPlot(elem,data, layout,{
       // editable: true,
        displayModeBar:false,
        scrollZoom: true,
        showLink: false,
        displaylogo: false,
        modeBarButtonsToRemove: ['sendDataToCloud']
      }
    )
  },
  plotPointAndLine:function(point){
    const samplingN = 101
    const values = model.values
    const regression = model.regression

    const valIncUserInput = values.map((v,i)=>v.concat(point[i]))
    const minMax = valIncUserInput.map(v=>[Math.min(...v), Math.max(...v)]) 
    const sampleSet = minMax.map(
        v=>[...Array(samplingN)].map(
          (u,j)=>v[0]+(v[1]-v[0])*j/samplingN
        )
      )
    const predictedPoint = regression.predict(point)[0]//regression.predict([point])[0]
    //const predictedPoint = regression.predict([point])[0]
    console.log(predictedPoint) 
    const points = point.map(v=>Object({x:v, y:predictedPoint}))
    const lines = sampleSet.map((v,i)=>{
        const x = v.map(u=>point.map((w,k)=>i===k?u:w))
        const y = x.map(v=>regression.predict(v)[0])//regression.predict(x)
     //   const y = regression.predict(x)
        return {
          x: x.map(u=>u[i]),
          y: y,
        }
      })
    plot.update(points, lines)
  },
  update:function(points, lines){
    const table = this.table
    const list = [].concat({},points)
    list.forEach((v,i,arr)=>{
      arr.forEach((u,j)=>{
        if(i!=j){
          const cell = table.getCell(i,j) 
          const x = j>0?[u.x] : [v.y]
          const y = i>0?[v.x] : [u.y]
          const lineX = i==0 && j>0 ? lines[j-1].x: 
            i>0 && j===0 ?lines[i-1].y:
            null
          const lineY = i==0 && j>0 ? lines[j-1].y:
            i>0 && j===0 ?lines[i-1].x:
            null
          plot.updateScatter(cell,x,y, lineX, lineY)
        }
      })
    })
  },
  updateScatter:function(elem,x,y,lineX,lineY){
     const trace1 = {
      x: x ,
      y: y ,
      marker: {size: 5,color:"red"}, 
      mode: 'markers', 
      name: 'sample', 
      type: 'scatter', 
    };
    const trace2 = {
      x: lineX ,
      y: lineY ,
      marker: {size: 5,color:"red"}, 
      mode: 'lines', 
      name: 'sample', 
      type: 'scatter', 
    };
    if(lineX && lineY){
      const data = [trace1,trace2];
      if(elem.data.length>2){
        Plotly.deleteTraces(elem, [1,2])
      }
      Plotly.addTraces(elem, data,[1,2])
    }
    else{
      const data = [trace1];
      if(elem.data.length>1){
        Plotly.deleteTraces(elem, [1])
      }
      Plotly.addTraces(elem, data,[1])
    }


  },
  plotHistogram:function(elem, x,xlabel,height,width){
    const trace = {
      x:x,
      type:"histogram"
    }
    const data = [trace]
    const layout = {
      autosize: true, 
      height: height, 
      title: false, 
      width: width, 
      xaxis: {
        autorange: true, 
        title: xlabel, 
        type: 'linear'
      }, 
      margin:{
        l: 50,
        r: 50,
        b: 40,
        t: 20,
        pad:0,
      },
    };
    Plotly.newPlot(elem,data, layout,{
       // editable: true,
        displayModeBar:false,
        scrollZoom: true,
        showLink: false,
        displaylogo: false,
        modeBarButtonsToRemove: ['sendDataToCloud']
      }
    )
  },
}
