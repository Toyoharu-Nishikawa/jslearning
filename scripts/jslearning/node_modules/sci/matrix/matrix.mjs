

//vector
export const mulScalarVec=(a, x0)=>{
  const y=x0.map(x=>x*a)
  return y
}

export const addVec = (x0,x1)=>{
  const y= x0.map((a,i)=>a+x1[i]) 
  return y
}

export const subVec = (x0,x1)=>{
  const y= x0.map((a,i)=>a-x1[i]) 
  return y
}

export const absVec = (x0)=>{
  const a2 = x0.reduce((pre,current)=>pre+current**2,0) 
  const a = Math.sqrt(a2)
  return a
}

export const innerProductVec=(x0,x1)=>{
  const y = x0.reduce((pre,current,i)=>pre+current*x1[i],0) 
  return y
}

//matrix
export const unitMat = (n)=> [...Array(n)].map((v,i)=> 
  [...Array(n)].map((u,j)=>i===j?1:0))

export const mulMatMat= (A,B)=>{
  const BT = transpose(B)
  const C = A.map(
    column=>BT.map(
      row=>row.reduce(
        (pre,current,k)=>pre+current*column[k],0
      )
    )
  )
  return C 
}

export const transpose = A=>A[0].map((k,i)=>A.map((v)=>v[i]))

export const mulScalarMat=(a, A)=>{
  const B=A.map(columns=>columns.map(x=>a*x))
  return B 
}

export const addMatMat = (A,B)=>{
  const C= A.map((columns,i)=>columns.map((a,j)=>a+B[i][j])) 
  return C 
}

export const subMatMat = (A,B)=>{
  const C= A.map((columns,i)=>columns.map((a,j)=>a-B[i][j])) 
  return C 
}

export const invMat = (A)=>{
  let temp, div, unko, sum;
  const nrc = A.length
  const m = A.map(a=>[].concat(a))
  const minv =  unitMat(nrc)
  
  for (let i=0;i<nrc;i++){
    for(let j=i+1;j<nrc;j++){ 
      if(m[i][i]*m[i][i]<m[j][i]*m[j][i]){
        for(let k=0;k<nrc;k++){
          temp = m[i][k];
          m[i][k] = m[j][k];
          m[j][k] = temp;
          temp = minv[i][k];
          minv[i][k] = minv[j][k];
          minv[j][k] = temp;
        }
      }
    }
    div = m[i][i];
    for(let j=0;j<nrc;j++){
      m[i][j] /= div;
      minv[i][j] /= div;
    }
    for(let j=0;j<nrc;j++){ 
      if(j!=i){
        unko = m[j][i];
        for(let k=0;k<nrc;k++){
          m[j][k] -= unko*m[i][k];
          minv[j][k] -= unko*minv[i][k];
        }
      }
    }
  }
  return minv
}

//matrix and vector
export const mulMatVec = (A,u)=>{
  const v = A.map(column=>column.reduce((pre,current,i)=>pre+current*u[i],0))
  return v
}
