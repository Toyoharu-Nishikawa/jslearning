
export const cubicspline = (x, y, a0=0, an=0, method="M", differentiation=0) =>{
  try{
    if(x.length !== y.length){
      throw new RangeError("length of x must be equal to length of y") 
    }
    if(method !== "M" && method !=="m"){
      throw new RangeError("method must be M or m") 
    }
    if(differentiation >2){
      throw new RangeError("differentiation must be less than 2") 
    }
  }
  catch(e){
    console.log(e.name + " : " + e.message)
    return null
  }
  const num = x.length
  
  const h = x.map((v,i,arr)=> i ?x[i]-x[i-1]:0) 

  const ramda = h.map((v,i,arr)=> 
    (i===0 || i===arr.length-1)?0:h[i+1]/(h[i]+h[i+1])
  )
  const mu = ramda.map(v=>1-v) 
  const d= y.map((v,i,arr)=>
    (i===0 || i===arr.length-1) ? 0:
    6*((arr[i+1]-arr[i])/h[i+1]-(arr[i]-arr[i-1])/h[i])/(h[i]+h[i+1])
  )
  ramda[0] = method === "M" ? 0:
    method ==="m" ? 1: 0  
    
  mu[num-1] = method === "M" ? 0:
    method ==="m" ? 1: 0  
    
  d[0] = method === "M" ? 2*a0:
    method ==="m" ? 6/h[1]*((y[1]-y[0])/h[1] -a0):0  
    
  d[d.length-1] = method === "M" ? 2*an:
    method ==="m" ? 6/h[num-1]*(an-(y[num-1]-y[num-2])/h[num-1]):0  
  
  const b = [...Array(num)].fill(2)
  const A = b.reduce((pre,current, i)=>{
    const a = i ? current - mu[i]/pre[i-1]*ramda[i-1]:current  
    pre.push(a) 
    return pre
  },[])
  const B = d.reduce((pre,current,i)=>{
    const a2 = i ? current - mu[i]/A[i-1]*pre[i-1]: current 
    pre.push(a2)
    return pre
  },[])
 
  A.reverse()
  B.reverse()
  ramda.reverse()
  const M = A.reduce((pre,current,i)=>{
    const a3 = i? (B[i] - ramda[i]*pre[i-1])/current: B[i]/current 
    pre.push(a3)
    return pre
  }, [])
  M.reverse()

  if(differentiation ===-1){
    const F = (i, x0)=>{
      const y0= M[i]* (-((x[i+1]-x0)**4)/(24*h[i+1]) + (x[i+1]-x0)**2/12*h[i+1] ) 
        + M[i+1]* ( (x0 - x[i])**4/(24*h[i+1]) - (x0-x[i])**2/12*h[i+1] )
        - (x[i+1]-x0)**2/(2*h[i+1])*y[i]
        + (x0-x[i])**2/(2*h[i+1])*y[i+1]
      return y0
    }
    const Fs = (i)=>{
      return M[i]/24*h[i+1]**3 - h[i+1]/2*y[i]
    }
    const Fe =(i)=> {
      return -M[i+1]/24*h[i+1]**3 + h[i+1]/2*y[i+1]
    }
    const Fi = (i)=>{
      return Fe(i)-Fs(i)
    }
    return (x0, x1)=>{
      const index = x.reduce((pre,current,i)=>current <= x0 ? i: pre,0) 
      const i = index <x.length-1 ? index : x.length-2

      const jndex = x.reduce((pre,current,j)=>current <= x1 ? j: pre,0) 
      const j = jndex <x.length-1 ? jndex : x.length-2

      const y0 = i+1<j ? Fe(i)-F(i,x0) + [...Array(j-i-1)].map((v,k)=>Fi(i+1+k)).reduce((pre,current)=>pre+current,0)+F(j,x1)-Fs(j):
        i+1===j ? Fe(i)-F(i,x0)+F(j, x1)-Fs(j):
        i===j ? F(j,x1) -F(i, x0):
        F(j,x1) -F(i, x0)
      return y0
    }
  }
  else if(differentiation===0){
    return (x0)=>{
      const index = x.reduce((pre,current,i)=>current <= x0 ? i: pre,0) 
      const i = index <x.length-1 ? index : x.length-2
      const y0= M[i]* ( (x[i+1]-x0)**3/(6*h[i+1]) - (x[i+1]-x0)/6*h[i+1] ) 
        + M[i+1]* ( (x0 - x[i])**3/(6*h[i+1]) - (x0-x[i])/6*h[i+1] )
        + (x[i+1]-x0)/h[i+1]*y[i]
        + (x0-x[i])/h[i+1]*y[i+1]
      return y0
    }
  }
  else if(differentiation===1){
    return (x0)=>{
      const index = x.reduce((pre,current,i)=>current <= x0 ? i: pre,0) 
      const i = index <x.length-1 ? index : x.length-2
      const y0d = M[i]* ( -1*(x[i+1]-x0)**2/(2*h[i+1]) + h[i+1]/6)
        + M[i+1]* ( (x0-x[i])**2/(2*h[i+1]) - h[i+1]/6)
        + (y[i+1]-y[i])/h[i+1]
      return y0d
    }
  }
  else if(differentiation===2){
    return (x0)=>{
      const index = x.reduce((pre,current,i)=>current <= x0 ? i: pre,0) 
      const i = index <x.length-1 ? index : x.length-2
      const y0d2 = M[i]* (x[i+1]-x0)/h[i+1]
        + M[i+1]* (x0 - x[i])/h[i+1]
      return y0d2
    }
  }
  else{
    return null 
  }
}


export const cubicsplineLinear = (x, y, a0=0, an=0, method="M")=>{
  const spline = cubicspline(x, y, a0, an, method, 0) 
  const splineDiff1 = cubicspline(x, y, a0, an, method,1) 
  const x0 = x[0]
  const xN = x[x.length-1]

  const y0 = y[0]
  const yN = y[y.length-1]

  const diff0 = splineDiff1(x0)
  const diffN = splineDiff1(xN)

  const minX = Math.min(...x)
  const maxX = Math.max(...x)
  return x1 => x1  < minX ? (x1-x0)*diff0+y0:
    x1 > maxX ? (x1-xN)*diffN+yN:
    spline(x1)
}
