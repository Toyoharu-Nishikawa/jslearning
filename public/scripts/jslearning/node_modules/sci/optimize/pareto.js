export const Pareto = class {
  constructor(data){
    this.data = []
    this.dataMap = new Map()
    this.paretoMap = new Map()
    this.currentId = 0
    
    if(data !==undefined){
      this.setData(data)
    }
  }
  setData(data){
    this.data = data
    this.dataMap = new Map(data.map((v,i)=>[i,v]))
    this.currentId = data.length-1
  }

  solveOne(dId, dValue){
    const paretoEntries = [...this.paretoMap.entries()]
    let addFlag = false
    for(let pEntry of paretoEntries){
      const pId = pEntry[0]
      const pValue = pEntry[1]
      const flags = pValue.map((v,i)=>v<dValue[i]?-1 : v>dValue[i]?1: 0)
      const equalityFlag = flags.every(v=>v==0)
      if(equalityFlag){
        addFlag = true 
        continue 
      }
      const inferiorFlag = flags.every(v=>v==-1||v==0)
      if(inferiorFlag){
        addFlag = false 
        break
      }
      const suferiorFlag = flags.every(v=>v==1||v==0)
      if(suferiorFlag){
        this.paretoMap.delete(pId)
        addFlag = true 
        continue
      }
      const nonInferiorFlag = flags.some(v=>v==1)
      if(nonInferiorFlag){
        addFlag = true 
        continue
      }
      else{
        addFlag = false 
        break 
      }
    }
    if(addFlag){
      this.paretoMap.set(dId, dValue) 
    }   
  } 
  solve(){
    const dataEntries = [...this.dataMap.entries()]
    for(let dEntry of dataEntries){
      const dId = dEntry[0]
      const dValue = dEntry[1]
      if(dId==0){
        this.paretoMap.set(dId, dValue)
        continue
      }
      this.solveOne(dId, dValue)
    }
  }
  addOneDataAndSolve(dValue){
    this.currentId++      
    const dId = this.currentId
    this.data.push(dValue) 
    this.dataMap.set(dId, dValue) 
    this.solveOne(dId, dValue)
  }
  addDataListAndSolve(dList){
    for(let dValue of dList){
      this.currentId++      
      const dId = this.currentId
      this.data.push(dValue) 
      this.dataMap.set(dId, dValue)      
      this.solveOne(dId, dValue)
    }
  }
  getParetoData(){
    const values = [...this.paretoMap.values()] 
    return values
  }
  getParetoDataIds(){
    const keys = [...this.paretoMap.keys()] 
    return keys
  }
  getParetoMap(){
    return this.paretoMap
  }
  getData(){
    return this.data
  }
  getDataMap(){
    return this.dataMap
  }

}



export const NonDominatedSorting = class {
   constructor(data){
    this.data = []
    this.dataMap = new Map()
    this.paretoMapList = []
    this.currentId = 0
    
    if(data !==undefined){
      this.setData(data)
    }
  }
  setData(data){
    this.data = data
    this.dataMap = new Map(data.map((v,i)=>[i,v]))
    this.currentId = data.length-1
  }
  discriminateOne(dId, dValue, paretoMap){
    let addFlag = false
    const deleteMap =new Map()
    for(let [pId, pValue] of paretoMap){
      const flags = pValue.map((v,i)=>v<dValue[i]?-1 : v>dValue[i]?1: 0)
      const equalityFlag = flags.every(v=>v==0)
      if(equalityFlag){
        addFlag = true 
        continue 
      }
      const inferiorFlag = flags.every(v=>v==-1||v==0)
      if(inferiorFlag){
        addFlag = false 
        break
      }
      const suferiorFlag = flags.every(v=>v==1||v==0)
      if(suferiorFlag){
        deleteMap.set(pId, pValue)
        addFlag = true 
        continue
      }
      const nonInferiorFlag = flags.some(v=>v==1)
      if(nonInferiorFlag){
        addFlag = true 
        continue
      }
      else{
        addFlag = false 
        break 
      }
    }
    const obj = {
      addFlag: addFlag,
      deleteMap: deleteMap,
    }
    return obj
  } 
  append(dId, dValue){
    const paretoMapList = this.paretoMapList
    const discriminateOne = this.discriminateOne

    const listMap = new Map([[dId, dValue]])
    for(let paretoMap of paretoMapList){
      for(let [id, value] of listMap){
        const {addFlag, deleteMap} = discriminateOne(id, value, paretoMap)
        if(addFlag){
          paretoMap.set(id, value)
          listMap.delete(id)
          for(let [deleteId, deleteValue] of deleteMap){
            listMap.set(deleteId, deleteValue)
            paretoMap.delete(deleteId)
          }
        }
      }
    }
    if(listMap.size>0){
      const paretoMap = new Map()
      for(let [id, value] of listMap){
        paretoMap.set(id, value)
        listMap.delete(id)
      }
      paretoMapList.push(paretoMap)
    }
  }
  solve(){
    const dataMap = this.dataMap 
    for(let [dId, dValue] of dataMap){
      this.append(dId, dValue)
    }
  }
  addOneDataAndSolve(dValue){
    this.currentId++      
    const dId = this.currentId
    this.data.push(dValue) 
    this.dataMap.set(dId, dValue) 
    this.append(dId, dValue)
  }
  addDataListAndSolve(dList){
    for(let dValue of dList){
      this.currentId++      
      const dId = this.currentId
      this.data.push(dValue) 
      this.dataMap.set(dId, dValue)      
      this.append(dId, dValue)
    }
  }

  getParetoMapList(){
    //return Map Array
    const list = this.paretoMapList
    return list
  }
  getParetoRankMap(){
    const rankMap = new Map()
    let rank = 0
    for(let paretoMap of this.paretoMapList){
      for(let id of paretoMap.keys()){
        rankMap.set(id, rank)
      }
      rank++
    }
    return rankMap 
  }
  getParetoDataList(){
    const list = this.paretoMapList
    const data = []
    for(let paretoMap of list){
      const values = [...paretoMap.values()]
      data.push(values)
    }
    return data 
  }
  getParetoDataIdList(){
    const list = this.paretoMapList
    const Ids = []
    for(let paretoMap of list){
      const values = [...paretoMap.keys()]
      Ids.push(values)
    }
    return Ids
  }
  getData(){
    return this.data
  }
  getDataMap(){
    return this.dataMap
  }
}




