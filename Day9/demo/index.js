// pages/typeDetails/index.js
const app = getApp();

import {NotifyModel} from '../../model/NotifyModel'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    type: "",
    noticeArray: [],
    scrollHeight: 0,
    overlayTop: 0,
    showCollapse: false,
    firstLoading: false,
    websites: [
      { title: "全部", isChosen: true },
      { title: "勃勃学院", isChosen: false },
      { title: "勃学院", isChosen: false },
      { title: "弟弟学院", isChosen: false },
      { title: "二极管学院", isChosen: false },
      { title: "两面包夹芝士", isChosen: false }
    ]
  },
  
  async RefreshNotice(order_id = -1) {
    this.setData({
      finale: false
    });
    this.noticeCount = 0;
    this.page = 0;
    this.pageSize = 8;
    let res = await NotifyModel.searchNotice({
      offset: this.noticeCount,
      order_id: order_id,
      plate_id: this.data.type,
      count: this.pageSize
    });
    // console.log(res);
    if(res.return_count == res.all_count) {
      this.setData({
        finale: true
      });
    }
    let listSample = [];
    for (let i = 0; i < res.return_count; ++ i) {
      let sample = {
        id: this.noticeCount,
        pid: res.data[i].notify_id,
        title: res.data[i].notify_title,
        category: res.data[i].notify_type,
        source: res.data[i].notify_from,
        attachment: res.data[i].notify_enclosure,
        star: res.data[i].notify_collect,
        stickTop: res.data[i].notify_set_top,
        redDot: !res.data[i].notify_read,
        display: true
      };
      ++ this.noticeCount;
      listSample.push(sample);
    }

    this.setData({
      noticeArray: listSample
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.setData({
      firstLoading: true
    })
    wx.showLoading({
      title: '加载中'
    });
    let query = wx.createSelectorQuery().in(this);
    query.select("#titleBar").boundingClientRect();
    query.select("#header").boundingClientRect();
    query.exec((res) => {
      // 分别取出高度
      let titleBarHeight = res[0].height;
      let headerHeight = res[1].height;
      let scrollViewHeight =
        app.globalData.systemInfo.windowHeight -
        titleBarHeight -
        headerHeight +
        20;
      this.setData({
        scrollViewHeight: app.globalData.canUseHeight - 5,
        overlayTop: titleBarHeight
      });
    });
    console.log("类型："+options.type);
    this.setData({
      type: options.type,
      firstLoading: false
    });
    await this.RefreshNotice();
    wx.hideLoading();
  },

  async refreshList() {
    console.log("下拉刷新");
    await this.RefreshNotice();
    this.setData({
      refreshOn: false
    });
  },

  async getMoreNotice(order_id = -1) {
    console.log("上拉加载");
    if (this.data.finale) return;
    if (this.data.loadingMore) return;
    this.setData({
      loadingMore: true
    });

    let res = await NotifyModel.searchNotice({
      offset: this.noticeCount,
      order_id: order_id,
      plate_id: this.data.type,
      count: this.pageSize
    });
    this.noticeCount += res.return_count;
    if(res.return_count == 0) {
      this.setData({
        finale: true,
        loadingMore: false
      });
      return;
    }
    ++ this.page;
    let list = this.data.noticeArray;
    for(let i = 0; i < res.return_count; ++ i) {
      let sample = {
        id: this.noticeCount,
        pid: res.data[i].notify_id,
        title: res.data[i].notify_title,
        category: res.data[i].notify_type,
        source: res.data[i].notify_from,
        attachment: res.data[i].notify_enclosure,
        star: res.data[i].notify_collect,
        stickTop: res.data[i].notify_set_top,
        redDot: !res.data[i].notify_read,
        display: true
      };
      ++ this.noticeCount;
      list.push(sample);
    }
    this.setData({
      noticeArray: list,
      loadingMore: false
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},

  /**
   * 展开筛选处
   * @param {object} event 点击事件
   */
  listWebsites: function (event) {
    this.setData({
      showCollapse: !this.data.showCollapse
    });
  },

  /**
   * 修改筛选
   * @param {object} e 点击事件
   */
  changeChosen: function (e) {
    let tmp = this.data.websites;
    tmp = tmp.map((item) => {
      let newItem = item;
      newItem.isChosen = false;
      return newItem;
    });
    // tmp[e.target.id].isChosen = !tmp[e.target.id].isChosen;
    tmp[e.target.id].isChosen = true;
    this.setData({
      websites: tmp,
      showCollapse: false
    });
  },
  /**
   * 点击遮罩层的其他地方，收起遮罩
   */
  onClickHide: function () {
    this.setData({ showCollapse: false });
  }
});
