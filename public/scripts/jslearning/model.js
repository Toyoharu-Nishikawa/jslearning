import {view} from "./view.js"
import {table} from "./modules/table.js"
import {plot} from "./modules/plot.js"
import {learning} from "./modules/learning.js"
import {csvParse,transpose} from "./modules/matrix.js"
import {importFiles} from "../filereader/index.js"
import {saveAs} from "../file-saver/FileSaver.js"

"use strict"

const randomForestInitalOption = {
  seed: 3,
  maxFeatures: 2,
  replacement: false,
  nEstimators: 200
}
const polynominalInitialOption = [3, 3, 3]

export const model ={
  values:null,
  regression:null,
  method: "linear",
  displayMode: "all",
  minMax:null,
  labels:null, 
  dataset:null,
  predictions:null,
  trainingSet:null, 
  regression:null,
  options:new Map([
    ["random-forest", randomForestInitalOption],
    ["polynominal", polynominalInitialOption],
  ]),
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
    const displayMode = model.displayMode

    model.set(labels, dataset,"linear",displayMode)
  },
  set:function(labels, dataset, method, displayMode){
    const dataT = transpose(dataset)
    const values =  dataT.slice(1)
    this.method = method
    plot.plotData(labels, dataset, 200, 250,displayMode)

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
  changeMethod: function(method, displayModeChangeFlag){
    const predictions = this.predictions 
    const trainingSet = this.trainingSet
    const code = this.importJSFile.code
    const regressionMethod = learning.method.get(method)
    const regression = regressionMethod(trainingSet, predictions,code)
    this.method=method
    this.regression = regression

    const point = table.getPoint()
    table.changeMethod(method)

    if(!displayModeChangeFlag){
      plot.plotPointAndLine(point)
    }
  },
  changeDisplayMode:function(displayMode){
    this.displayMode=displayMode
    const labels = this.labels 
    const dataset = this.dataset 
    const point = table.getPoint()
    plot.plotData(labels, dataset, 200, 250,displayMode)
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
        const displayMode= model.displayMode
        const valueLength = dataset[0].length-1
        const polynominalParameterList = [...Array(valueLength)].fill(3)
        model.options.set("polynominal", polynominalParameterList)
        model.set(labels, dataset,method, displayMode)
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
  optionChange: {
    current:"linear",
    list: new Map([
      ["linear", view.elements.linearOption], 
      ["polynominal", view.elements.polynominalOption], 
      ["random-forest", view.elements.randomforestOption], 
      ["user-function", view.elements.userfunctionOption], 
    ]),
    execute:function(){
      const select = view.elements.method.value
      const current = this.current
      this.list.get(current).style.display="none"
      this.list.get(select).style.display="block"
      this.current =select 
    }
  },
  importJSFile:{
    code:"",
    execute:function(){
      const self = this
      const text = []
      const element = view.elements.importUserFile 
      importFiles(element,text,()=>{
        self.code = text[0].text  
        view.elements.importUserFileName.textContent = text[0].filename  
      });
    },
  },
  submit: {
    execute: function(){
      const method = view.elements.method.value 
      const displayMode = view.elements.displayMode.value 
      console.log(method)
      console.log(displayMode)
      const methodChangeFlag = model.method !==method 
      const displayModeChangeFlag = model.displayMode !== displayMode

      console.log("methodChangeFlag", methodChangeFlag)
      console.log("displayModeChangeFlag", displayModeChangeFlag)

      if(methodChangeFlag){
        model.changeMethod(method, displayModeChangeFlag)
      }
      if(displayModeChangeFlag){
        model.changeDisplayMode(displayMode)
      }
    }
  }
}
