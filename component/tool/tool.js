// component/tool/tool.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    title: "",
    buttons: [{
      icon: 'cuIcon-edit',
      name: '文字'
    }, {
      icon: 'cuIcon-pic',
      name: '大图'
    }, {
      icon: 'cuIcon-cascades',
      name: '小图'
    }, {
      icon: 'cuIcon-video',
      name: '视频'
    }],
    contents: [{
      type: "文字",
      content: ""
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 上移
    itemUp(e) {
      var index = e.currentTarget.dataset.index
      if (index == 0) return
      var content = this.data.contents[index]
      var cs = this.data.contents
      cs.splice(index, 1)
      cs.splice(index - 1, 0, content);
      this.setData({
        contents: cs
      })
    },
    // 下移
    itemDown(e) {
      var index = e.currentTarget.dataset.index
      if (index == this.data.contents.length - 1) return
      var content = this.data.contents[index]
      var cs = this.data.contents
      cs.splice(index, 1)
      cs.splice(index + 1, 0, content);
      this.setData({
        contents: cs
      })
    },
    // 关闭
    itemClose(e) {
      var index = e.currentTarget.dataset.index
      var cs = this.data.contents
      cs.splice(index, 1)
      this.setData({
        contents: cs
      })
    },
    // 选择图片
    chooseImage(e) {
      var index = e.currentTarget.dataset.index
      var that = this

      var cs = that.data.contents
      var c = 9
      if (cs[index].type == "大图") c = 1
      wx.chooseImage({
        count: c,
        sizeType: ['original', 'compressed'], //原图，缩略图
        sourceType: ['album', 'camera'], //相册，相机
        success: function(res) {

          cs[index].content = cs[index].content.concat(res.tempFilePaths)
          that.setData({
            contents: cs
          })
        }
      })
    },
    // 选择视频
    chooseVideo(e) {
      var index = e.currentTarget.dataset.index
      var that = this
      wx.chooseVideo({
        sourceType: ['album', 'camera'],
        maxDuration: 60,
        camera: 'back',
        success(res) {
          console.log(res)
          var cs = that.data.contents
          cs[index].content = cs[index].content.concat([res.tempFilePath])
          that.setData({
            contents: cs
          })
        }
      })
    },
    // 删除图片
    DelImg(e) {
      var cidx = e.currentTarget.dataset.cidx
      var index = e.currentTarget.dataset.index
      var that = this
      var cs = that.data.contents
      cs[index].content.splice(cidx, 1);
      that.setData({
        contents: cs
      })
    },
    // 获得所有文件
    getFormContent() {
      return {
        title: this.data.title,
        contents: this.data.contents
      }
    },
    // 增加文字/大图/小图/视频
    addContent(e) {
      console.log(e)
      var cs = this.data.contents
      cs.push({
        type: e.currentTarget.dataset.item.name,
        content: []
      })
      this.setData({
        contents: cs
      })
    },
    // 文字输入
    inputText(e) {
      var index = e.currentTarget.dataset.index
      var cs = this.data.contents
      cs[index].content = e.detail.value
      this.setData({
        contents: cs
      })
    },
    // 标题输入
    inputTitle(e) {
      this.setData({
        title: e.detail.value
      })
    }
  }
})