export const dominates = (pValues, dValues) => {
  const n = pValues.length
        
  let and_condition = true
  let or_condition = false
        
  for(let i=0;i<n;i++){
    and_condition = and_condition && pValues[i] <= dValues[i]
    or_condition = or_condition || pValues[i] < dValues[i]
  }
  const p_dominates_d = and_condition && or_condition
  return p_dominates_d
}

export const FastNonDominatedSorting = class {

  constructor(data){
    this.data = []
    this.myDominatingIds = []
    this.dominatingMeIds = []
    this.paretoDataIdList = []
    this.currentId = 0
    
    if(data !==undefined){
      this.setData(data)
    }
  }

  setData(data){
    const N = data.length
    this.data = data
    for(let i=0;i<N;i++){
      this.myDominatingIds.push([])
      this.dominatingMeIds.push([])
    }
    this.currentId = data.length-1
  }
  solve(){
    const N = this.data.length 
    for(let i=0;i<N-1;i++){
      for(let j=i+1;j<N;j++){
        const Pi = this.data[i] 
        const Pj = this.data[j] 
        const Pi_dominates_Pj = dominates(Pi, Pj)
        const Pj_dominates_Pi = dominates(Pj, Pi)
        if(Pi_dominates_Pj){
          this.myDominatingIds[i].push(j)
          this.dominatingMeIds[j].push(i)
        }
        if(Pj_dominates_Pi){
          this.myDominatingIds[j].push(i)
          this.dominatingMeIds[i].push(j)
        }
      }
    }

    this.solveRanking()
  } 

  append(dValue,dId){
    this.data.push(dValue) 
    const N = this.data.length
    this.myDominatingIds.push([]) 
    this.dominatingMeIds.push([]) 
    for(let i=0;i<N-1;i++){
      const pId = i 
      const pValue = this.data[pId]
      const P_dominates_D = dominates(pValue, dValue)
      const D_dominates_P = dominates(dValue, pValue)
      if(P_dominates_D){
        this.myDominatingIds[pId].push(dId) 
        this.dominatingMeIds[dId].push(pId) 
      }
      if(D_dominates_P){
        this.myDominatingIds[dId].push(pId) 
        this.dominatingMeIds[pId].push(dId) 
      }
    }
  }
  solveRanking(){
    const N = this.data.length
    let searchSet = [...Array(N)].map((v,i)=>i)
    const dominatingMeCountsList = this.dominatingMeIds.map(v=>v.length)
    const paretoDataIdList = []

    while(searchSet.length>0){
      const paretoCandidate = []
      const searchSetTmp = []
      for(let i of searchSet){
        const Pi = this.data[i]
        const count = dominatingMeCountsList[i]
        if(count==0){
          paretoCandidate.push(i)
        }
        else searchSetTmp.push(i)
      }
      for(let k of paretoCandidate){
        for(let id of this.myDominatingIds[k]){
          dominatingMeCountsList[id] -=1
        }
      }
      searchSet = searchSetTmp
      paretoDataIdList.push(paretoCandidate)
    }
    this.paretoDataIdList = paretoDataIdList

  }


  addOneDataAndSolve(dValue){
    this.currentId++      
    const dId = this.currentId
    this.append(dValue, dId)
    this.solveRanking()
  }
  addDataListAndSolve(dList){
    for(let dValue of dList){
      this.currentId++      
      const dId = this.currentId
      this.append(dValue, dId)
    }
    this.solveRanking()
  }


  getParetoDataIdList(){
    return this.paretoDataIdList 
  }
  getParetoDataList(){
    const data = []
    for(let m of this.paretoDataIdList){
      const list = []
      for(let id of m){
        list.push(this.data[id])
      }
      data.push(list)
    }
    return data
  }
  getParetoRankMap(){
    const rankMap = new Map()
    let rank = 0
    for(let m of this.paretoDataIdList){
      for(let id of m){
        rankMap.set(id, rank)
      }
      rank++
    }
    return rankMap 
  }
} 
