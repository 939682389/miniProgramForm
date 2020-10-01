const app = getApp()

Page({
  data: {

  },
  onLoad: function () {
 
  },
  get(){
    console.log(this.selectComponent('#tool').getFormContent())
  }
})
