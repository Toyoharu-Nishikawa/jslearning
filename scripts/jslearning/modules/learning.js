"use strict"

export const learning = {
  randomForestRegression:function(trainingSet, predictions){
    const options = {
      seed: 3,
      maxFeatures: 2,
      replacement: false,
      nEstimators: 200
    }
    console.log(predictions)
    console.log(trainingSet)
    const regression = new ML.RandomForestRegression(options)
    regression.train(trainingSet, predictions)
    return regression
  },
  multivariateLinearRegression:function(trainingSet, predictions) {
    const y = predictions.map(v=>[v])
    const regression = new ML.MultivariateLinearRegression(trainingSet,y)
    return regression
  },
}
