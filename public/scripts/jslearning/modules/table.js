import {learning} from "./learning.js"
import {plot} from "./plot.js"

"use strict"
export const table={
  point: null,
  R2:null,
  tabu: new Tabulator("#table",{
    height:"60px",
    clipboard: true,
    clipboardCopyStyled: false,
  }),
  tabu2: new Tabulator("#table2",{
    height:"60px",
    layout:"fitColumns",
    clipboard: true,
    clipboardCopyStyled: false,
    columns:[{title: "R2", field:"R2"}]
  }),
  cellEdit: async function(e){
    const predict = learning.predict
    const list = e.getRow().getCells().map(v=>v.getValue())
    const point = list.slice(1).map(parseFloat)

    const y = await predict(point)
    e.getRow().getCell("target").setValue(y)
    plot.plotPointAndLine(point)

  },
  getPoint:function(){
    const cells = this.tabu.getData()
    const list = cells[0]
    const keys = Object.keys(list)
      .filter(v=>v.includes("value"))
      .sort((u, v)=>{
          const a = parseInt(u.split("value")[1])
          const b = parseInt(v.split("value")[1])
          const flag = a < b ? -1: 1
          return flag
        })
    const point = keys.map(v=>parseFloat(list[v]))
    console.log("point",point)
    this.point = point
    return point
  },
  changeMethod:async function(){
    const tabu = this.tabu
    const point = this.point
    const predict = learning.predict
    const y = await predict(point)
 
    tabu.updateData([{id:0, target:y}] )
  },
  setTable:async function(labels, point){
    const tabu = this.tabu

    const predict = learning.predict
    const y = await predict(point)

    const columns = labels.map((v,i)=> i===0 ? 
      Object({title: v, field:"target"}):
      Object({title: v, field:v, editor:"input",cellEdited:this.cellEdit})
    )

    const data = [Object.assign({id:0,target:y,}, ...point.map((v,i)=>Object({[labels[i+1]]:v})))]

    tabu.setColumns(columns)
    tabu.updateOrAddData(data)

 },
  setR2: function(R2){
    const tabu2 = this.tabu2
    this.R2 = R2
    const data2 = [{id:0, R2:R2}]
    tabu2.updateOrAddData(data2)
  },
}

