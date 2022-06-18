export const linEqGauss = (A, Va) =>{
  const nrc = Va.length

  const va = [].concat(Va)
  const m = A.map(a=>[].concat(a))
  const vx = [...Array(nrc)].fill(0)

  for (let i=0;i<nrc;i++){
    // ピボット選択（初項の絶対値が最大の行を一番上に持ってくる
    const col = m.slice(i,nrc).map(v=>Math.abs(v[i])) //i行目以降のi列絶値の配列
    const j = col.indexOf(Math.max(...col))+i //最大の要素の列番号
    if(j>-1 && i !==j){
      const tempV = va[i]
      const tempM = m[i]
      va[i] = va[j]
      va[j] = tempV
      m[i]  = m[j]
      m[j]  = tempM 
    }
   // i行目を1/m[i][i]倍 
    const div = m[i][i];
    va[i] /=div
    for(let j=i;j<nrc;j++){
      m[i][j] /= div
    }
    // j行目からi行目のm[j][i]倍を引く 
    for(let j=i+1;j<nrc;j++){ 
      const p = m[j][i]
      va[j] -= p*va[i]
      for(let k=i;k<nrc;k++)
        m[j][k] -= p*m[i][k]
    }
  }
  // 後退代入により解を求める 
  vx[nrc-1] = va[nrc-1];
  for (let j=2;j<=nrc;j++){
    let sum = 0
    for(let i = nrc-j+1;i<nrc;i++){
      sum += vx[i]*m[nrc-j][i]
    }
    vx[nrc-j] = va[nrc-j] - sum
  }
  
  return vx
}

export const LUDecomposition = (A, pivotFlag=true) =>{
  const nrc = A.length

  const m = A.map(a=>[].concat(a))
  const L = [...Array(nrc)].map(v=>[...Array(nrc)].fill(0))
  const P = [...Array(nrc)].map((v,i)=>i)

  for (let i=0;i<nrc;i++){
    if(pivotFlag){
      // ピボット選択（初項の絶対値が最大の行を一番上に持ってくる
      const col = m.slice(i,nrc).map(v=>Math.abs(v[i])) //i行目以降のi列絶値の配列
      const n = col.indexOf(Math.max(...col))+i //最大の要素の列番号
      
      if(n>-1 && i !==n){
        const tempP = P[i]
        const tempM = m[i]
        const tempL = L[i]
        P[i] = P[n]
        P[n] = tempP
        m[i] = m[n]
        m[n] = tempM 
        L[i] = L[n]
        L[n] = tempL 
      }
    }
    // j行目からi行目のm[j][i]倍を引く 
    for(let j=i+1;j<nrc;j++){ 
      const p = m[j][i]/m[i][i]
      L[j][i] = p
      for(let k=i;k<nrc;k++)
        m[j][k] -= p*m[i][k]
    }
  }
  for(let i=0;i<nrc;i++){
    L[i][i]=1
  }
  return {
    L: L,
    U: m,
    P: P,
  } 
}

export const LUSolve = (L,U,P,Va) =>{
  const nrc = Va.length
  const y = [...Array(nrc)].fill(0)
  const x = [...Array(nrc)].fill(0)
  const b = P.map((v,i)=>Va[v]) 
  //前進代入
  for(let i=0;i<nrc;i++){
    let sum = 0 
    for(let j=0;j<i;j++){
      sum  += L[i][j]*y[j]  
    }
    y[i] = (b[i] - sum)/L[i][i]
  } 
  //後進代入
  x[nrc-1] = y[nrc-1]/U[nrc-1][nrc-1]
  for(let j=2;j<=nrc;j++){
    let sum = 0
    for(let i = nrc-j+1;i<nrc;i++){
      sum += x[i]*U[nrc-j][i]
    }
    x[nrc-j] = (y[nrc-j] - sum)/U[nrc-j][nrc-j]
  }
  return x
} 


const searchOverlapping = (U, V) => {
  const UN = U.length
  const VN = V.length
  
  let i = 0
  let j = 0
  
  const list = []
  
  while(i<UN && j<VN){
    if(U[i][1]<=V[j][0]){
      i++ 
      continue
    } 
    if(V[j][1]<=U[i][0]){
      j++ 
      continue
    } 
    
    let start 
    if(U[i][0]<=V[j][0]) start = V[j][0] 
    else start = U[i][0]
    
    let end 
    if(U[i][1]<=V[j][1]){
      end = U[i][1]
      i++
    }  
    else{
      end = V[j][1]
      j++
    } 
    list.push([start, end])
  }
  return list
}

const addCandidate = (list, n) => {
  const N = list.length  
  if(N==0){
    list.push([n,n+1])
    return list
  }
  
  const lastNumber = list[N-1][1]
  if(n===lastNumber){
    list[N-1][1] = n+1
    return list
  }
  else{
   list.push([n,n+1]) 
   return list
  }
}


const makeNonZeroListJ = (nonZeroList) => {
  const nrc = nonZeroList.length
  const nonZeroListJ = [...Array(nrc)].map(v=>[])
  for(let i=0;i<nrc;i++){
    for(let m of nonZeroList[i]){
      for(let k=m[0];k<m[1];k++){
        addCandidate(nonZeroListJ[k], i)
      }
    }
  }
  return nonZeroListJ
}

export const modifiedCholeskyDecomposition = (A, method="skyline") => {
  switch(method){
    case "simple":{
      const LDobj = modifiedCholeskyDecomposition_simple(A)
      return LDobj
    }
    case "generalSkyline":{
      const LDobj = modifiedCholeskyDecomposition_generalSkyline(A)
      return LDobj
    }
    case "skyline":
    default: {
      const LDobj = modifiedCholeskyDecomposition_skyline(A)
      return LDobj
    }
  }
}

