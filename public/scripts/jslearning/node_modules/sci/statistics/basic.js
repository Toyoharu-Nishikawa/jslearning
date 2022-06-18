"use strict"
export const average = data =>{
  const N = data.length
  const ave = data.reduce((p,c)=>p+c,0)/N
  return ave
}

export const variance = data =>{
  const vari = average(data.map(v=>v**2)) -average(data)**2
  return vari   
}

export const standard = data =>{
  return Math.sqrt(variance(data))
}

export const normalize = (data,...minMax) => {
  const min = minMax.length===2 ? minMax[0] : Math.min(...data)
  const max = minMax.length===2 ? minMax[1] : Math.max(...data)
  const delta = max -min
  const norm = delta >0 ? data.map(v=>(v-min)/delta) : data
  return norm
}  

export const standardize = (data, ...aveStd) => {
  const ave = aveStd.length===2 ? aveStd[0] : average(data)
  const std=  aveStd.length===2 ? aveStd[1] : standard(data)
  const stdr = std>0 ? data.map(v=>(v-ave)/std) : data
  return stdr 
} 

export const reNormalize = (data, min, max)=>{
  const delta = max -min
  const re = data.map(v=>v*delta+min)
  return re
}

export const reStandardize = (data,ave,std)=>{
  const re = data.map(v=>v*std+ave)
  return re
}

export const R2 = (x, y, f)=>{
  const std = variance(y)
  const N = x.length
  const estimated = x.map(f)
  const res = estimated.reduce((p,c,i)=>p+(y[i]-c)**2,0)/N
  const R2 = 1- res/std 

  return R2
}

export const covariance = (x, y) => {
  const aveX = average(x)
  const aveY = average(y)
  const xy = x.map((v,i)=>v*y[i])
  const aveXY = average(xy)
  const covariance = aveXY - aveX*aveY
  return covariance
}

export const correlationCoefficient = (x, y) => {
  const covXY = covariance(x,y)
  const stdX = standard(x)
  const stdY = standard(y)
  const correlation = covXY/(stdX*stdY)
  return correlation
} 

export const correlationAnalysis = (x) => {
  const m = x.length
  const n = x[0].length
  const aveList = [...Array(n)].fill(0)
  for(let i=0; i<m; i++){
    for(let j=0;j<n;j++){
      aveList[j] += x[i][j]
    }
  }
  for(let j=0;j<n;j++){
    aveList[j] /= m
  }
  const stdList = [...Array(n)].fill(0)
  for(let i=0;i<m;i++){
    for(let j=0;j<n;j++){
      stdList[j] += (x[i][j] - aveList[j])**2
    }
  }
  for(let j=0;j<n;j++){
    stdList[j] = Math.sqrt(stdList[j])
  }

  const combination = []
  for(let j=0;j<n;j++){
    const list = [...Array(n-1-j)].map((v,k)=>k+j+1)
    for(let v of list){
      combination.push([j,v])
    }
  }
  const cml = combination.length
  const cor = [...Array(cml)].fill(0)
  for(let i=0;i<m;i++){
    for(let k=0;k<cml;k++){
      const [c1, c2] = combination[k]
      cor[k] += (x[i][c1] - aveList[c1])*(x[i][c2] - aveList[c2])
    }
  }

  
  const correationCoefficient = []
  for(let k=0;k<cml;k++){
    const [c1, c2] = combination[k]
    correationCoefficient[k] = cor[k] /(stdList[c1]*stdList[c2])
  }

  const corList = [...Array(n)].map(v=>[])
  for(let k=0;k<cml;k++){
    const [c1, c2] = combination[k]
    corList[c1][c2] = correationCoefficient[k] 
  }

  return corList 

}
 

