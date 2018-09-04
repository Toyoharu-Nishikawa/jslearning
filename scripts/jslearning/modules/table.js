import {model} from "../model.js"
import {plot} from "./plot.js"

"use strict"
export const table={
  cellEdit: function(e){
    console.log("e",e)  
    const list = e.getRow().getCells().map(v=>v.getValue())
    const point = list.slice(1,-1).map(parseFloat)

    const regression = model.regression
    const y = regression.predict([point])[0]
    console.log(y)
    e.getRow().getCell("target").setValue(y)
    plot.plotPointAndLine(point)

  },
  setTable:function(labels, point){
    const regression = model.regression
    const y = regression.predict([point])[0]
    if($("#table").tabulator()){
        $("#table").tabulator("destroy")
    }
    const columns = labels.map((v,i)=> i>0 ? 
      Object({title: v, field:`value${i-1}`,editor:"input",cellEdited:this.cellEdit}):
      Object({title: v, field:`target`})
    ).concat(Object({title:"id", field:"id", visible:false}))
    console.log(columns)
    $("#table").tabulator({
      height:"60px",
      columns:columns
      
    })
    const text = point.map((v,i)=>`value${i}`)
    const data = point.map(v=>v) 
    const data2 = text.map((v,i)=>{
      const d = {} 
      d[v]= data[i]
      return d
    })
    const data3 = Object.assign({target:y,id:0}, ...data2)
    console.log(data2)
    //$("#table").tabulator("setData",setData )
    $("#table").tabulator("setData",[data3] )
  }
}

