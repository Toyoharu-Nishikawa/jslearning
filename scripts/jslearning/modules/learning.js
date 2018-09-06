import {model} from "../model.js"

"use strict"

const polynominalize = (options)=>{
  return list => {
    const data = list.map((u,i)=>[...Array(options[i])].map((w,j)=>u**(j+1)))
    const res =  [].concat(...data)
    return res
  }
}

export const learning = {
  method:new Map(),
  polyFunc:null,
  randomForestRegression:function(trainingSet, predictions){
    const options = model.options.get("random-forest")
    const regression = new ML.RandomForestRegression(options)
    regression.train(trainingSet, predictions)
    return regression
  },
  polynominalRegression:function(trainingSet,predictions){
    const options = model.options.get("polynominal")
    console.log("options",options)
    const polyFunc = polynominalize(options)
    learning.polyFunc = polyFunc
    const increasedTrainingSet = trainingSet.map(polyFunc)
    const y = predictions.map(v=>[v])
    const regression = new ML.MultivariateLinearRegression(increasedTrainingSet,y)
    return regression
  
  },
  multivariateLinearRegression:function(trainingSet, predictions) {
    const y = predictions.map(v=>[v])
    const regression = new ML.MultivariateLinearRegression(trainingSet,y)
    return regression
  },
  predict:function(point){
    const regression = model.regression 
    const method = model.method
    const polyFunc = learning.polyFunc
    const result = 
      method === "linear" ? regression.predict(point)[0]:
      method === "polynominal" ? regression.predict(polyFunc(point))[0]:
      method === "random-forest" ? regression.predict([point])[0]:
      regression.predict(point)[0]
    return result 
  }
}

learning.method.set("linear", learning.multivariateLinearRegression)
learning.method.set("polynominal", learning.polynominalRegression)
learning.method.set("random-forest", learning.randomForestRegression)
