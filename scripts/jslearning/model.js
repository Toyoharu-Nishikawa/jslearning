import {view} from "./view.js"
import {table} from "./modules/table.js"
import {plot} from "./modules/plot.js"
import {importFiles} from "../filereader/index.js"
"use strict"

export const model ={
  initialize: function(){
    table.initialTable()
    plot.initialPlot()
  },
  import:{
    execute:function(){
      const element = view.elements.importFile 
      const text = []
      importFiles(element,text,()=>{
        const data = plot.parseData(text[0].text)   
        plot.plotData(data.labels, data.values,200, 250)
        table.setTable(data.labels,data.values)
      });
    }
 }
}
