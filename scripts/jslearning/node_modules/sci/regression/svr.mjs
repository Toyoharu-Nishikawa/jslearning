import {getRandomInt, makeGaussKernel} from "../funcs/index.mjs"

"use strict"

export const simpleSVR = (x, y, beta=0.1, C=100,epsilon=0.01,tolerance=1E-3, maxIteration=30 )=>{
  const kernel = makeGaussKernel(beta)

  const originK = x.map((v,i,arr)=>[].concat(
    [...Array(i)].map((u,j)=>kernel(v,arr[j])),
    1
  ))

  const K = (i,j)=> i<j ? originK[j][i]: originK[i][j]

  const N = x.length
  const a = [...Array(N)].fill(0)

  let b = 0
  let count = 0 

  const fi = (i)=> a.map((v,j)=>v*K(j,i)).reduce((p,c)=>p+c,0)+b
  const EMap = new Map() 
  
  const getE = (i) => {
    if(EMap.has(i)){
      return EMap.get(i)
    }
    else {
      const e = fi(i) -y[i]
      EMap.set(i,e)
      return e
    }
  }
 
  while(count < maxIteration){
    let numChangedAlphas = 0
    for(let i=0;i<N;i++){
      const Ei = getE(i) 
      if( (Ei-epsilon > tolerance && a[i]<C) || (Ei+epsilon < tolerance && a[i]>-C) ){
        const j = getRandomInt(N)
        const Ej = getE(j) 
        const ai = a[i]
        const aj = a[j]
        const L =  Math.max(-C, ai+aj-C)
        const H =  Math.min(C, ai+aj+C)
        if(L===H){
          continue
        }
        const eta = 2*K(i,j)-K(i,i)-K(j,j)
        if(eta >=0){
          continue
        }
        const B = Math.sign(ai)+Math.sign(aj)
        const ajTemp = aj - (Ei-Ej+epsilon*B)/eta 
        const ajNew = ajTemp > H ? H :
                      ajTemp < L ? L: 
                      ajTemp
        if(Math.abs(ajNew-aj)<1E-5){
          continue
        }
        const aiNew = ai + aj-ajNew
        const Eei = aiNew >0 ? Ei+epsilon : Ei-epsilon 
        const Eej = ajNew >0 ? Ej+epsilon : Ej-epsilon 
        const b1 = b-Eei-(aiNew-ai)*K(i,i)-(ajNew-aj)*K(i,j)
        const b2 = b-Eej-(aiNew-ai)*K(i,j)-(ajNew-aj)*K(j,j)
        const bNew = (0< aiNew && aiNew < C) ? b1 :
            (0< ajNew && ajNew < C) ? b2 :
            (b1+b2)/2
        a[i] = aiNew
        a[j] = ajNew
        b = bNew
        EMap.clear() 
        numChangedAlphas++
      }
    }
    if(numChangedAlphas==0){
      count++
    }
    else{
      count = 0
    }
  }
  const alpha = a.filter(v=> v)
  const X = x.filter((v,i)=> a[i])
  const Y = y.filter((v,i)=> a[i])
  const f = (t)=> alpha.map((v,i)=>v*kernel(X[i],t)).reduce((p,c)=>p+c,0)+b
  return {
    predict: f,
    parameters: {alpha:alpha, b:b, beta:beta, x:X, y:Y}  
  }
}

