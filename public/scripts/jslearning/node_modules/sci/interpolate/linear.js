
const search = x => {
  const indexFunc = (x0) => {
    const index = x.reduce((pre,current,i)=>current <= x0 ? i: pre,0) 
    const i = index <x.length-1 ? index : x.length-2
    return i
  }
  return indexFunc
}


export const polyline = (x, y)=>{
  const indexFunc = search(x)
  const f = (x0) => {
    const i = indexFunc(x0) 
    const f0 = (y[i+1]-y[i])/(x[i+1]-x[i])*(x0-x[i])+y[i]
    return f0
  }
  const df = (x0) => {
    const i = indexFunc(x0) 
    const df0 = (y[i+1]-y[i])/(x[i+1]-x[i])
    return df0
  }
  const F = (x0, x1) => {
    const i0 = indexFunc(x0) 
    const i1 = indexFunc(x1) 
    const y0 = (y[i0+1]-y[i0])/(x[i0+1]-x[i0])*(x0-x[i0])+y[i0]
    const y1 = (y[i1+1]-y[i1])/(x[i1+1]-x[i1])*(x1-x[i1])+y[i1]
    const xS = x.slice(i0+1,i1+1)
    const yS = y.slice(i0+1,i1+1)
    const xS2 = [x0, ...xS, x1]
    const yS2 = [y0, ...yS, y1]

    let sum = 0
    const n = xS2.length
    for(let i=0;i<n-1;i++){
      sum += (xS2[i+1]-xS2[i])*(yS2[i+1]+yS2[i])/2
    }
    return sum
  }

  const obj = {F, f, df} 

  return obj 
}


export const stepLine = (x,y) => {
  const f = (t, lim="left") =>{
    const N = x.length
    let j =0
    if(t>x[0]){
      for(let i=0;i<N-1;i++){
        j=i
        const flag = (lim ==="left" || lim==="L") ? x[i] < t && t <= x[i+1] :  
          x[i] <= t && t < x[i+1]
        if(flag){
          break
        }
      } 
    }
    const s = (y[j+1]-y[j])/(x[j+1]-x[j])*(t-x[j])+y[j]
    return s
  }
  
  return f
}
