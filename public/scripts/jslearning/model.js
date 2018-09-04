import {view} from "./view.js"
import {table} from "./modules/table.js"
import {plot} from "./modules/plot.js"
import {learning} from "./modules/learning.js"
import {csvParse,transpose} from "./modules/matrix.js"
import {importFiles} from "../filereader/index.js"
import {saveAs} from "../file-saver/FileSaver.js"

"use strict"

export const model ={
  values:null,
  regression:null,
  method: "linear",
  minMax:null,
  initialize: function(){

    const labels =  ["target[-]", "value0[-]", "value1[-]", "value2[-]"]
    const dataset = [
      [152, 73, 80, 75],
      [185, 93, 88, 93],
      [180, 89, 91, 90],
      [196, 96, 98,100],
      [142, 73, 66, 70],
      [101, 53, 46, 55],
      [149, 69, 74, 77],
      [115, 47, 56, 60],
      [175, 87, 79, 90],
      [164, 79, 70, 88],
      [141, 69, 70, 73],
      [141, 70, 65, 74],
      [184, 93, 95, 91],
      [152, 79, 80, 73],
      [148, 70, 73, 78],
      [192, 93, 89, 96],
      [147, 78, 75, 68],
      [183, 81, 90, 93],
      [177, 88, 92, 86],
      [159, 78, 83, 77],
      [177, 82, 86, 90],
      [175, 86, 82, 89],
      [175, 78, 83, 85],
      [149, 76, 83, 71],
      [192, 96, 93, 95],
    ]

    model.set(labels, dataset,"linear")
  },
  set:function(labels, dataset, method){
    const dataT = transpose(dataset)
    const values =  dataT.slice(1)
    this.method = method
    plot.plotData(labels, dataset, 200, 250)

    const minMax = values.map(v=>[Math.min(...v), Math.max(...v)]) 
    this.minMax = minMax
    this.labels = labels
    this.dataset = dataset

    const predictions = dataT[0]
    const trainingSet = transpose(values)
    const regressionMethod = learning.method.get(method)
    const regression = regressionMethod(trainingSet, predictions)

    this.predictions = predictions
    this.trainingSet = trainingSet 
    this.regression = regression

    const point = trainingSet[0]
 
    table.setTable(labels, point)

    plot.plotPointAndLine(point)
  },
  changeMethod: function(method){
    const predictions = this.predictions 
    const trainingSet = this.trainingSet
  
    const regressionMethod = learning.method.get(method)
    const regression = regressionMethod(trainingSet, predictions)
    this.method = method
    this.regression = regression

    const point = table.getPoint()
 
    table.changeMethod(method)

    plot.plotPointAndLine(point)
  
  },
  import:{
    execute:function(){
      const element = view.elements.importFile 
      const text = []
      const method = model.method
      importFiles(element,text,()=>{
        const data = plot.parseData(text[0].text)   
        const labels = data.labels
        const dataset= data.dataset
        model.set(labels, dataset,method)
      });
    }
  },
  export:{
    execute:function(){
      const modelJSON = model.regression.toJSON()
      console.log(modelJSON)
      const exportText = JSON.stringify(modelJSON,null, "  ")
      const filename = "jslearning.model.json"
      const exportFileBOM = true
      const blob = new Blob([exportText], {type: 'text/plain; charset=utf-8'});
      saveAs(blob, filename,exportFileBOM);
    },
  },
  submit: {
    execute: function(){
      const text = view.elements.method.value 
      console.log(text)
      if(text===model.method){
        return
      }
      model.changeMethod(text)
    }
  }
}