export const modifiedCholeskyDecomposition_simple =(A)=>{
  const nrc = A.length
 
  const d = [...Array(nrc)].fill(0)
  const L = [...Array(nrc)].map((v,i)=>[...Array(nrc)].map((u,j)=>i==j?1:0))
  
  d[0] = A[0][0]
  for(let i=1;i<nrc;i++){
    for(let j=0;j<i;j++){
      let s = 0
      for(let k=0;k<j;k++){
        s += L[i][k]*L[j][k]*d[k] 
      }
      L[i][j] = (A[i][j]-s)/d[j]
    } 
    let t = 0
    for(let k=0;k<i;k++){
      t += L[i][k]**2*d[k]
    }
    d[i]=A[i][i]-t
  }
  return {
    L: L,
    D: d,
  }
}


export const modifiedCholeskyDecomposition_skyline = (A) => {
  const nrc = A.length
 
  const d = [...Array(nrc)].fill(0)
  const L = [...Array(nrc)].map((v,i)=>[...Array(nrc)].map((u,j)=>i==j?1:0))
  const nonZeroListI = []

  const emptyEnd = []
  for(let i=0;i<nrc;i++){
    for(let j=0;j<i;j++){
      if(A[i][j] !=0){
        emptyEnd[i] = j
        break 
      }
    }
  }
 
  d[0] = A[0][0]
  nonZeroListI.push([[0,0]])
  for(let i=1;i<nrc;i++){
    const ti = emptyEnd[i]
    for(let j=0;j<i;j++){
      let s = 0
      const tj = emptyEnd[j]
      const kIni = Math.max(ti, tj)
      for(let k=kIni;k<j;k++){
        s += L[i][k]*L[j][k]*d[k] 
      }
      L[i][j] = (A[i][j]-s)/d[j]
    } 
    nonZeroListI.push([[ti,i]])
    let t = 0
    for(let k=ti;k<i;k++){
      t += L[i][k]**2*d[k]
    }
    d[i]=A[i][i]-t
  }

  const nonZeroListJ = makeNonZeroListJ(nonZeroListI)

  return {
    L: L,
    D: d,
    nonZeroListI: nonZeroListI,
    nonZeroListJ: nonZeroListJ,
  }
}


export const modifiedCholeskyDecomposition_generalSkyline = (A) => {
  const nrc = A.length
 
  const d = [...Array(nrc)].fill(0)
  const L = [...Array(nrc)].map((v,i)=>[...Array(nrc)].map((u,j)=>i==j?1:0))
  const nonZeroListI = []

  const emptyEnd = []
  for(let i=0;i<nrc;i++){
    for(let j=0;j<i;j++){
      if(A[i][j] !=0){
        emptyEnd[i] = j
        break 
      }
    }
  }
 
  d[0] = A[0][0]
  nonZeroListI[0] = [[0,0]]
  for(let i=1;i<nrc;i++){
    const ti = emptyEnd[i]
    const nonZeroCandidate = []
    nonZeroListI[i] = nonZeroCandidate 
    for(let j=0;j<i;j++){
      if(j<ti){
        L[i][j] = 0
      }
      else{
        let s = 0
        const U = nonZeroListI[j]
        const V = nonZeroListI[i]
        const overLapping = searchOverlapping (U, V)
        for(let m of overLapping){
          for(let k=m[0];k<m[1];k++){
            s += L[i][k]*L[j][k]*d[k] 
          }
        }
        const ss = A[i][j]-s
        L[i][j] = ss/d[j]
        if(Math.abs(ss)>1E-6){
          addCandidate(nonZeroCandidate,j)
        }
        nonZeroListI[i] = nonZeroCandidate 
      } 
    }
    let t = 0
    for(let k=ti;k<i;k++){
      t += L[i][k]**2*d[k]
    }
    d[i]=A[i][i]-t
  }
  const nonZeroListJ = makeNonZeroListJ(nonZeroListI)


  return {
    L: L,
    D: d,
    nonZeroListI: nonZeroListI,
    nonZeroListJ: nonZeroListJ,
  }
}


export const modifiedCholeskySolve =(LDobj,V)=>{

  const L = LDobj.L
  const D = LDobj.D
  const nonZeroListI = LDobj.nonZeroListI
  const nonZeroListJ = LDobj.nonZeroListJ

  const nrc = V.length
  const z = [...Array(nrc)].fill(0)
  const y = [...Array(nrc)].fill(0)
  const x = [...Array(nrc)].fill(0)

  //前進代入
  for(let i=0;i<nrc;i++){
    let sum = 0 
    if(nonZeroListI ===undefined){
      for(let j=0;j<i;j++){
        sum  += L[i][j]*z[j]  
      }
    }
    else{
      for(let m of nonZeroListI[i]){
        for(let j=m[0];j<m[1];j++){
          sum  += L[i][j]*z[j]  
        }
      }
    }
    z[i] = (V[i] - sum)/L[i][i]
  } 

  //D倍
  for(let i=0;i<nrc;i++){
    y[i] = z[i]/ D[i]
  }

  //後進代入
  x[nrc-1] = y[nrc-1]/L[nrc-1][nrc-1]
  for(let j=2;j<=nrc;j++){
    let sum = 0
    if(nonZeroListJ===undefined){
      for(let i = nrc-j+1;i<nrc;i++){
        sum += x[i]*L[i][nrc-j]
      }
    }
    else{
      for(let m of nonZeroListJ[nrc-j]){
        for(let i=m[0];i<m[1];i++){
          sum += x[i]*L[i][nrc-j]
        }
      }
    }
    x[nrc-j] = (y[nrc-j] - sum)/L[nrc-j][nrc-j]
  }
  return x
}



