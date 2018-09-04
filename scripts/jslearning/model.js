import {view} from "./view.js"
import {table} from "./modules/table.js"
import {plot} from "./modules/plot.js"
import {learning} from "./modules/learning.js"
import {csvParse,transpose} from "./modules/matrix.js"
import {importFiles} from "../filereader/index.js"
"use strict"

export const model ={
  values:null,
  regression:null,
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

    model.set(labels, dataset)
  },
  set:function(labels, dataset){
    const dataT = transpose(dataset)
    const values =  dataT.slice(1)
    this.values = values
    plot.plotData(labels, dataset, 200, 250)
   
    const predictions = dataT[0]
    const trainingSet = transpose(values)
    //const regression = learning.randomForestRegression(trainingSet, predictions)
    const regression = learning.multivariateLinearRegression(trainingSet, predictions)
    this.regression = regression

    const point = trainingSet[0]
 
    table.setTable(labels, point)

    plot.plotPointAndLine(point)
  },
  import:{
    execute:function(){
      const element = view.elements.importFile 
      const text = []
      importFiles(element,text,()=>{
        const data = plot.parseData(text[0].text)   
        const labels = data.labels
        const dataset= data.dataset
        model.set(labels, dataset)
      });
    }
 }
}
