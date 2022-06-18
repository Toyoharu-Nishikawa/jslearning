export const sumList = x => { 
  const l = []
  let sum = 0
  for(let v of x){
    sum +=v 
    l.push(sum)
  }
  return l
}

