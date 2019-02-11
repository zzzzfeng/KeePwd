//index.js
//获取应用实例
//const app = getApp()

Page({
  data: {
    passall: [],
    passpass: '',
    passapp: '',
  },
  getapp: function(e){
    this.setData({ passapp: e.detail.value });
  },
  getpass: function (e) {
    this.setData({ passpass: e.detail.value });
  },
  updateW: function(){
    this.setData({ passall: this.data.passall });
    wx.setStorage({
      key: 'passall',
      data: this.data.passall
    });
    this.setData({ passapp:'' });
    this.setData({ passpass: '' });
  },
  bindAdd: function() {
    if (!this.data.passapp || !this.data.passpass){
      wx.showToast({
        title: '不能为空',
        icon: 'none',
      })
      return;
    }
    if(this.data.passapp == '#导入#'){
      var that = this;
      that.data.passall.push.apply(that.data.passall, JSON.parse(that.data.passpass));
      this.updateW();
      return;
    }
    let item = {}
    item.a = this.data.passapp;
    item.b = this.data.passpass;
    //this.data.passall.push(item);
    //插到头部
    this.data.passall.splice(0,0,item);
    console.log('add: '+JSON.stringify(item));
    this.updateW();
  },
  bindOps: function (e) {
    let timesep = this.data.touchend - this.data.touchstart;
    console.log(timesep);
    if(timesep > 350){
      var that = this;
      wx.showModal({
        title: '确认删除',
        content: e.currentTarget.dataset.content,
        success(res) {
          if (res.confirm) {
            that.data.passall.splice(e.currentTarget.dataset.id, 1);
            that.updateW();
            //删除复制
            //that.copytoClipboard(e.currentTarget.dataset.content.split(" : ")[1], true);
          } else if (res.cancel) { }
        }
      })  
    }else{
      this.copytoClipboard(e.currentTarget.dataset.content.split(" : ")[1]);
    }
  },
  touchstart:function(e){
    this.setData({ touchstart: e.timeStamp});
  },
  touchend: function (e) {
    this.setData({ touchend: e.timeStamp });
  },
  bindExport: function () {
    var that = this;
    wx.getStorage({
      key: 'passall',
      success(res) {
        console.log(res.data);
        that.copytoClipboard(JSON.stringify(res.data));
      }
    })
  },
  copyPC:function(){
    this.copytoClipboard('https://zzzzfeng.github.io/KeePwd/');
  },
  randPass: function(len){
    len = len || 10;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (let i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  },
  bindRand: function () {
    let tmppass = this.randPass();
    this.setData({ passpass: tmppass });
    this.copytoClipboard(tmppass);
  },
  copytoClipboard: function(ss, show){
    console.log('clipboard: '+ss);
    wx.setClipboardData({
      data: ss,
      success(res) {
      }
    })
  },
  onLoad: function () {
    var that = this;
    wx.getStorage({
      key: 'passall',
      success(res) {
        console.log(res.data);
        that.setData({ passall: res.data });//可以刷新view
        wx.showToast({
          title: '数据同步完成',
          icon: 'none',
        })
      }
    })
    
  }
})
