import {view} from "../view.js"

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

const transpose = A=>A[0].map((k,i)=>A.map((v)=>v[i]))
const csvParse = csv => csv
  .split(/\r\n|\n|\r/) //split by line feed codes
  .filter((k)=>k.match(/[^,\s\f\n\r\t\v]/)) //remove empty lines
  .map(k=>k.trim() //remove white spaces of begining and end of line
    .replace(/,\s+/g,",") //remove white spaces
    .split(",") //split by cannma
    .map((l)=>isNaN(l)? l:parseFloat(l)) //convert string to flot
    )

export const plot ={
  table:null,
  initialPlot:function(){

    const initialData = 
      `target [-], value 0 [-] \n
        0,0 \n 1,1 \n 2,2\n
      `
    const data = this.parseData(initialData)

    this.plotData(data.labels, data.values,200, 250)
  },
  parseData:function(csv){
    const data = csvParse(csv)
    const labels = data[0]
    const values = transpose(data.slice(1))
    return {
      labels: labels,
      values: values,
    }
  },
  plotData:function(labels, values,height, width){
    if(this.table){
      this.table.element.remove() 
      this.table =null
    }

    const table = new Table(labels.length)
    view.elements.draw.appendChild(table.element)

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
    this.table = table
  },
  plotScatter:function(elem, x, y,  xlabel, ylabel,height,width){
     const trace1 = {
      x: x ,
      y: y ,
      marker: {size: 8}, 
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
