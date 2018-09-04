import {model} from "../model.js"

"use strict"

export const learning = {
  method:new Map(),
  randomForestRegression:function(trainingSet, predictions){
    const options = {
      seed: 3,
      maxFeatures: 2,
      replacement: false,
      nEstimators: 200
    }
    const regression = new ML.RandomForestRegression(options)
    regression.train(trainingSet, predictions)
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
    const result = 
      method ==="linear" ? regression.predict(point)[0]:
      method ==="random-forest" ? regression.predict([point])[0]:
      regression.predict(point)[0]
    return result 
  }
}

learning.method.set("linear", learning.multivariateLinearRegression)
learning.method.set("random-forest", learning.randomForestRegression)