export const SVR = (x, y, beta=0.1, C=100,epsilon=0.01, tolerance=1E-3)=>{
  const kernel = makeGaussKernel(beta)

  const originK = x.map((v,i,arr)=>[].concat(
    [...Array(i)].map((u,j)=>kernel(v,arr[j])),
    1
  ))

  const K = (i,j)=> i<j ? originK[j][i]: originK[i][j]

  const N = x.length
  const a = [...Array(N)].fill(0)

  let b = 0

  const fi = (i)=> a.map((v,j)=>v*K(j,i)).reduce((p,c)=>p+c,0)+b
  const EMap = new Map() 
  
  
  const getE = (i) => {
    if(EMap.has(i)){
      return EMap.get(i)
    }
    else {
      const e = fi(i) -y[i]
      EMap.set(i,e)
      return e
    }
  }
   
  const secondChoice = (i2)=>{
    const E2 = getE(i2)   
    const i = E2 >0 ? [...EMap.keys()].indexOf(Math.min(...EMap.values())) :
      [...EMap.keys()].indexOf(Math.min(...EMap.values()))
    const i1 = (i >-1 && i!==i2) ? i : getRandomInt(N)
    return i1 
  }
   
  const takeStep = (i1,i2)=>{
    if(i1===i2){
      return 0
    }    
    const a1 = a[i1]
    const y1 = y[i1]    
    const E1 = getE(i1)
    const y2 = y[i2]    
    const a2 = a[i2]
    const E2 = getE(i2)
   
    const L =  Math.max(-C, a1+a2-C)
    const H =  Math.min(C, a1+a2+C)
    if(L===H){
      return 0 
    }
    const K11 = K(i1,i1)
    const K22 = K(i2,i2)
    const K12 = K(i1,i2)
    const eta = 2*K12-K11-K22
    if(eta >=0){
      return 0 
    }
    const B = Math.sign(a1)+Math.sign(a2)
    const a2Temp = a2 - (E1-E2+epsilon*B)/eta 
    const a2New = a2Temp > H ? H :
                  a2Temp < L ? L: 
                  a2Temp
    if(Math.abs(a2New-a2)<1E-5*(a2New+a2+1E-5)){
      return 0 
    }
    const a1New = a1 + a2-a2New
    const Ee1 = a1New >0 ? E1+epsilon : E1-epsilon 
    const Ee2 = a2New >0 ? E2+epsilon : E2-epsilon 
    const b1 = b-Ee1-(a1New-a1)*K11-(a2New-a2)*K11
    const b2 = b-Ee2-(a1New-a1)*K12-(a2New-a2)*K22
    const bNew = (0< Math.abs(a1New) && Math.abs(a1New) < C) ? b1 :
                 (0< Math.abs(a2New) && Math.abs(a2New) < C) ? b2 :
                 (b1+b2)/2
 
    for(let i=0;i<N;i++){
      const Eold = getE(i) 
      const ENew = Eold + (a1New -a1)*K(i1,i)+(a2New -a2)*K(i2,i)+ bNew -b
      EMap.set(i,ENew)
    }
    b = bNew
    a[i1] = a1New
    a[i2] = a2New
    return 1 
  }
  
  const examineExample = (i2) =>{
    const a2 = a[i2]
    const E2 = getE(i2)
    if( (E2-epsilon > tolerance && a2<C) || (E2+epsilon < tolerance && a2>-C) ){
      if(a.filter(v=>0<Math.abs(v)&& Math.abs(v)<C).length>1){
        const i1 = secondChoice(i2)
        if(takeStep(i1,i2)){
          return 1
        }
      }
      const I = getRandomInt(N)
      for(let i=0;i<N;i++){
        const j = (I+i)%N
        if(0<a[j] && a[j]<C){
          const i1 = j 
          if(takeStep(i1,i2)){
            return 1
          }
        }
      }
      for(let i=0;i<N;i++){
        const j = (I+i)%N
        const i1 = j 
        if(takeStep(i1,i2)){
          return 1
        }
      } 
    }
    return 0
  }
  
  let numChanged = 0
  let examineAll = 1 
  
  while(numChanged>0 || examineAll){
    numChanged = 0
    if(examineAll){
      for(let i=0;i<N;i++){
        numChanged += examineExample(i)
      }
    }
    else{
      for(let i=0;i<N;i++){
        if(0<a[i] && a[i]<C){
          numChanged += examineExample(i)
        }
      }     
    }
    if(examineAll){
      examineAll=0
    }
    else if(numChanged==0){
      examineAll=1
    }
  }

  
  const alpha = a.filter(v=> v)
  const X = x.filter((v,i)=> a[i])
  const Y = y.filter((v,i)=> a[i])
  const f = (t)=> alpha.map((v,i)=>v*kernel(X[i],t)).reduce((p,c)=>p+c,0)+b
  return {
    predict: f,
    parameters: {alpha:alpha, b:b, beta:beta, x:X, y:Y}  
  }
}

export const SVRLoad = (parameters)=>{
  const a = parameters.alpha
  const b = parameters.b
  const beta = parameters.beta
  const x = parameters.x
  const y = parameters.y
 
  const kernel = makeGaussKernel(beta)
  const f = (t)=> a.map((v,i)=>v**kernel(x[i],t)).reduce((p,c)=>p+c,0)+b
  return f
}
