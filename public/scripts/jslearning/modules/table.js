
"use strict"
export const table={
  initialTable: function(){
    $("#table").tabulator({
      height:"60px",
      columns:[
        {title:"value 0", field:"value0",editor:"input"},
      ],
    })
    
    $("#table").tabulator("setData",[{value0:0}] )
  },
  setTable:function(labels, values){
    $("#table").tabulator("destroy")
     const columns = labels.slice(1).map((v,i)=>Object(
        {title: v, field:`value${i}`,editor:"input"}
     ))
     console.log(columns)
    $("#table").tabulator({
      height:"60px",
      columns:columns
      
    })
    const text = values.slice(1).map((v,i)=>`value${i}`)
    const data = values.slice(1).map((v,i)=>v[0]) 
    const data2 = text.map((v,i)=>{
      const d = {} 
      d[v]= data[i]
      console.log(d)
      return d
    })
    const data3 = Object.assign({}, ...data2)
    console.log(data2)
    //$("#table").tabulator("setData",setData )
    $("#table").tabulator("setData",[data3] )
  }
}

