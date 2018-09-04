import {learning} from "./learning.js"
import {plot} from "./plot.js"

"use strict"
export const table={
  point: null,
  cellEdit: function(e){
    const predict = learning.predict
    const list = e.getRow().getCells().map(v=>v.getValue())
    const point = list.slice(1,-1).map(parseFloat)

    const y = predict(point)
    e.getRow().getCell("target").setValue(y)
    plot.plotPointAndLine(point)

  },
  getPoint:function(){
    const cells = $("#table").tabulator("getData")
    const list = cells[0]
    const keys = Object.keys(list)
      .filter(v=>v.includes("value"))
      .sort((u, v)=>{
          const a = parseInt(u.split("value")[1])
          const b = parseInt(v.split("value")[1])
          const flag = a < b ? -1: 1
          return flag
        })
    const point = keys.map(v=>list[v])
    this.point = point
    return point
  },
  changeMethod:function(){
    const point = this.point
    const predict = learning.predict
    const y = predict(point)
 
    $("#table").tabulator("updateData",[{id:0, target:y}] )
  },
  setTable:function(labels, point){
    const predict = learning.predict
    const y = predict(point)
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

