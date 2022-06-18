import * as matrix from "../matrix/index.js"
import * as solve from "../solve/index.js"
import * as statistics from "../statistics/index.js"

"use strict"

export const singleRegression = (x, y)=>{
  const X = x.map(v=>[1,v])
  const Xt = matrix.transpose(X) 
  const XtX = matrix.mulMatMat(Xt,X)
  const Xty = matrix.mulMatVec(Xt,y)
  const w = solve.linEqGauss(XtX, Xty) 
  const f = (x)=>{
    const y = w[0] + x*w[1]
    return y
  }

  const obj = {
    predict: f,
    parameters: {weight: w}
  }
  return obj
}

export const singleRegressionLoad = (parameters)=>{
  const w = parameters.weight
  const f = (x)=>{
    const y = w[0] + x*w[1]
    return y
  }

  return f 
}
 
export const multipleRegression = (x, y)=>{
  const X = x.map(v=>[1,...v])
  const Xt = matrix.transpose(X) 
  const XtX = matrix.mulMatMat(Xt,X)
  const Xty = matrix.mulMatVec(Xt,y)
  const w = solve.linEqGauss(XtX, Xty) 
  const f = (x) => x.reduce((p,c,i)=>p+c*w[i+1],0)+w[0] 
  const obj = {
    predict: f,
    parameters: {weight:w}
  }
  return obj 
}

export const multipleRegressionLoad = (parameters)=>{
  const w = parameters.weight
  const f = (x)=> x.reduce((p,c,i)=>p+c*w[i+1],0) + w[0] 

  return f 
}

const makePolyList = (x, degree)=>[...Array(degree)].map((v,i)=>x**(i+1))

const polynomialize = (degree)=>{
  return list => {
    const data = list.map((v,i)=>makePolyList(v, degree))
    const res =  [].concat(...data)
    return res
  }
}

export const polynomialRegression = (x, y, degree=1)=>{
  const x2 = x.map(v=>makePolyList(v, degree))
 
  const X = x2.map(v=>[1,...v])
  const Xt = matrix.transpose(X) 
  const XtX = matrix.mulMatMat(Xt,X)
  const Xty = matrix.mulMatVec(Xt,y)
  const w = solve.linEqGauss(XtX, Xty) 

  const f = (x0) => makePolyList(x0, degree).reduce((p,c,i)=>p+c*w[i+1],0)+w[0] 
  const obj = {
    predict: f,
    parameters: {
      degree: degree,
      weight:w,
    }
  }
  return obj 
}

export const polynomialRegressionLoad = (parameters)=>{
  const degree = parameters.degree
  const w = parameters.weight

  const f = (x0) => makePolyList(x0,degree).reduce((p,c,i)=>p+c*w[i+1],0)+w[0] 

  return f 
}

