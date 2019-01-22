import {view} from "./view.js"
import {table} from "./modules/table.js"
import {plot} from "./modules/plot.js"
import {learning} from "./modules/learning.js"
import {csvParse,transpose} from "./modules/matrix.js"
import {importFiles} from "../filereader/index.js"
import * as statistics from "../sci/statistics/index.mjs"

"use strict"

const polynominalInitialOption = {
  degree: [3, 3, 3],
}

const gaussKernelInitialOption = {
  beta: 0.1,
  C: 100,
}

const SVRInitialOption = {
  beta: 0.1,
  C: 100,
  eplison: 1E-2,
  tolerance: 1E-3,
}

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
  options: new Map([
    ["linear", null],
    ["polynominal", polynominalInitialOption],
    ["gaussKernel", gaussKernelInitialOption],
    ["SVR", SVRInitialOption],
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
  set:async function(labels, dataset, method, displayMode){
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
    console.log("predictions", predictions)
    console.log("trainingSet", trainingSet)
    const regressionMethod = learning.method.get(method)
    const regression = regressionMethod(trainingSet, predictions)

    this.predictions = predictions
    this.trainingSet = trainingSet 
    this.regression = regression

    const point = trainingSet[0]

    const R2 = statistics.R2(trainingSet, predictions, regression.predict)
    table.setR2(R2)

    console.log("R2", R2)
 
    await table.setTable(labels, point)

    console.log("table", table.tabu.getData())

    plot.plotPointAndLine(point)
  },
  changeMethod: function(method, displayModeChangeFlag){
    const predictions = this.predictions 
    const trainingSet = this.trainingSet
    const code = this.importJSFile.code
    const regressionMethod = learning.method.get(method)
    const regression = regressionMethod(trainingSet, predictions, code)
    this.method=method
    this.regression = regression

    const R2 = statistics.R2(trainingSet, predictions, regression.predict)
    table.setR2(R2)
    console.log("R2", R2)

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
    execute:async function(){
      const element = view.elements.importFile 
      const method = model.method
      const text = await importFiles(element)

      const data = plot.parseData(text[0].text)   
      const labels = data.labels
      const dataset= data.dataset
      const displayMode= model.displayMode
      const valueLength = dataset[0].length-1
      const polynominalParameterList = {
        degree: [...Array(valueLength)].fill(3)
      }
      model.options.set("polynominal", polynominalParameterList)
      model.set(labels, dataset, method, displayMode)
 
    }
  },
  export:{
    execute:function(){
      const modelJSON = model.regression.parameters
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
      ["gaussKernel", view.elements.gaussKernelOption], 
      ["SVR", view.elements.SVROption], 
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
    elemMap: new Map([
      ["linear", view.elements.linearOption], 
      ["polynominal", view.elements.polynominalOption], 
      ["gaussKernel", view.elements.gaussKernelOption], 
      ["SVR", view.elements.SVROption], 
    ]),
    changeOptions: function(method, values){
      switch(method){
        case "linear":{
          return false
        }
        case "polynominal": {
          const degreesString = values[0]
          const N =model.trainingSet[0].length 
          const degreesTmp = degreesString.split(",").map(v=>parseInt(v))
          const n = degreesTmp.length
          const degrees = [...Array(N)].map((v,i)=>i<n ?
             degreesTmp[i] :degreesTmp[n-1] )
          const options = model.options.get("polynominal")
          const degreesOld = options.degree
          const flag = degrees.every((v,i)=>v==degreesOld[i]) 
          if(flag){
            return false
          }
          else{
            options.degree = degrees
            return true
          }
        }
        case "gaussKernel": {
          const beta = parseFloat(values[0])
          const C = parseFloat(values[1])
          const options = model.options.get("gaussKernel")
          const betaOld = options.beta
          const COld = options.C
          const flag = beta == betaOld && C == COld
          if(flag){
           return false 
          }
          else{
            options.beta = beta
            options.C = C
            return true
          }
        }
        case "SVR": {
          const beta = parseFloat(values[0])
          const C = parseFloat(values[1])
          const epsilon = parseFloat(values[2])
          const tolerance = parseFloat(values[3])
          const options = model.options.get("SVR")
          const betaOld = options.beta
          const COld = options.C
          const epsilonOld = options.epsilon
          const tolerancOld = options.tolerance

          const flag = beta == betaOld && C == COld 
            && epsilon == epsilonOld && tolerance == toleranceOld

          if(flag){
           return false 
          }
          else{
            options.beta = beta
            options.C = C
            options.epsilon = epsilon
            options.tolerance = tolerance
            return true
          }
        }
      }
    },
    execute: function(){
      const method = view.elements.method.value 
      const displayMode = view.elements.displayMode.value 
      const inputElems = this.elemMap.get(method)
        .getElementsByTagName("input")
      const values = [...inputElems].map(v=>v.value)

      console.log("method", method)
      console.log("option", values)
      console.log("displaymode", displayMode)

      const methodChangeFlag = model.method !==method 
      const changeOptionFlag = this.changeOptions (method, values)
      const displayModeChangeFlag = model.displayMode !== displayMode

      console.log("methodChangeFlag", methodChangeFlag)
      console.log("displayModeChangeFlag", displayModeChangeFlag)

      if(methodChangeFlag || changeOptionFlag){
        model.changeMethod(method, displayModeChangeFlag)
      }
      if(displayModeChangeFlag){
        model.changeDisplayMode(displayMode)
      }
    }
  }
}
