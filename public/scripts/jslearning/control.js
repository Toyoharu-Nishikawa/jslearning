import {view} from "./view.js"
import {model} from "./model.js"
"use strict"

export const control = {
  import:{
    execute:function(){
        console.log("ok")
        model.import.execute()
    },
    add:function(){
      view.elements.import.onclick=this.execute
    }, 
  },
  export:{
    execute:function(){
        model.export.execute()
    },
    add:function(){
      view.elements.export=this.execute
    }, 
  },
  initialize: function(){
    //add method
    const controls = [
      this.import,
      this.export,
    ] 
    controls.forEach(control =>control.add())
    
    model.initialize()
  },
}
