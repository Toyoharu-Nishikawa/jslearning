import {view} from "./view.js"
import {model} from "./model.js"
"use strict"

export const control = {
  import:{
    execute:function(){
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
      view.elements.export.onclick=this.execute
    }, 
  },
  option:{
    optionClick: function(e){
        e.stopPropagation()
        view.elements.optionArea.style.display="block"
    },
    bodyClick:function(e){
      view.elements.optionArea.style.display="none"
    },
    optionAreaClick:function(e){
      e.stopPropagation()
    },
    add:function(){
      const self=this
      view.elements.body.addEventListener("click",self.bodyClick,false)
      view.elements.option.onclick=this.optionClick
      view.elements.optionArea.onclick=this.optionAreaClick
    },
  },
  submit:{
    execute:function(){
      model.submit.execute()
    },
    add:function(){
      view.elements.submit.onclick = this.execute
    },
  },
  initialize: function(){
    //add method
    const controls = [
      this.import,
      this.export,
      this.option,
      this.submit,
    ] 
    controls.forEach(control =>control.add())
    
    model.initialize()
  },
}
