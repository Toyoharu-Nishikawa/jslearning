import {view} from "../view.js"
import {model} from "../model.js"
import {learning} from "./learning.js"
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
  displayFlag:null,
  parseData:function(csv){
    const data = csvParse(csv)
    const labels = data[0]
    const dataset = data.slice(1)
    return {
      labels: labels,
      dataset: dataset,
    }
  },
  makeDisplayFlag: function(N, displayMode){
    const displayFlag = 
      displayMode === "all" ? [...Array(N)].map(v=>[...Array(N)].fill(true)) :
      displayMode === "upperTriangle" ? [...Array(N)].map((u,i)=>[...Array(N)].map((v,j)=>i<=j?true:false)) :
      [...Array(N)].map((v,i)=>i===0?[...Array(N)].fill(true):[...Array(N)].fill(false))
    return displayFlag
  },
  plotData:function(labels, dataset, correlationCoefficiences,height, width, displayMode){
    if(this.table){
      this.table.element.remove() 
      this.table =null
    }

    const N = labels.length
    const displayFlag = this.makeDisplayFlag(N,displayMode)
    this.displayFlag = displayFlag

    const table = new Table(N)
    const values = transpose(dataset)
    labels.forEach((v,i,arr)=>{
      arr.forEach((u,j)=>{
        if(i===j){
          const x = values[i] 
          const elem =  table.getCell(i,j)
          const xlabel = v 
          if(displayFlag[i][j]){
            plot.plotHistogram(elem, x, xlabel,height,width)
          }
          else{
            plot.plotEmpty(elem,height,width)
          }
        }  
        else{
          const x = values[j] 
          const y = values[i] 
          const elem =  table.getCell(i,j)
          const xlabel = u 
          const ylabel = v 
          if(displayFlag[i][j]){
            if(i<j){
              plot.plotScatter(elem, x, y, xlabel, ylabel, height,width)
            }
            else{
              const corCoef = Math.round(correlationCoefficiences[j][i]*1E4)/1E4
              elem.innerHTML ="<p>"+ corCoef +"</p>"
              elem.className = "correlation"
            }
          }
          else{
            plot.plotEmpty(elem,height,width)
          }
        }
      }) 
    })
    view.elements.draw.appendChild(table.element)
    this.table = table
  },
  plotEmpty: function(elem,height,width){
      elem.style.height = `${height}px`
      elem.style.width = `${width}px`
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
  plotPointAndLine: async function(point){
    const samplingN = 101
    const minMax = model.minMax
    const predict = learning.predict 

    const minMaxIncUserInput = minMax.map((v,i)=>[Math.min(v[0], point[i]), Math.max(v[1], point[i])]) 

    const sampleSet = minMaxIncUserInput.map(
        v=>[...Array(samplingN)].map(
          (u,j)=>v[0]+(v[1]-v[0])*j/samplingN
        )
      )
    console.log(minMaxIncUserInput,point)
    const predictedPoint = await predict(point)
    console.log(predictedPoint) 
    const points = point.map(v=>Object({x:v, y:predictedPoint}))
    const lines = await Promise.all(sampleSet.map(async(v,i)=>{
        const x = v.map(u=>point.map((w,k)=>i===k?u:w))
        const y = await Promise.all(x.map(async u=>await predict(u)))
        return {
          x: x.map(u=>u[i]),
          y: y,
        }
      }))
    plot.update(points, lines)
  },
  update:function(points, lines){
    const table = this.table
    const displayFlag = this.displayFlag
    const list = [].concat({},points)
    list.forEach((v,i,arr)=>{
      arr.forEach((u,j)=>{
        if(displayFlag[i][j]){
          if(i<j){
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
        }
      })
    })
    console.log("update finished")
  },
  updateScatter:function(elem,x,y,lineX,lineY){
     const trace1 = {
      x: x ,
      y: y ,
      marker: {size: 7,color:"red"}, 
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
      //  Plotly.deleteTraces(elem, [1,2])
        const update = {x:data.map(v=>v.x), y:data.map(v=>v.y)}
        Plotly.restyle(elem, update,[1,2])
      }
      else if(elem.hasOwnProperty("data")){
        Plotly.addTraces(elem, data,[1,2])
      }
      else{
      }
    }
    else{
      const data = [trace1];
      
      if(elem.data.length>1){
       // Plotly.deleteTraces(elem, [1])
       const update = {x:data.map(v=>v.x), y:data.map(v=>v.y)}
       Plotly.restyle(elem, update,[1])
      }
      else if(elem.hasOwnProperty("data")){
        Plotly.addTraces(elem, data,[1])
      }
      else{
      }
     
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
