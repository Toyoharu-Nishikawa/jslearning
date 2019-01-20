import {model} from "../model.js"
import * as sciReg from "../node_modules/sci/regression/index.mjs"

"use strict"

const makePolyList = (x, n)=>[...Array(n)].map((v,i)=>x**(i+1))
// x => [x, x**2, x**3, ... , x**n]

const polynominalize = (degree)=>{
  return list => {
    const data = list.map((v,i)=>makePolyList(v, degree[i]))
    const res =  [].concat(...data)
    return res
  }
}

export const learning = {
  method:new Map(),
  polyFunc:null,
  linearRegression:function(x, y) {
    const regression = sciReg.linearRegression(x, y)
    return regression
  },
  polynominalRegression:function(x, y){
    const options = model.options.get("polynominal")
    const degree = options.degree
    console.log(degree)
    const regression = sciReg.polynominalRegression(x, y, degree)
    return regression
  },
  gaussKernelRegression:function(x, y) {
    const options = model.options.get("gaussKernel")
    const beta = options.beta
    const C = options.C
    console.log(beta, C)
    const regression = sciReg.gaussKernelRegression(x, y, beta, C)
    return regression
  },
  SVR:function(x, y) {
    const options = model.options.get("SVR")
    const beta = options.beta
    const C = options.C
    const epsilon = options.epsilon
    const tolerance = options.tolerance
    console.log(beta, C, epsilon, tolerance)
    const regression = sciReg.SVR(x, y, beta, C, epsilon,tolerance)
    return regression
  },
  userFunction:function(trainingSet, predictions, code){
    const regression = {
      predict: new Function("x", code),
      toJSON:function(){return code},
    }
    return regression 
  },
  predict:function(point){
    const regression = model.regression 
    const result = regression.predict(point)
    return result 
  }
}

learning.method.set("linear", learning.linearRegression)
learning.method.set("polynominal", learning.polynominalRegression)
learning.method.set("gaussKernel", learning.gaussKernelRegression)
learning.method.set("SVR", learning.SVR)
learning.method.set("user-function", learning.userFunction)
