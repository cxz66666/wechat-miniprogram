import { HTTP } from "../utils/http";

class NotifyModel extends HTTP {
  /**
   * url: notify/list/personnottop
   * 获取全部非置顶通知
   * @param {number} type 0全部 1未读 2含附件 3收藏
   * @param {number} offset 偏移，默认0
   * @param {number} count -1时候代表全部，>=0时候返回数据库中前count条，默认为-1
   */
  static async getNotTopNotice(type, offset = 0, count = -1) {
    return await this.prototype.request({
      url: "notify/list/personnottop",
      method: "GET",
      data: {
        type: type,
        offset: offset,
        count: count
      }
    });
  }

  /**
   * notify/list/personsettop
   * 获取个人置顶的通知
   * @param {number} type 0全部 1未读 2含附件 3收藏
   * @param {number} offset 偏移，默认0
   * @param {number} count -1时候代表全部，>=0时候返回数据库中前count条，默认为-1
   */
  static async getTopNotice(type, offset = 0, count = -1) {
    return await this.prototype.request({
      url: "notify/list/personsettop",
      method: "GET",
      data: {
        type: type,
        offset: offset,
        count: count
      }
    });
  }

  /**
   * notify/list/personcollect
   * 获取个人收藏的通知
   * @param {number} offset 偏移，默认0
   * @param {number} count -1时候代表全部，>=0时候返回数据库中前count条，默认为-1
   */
  static async getCollectedNotice(offset = 0, count = -1) {
    return await this.prototype.request({
      url: "notify/list/personcollect",
      method: "GET",
      data: {
        offset: offset,
        count: count
      }
    });
  }

  /**
   * notify/search
   * 搜索相关的通知
   * @param {number} search_type 默认0为全字匹配  1为优先匹配院系 2为优先匹配title
   * @param {string} search_word 搜索关键词
   * @param {number} offset 偏移，默认0
   * @param {number} order_id 院系id，<=0表示全部
   * @param {number} plate_id 0-8合法 ，0为全部， 1-8为评奖评优--其他
   * @param {number} count -1时候代表全部，>=0时候返回数据库中前count条，默认为-1
   */
  static async searchNotice(
    search_type,
    search_word,
    offset,
    order_id,
    plate_id,
    count
  ) {
    return await this.prototype.request({
      url: "notify/search",
      method: "GET",
      data: {
        search_type: search_type,
        search_word: search_word,
        offset: offset,
        order_id: order_id,
        plate_id: plate_id,
        count: count
      }
    });
  }

  /**
   * notify/settop
   * 置顶通知
   * @param {number} pid 通知编号
   */
  static async setNoticeTop(pid) {
    return await this.prototype.request({
      url: "notify/settop",
      method: "POST",
      data: {
        notify_id: pid
      }
    });
  }

  /**
   * notify/setnotop
   * 取消置顶通知
   * @param {number} pid 通知编号
   */
  static async setNoticeUntop(pid) {
    return await this.prototype.request({
      url: "notify/setnotop",
      method: "POST",
      data: {
        notify_id: pid
      }
    });
  }

  /**
   * notify/setread
   * 设置通知已读
   * @param {number} pid 通知编号
   */
  static async setNoticeRead(pid) {
    return await this.prototype.request({
      url: "notify/setread",
      method: "POST",
      data: {
        notify_id: pid
      }
    });
  }

  /**
   * notify/setnoread
   * 设置通知已读
   * @param {number} pid 通知编号
   */
  static async setNoticeUnread(pid) {
    return await this.prototype.request({
      url: "notify/setnoread",
      method: "POST",
      data: {
        notify_id: pid
      }
    });
  }

  /**
   * notify/setcollect
   * 收藏通知
   * @param {number} pid 通知编号
   */
  static async setNoticeCollected(pid) {
    return await this.prototype.request({
      url: "notify/setcollect",
      method: "POST",
      data: {
        notify_id: pid
      }
    });
  }

  /**
   * notify/setnocollect
   * 取消收藏通知
   * @param {number} pid 通知编号
   */
  static async setNoticeUncollected(pid) {
    return await this.prototype.request({
      url: "notify/setnocollect",
      method: "POST",
      data: {
        notify_id: pid
      }
    });
  }

  /**
   * notify/delete
   * 删除通知
   * @param {number} pid 通知编号
   */
  static async deleteNotice(pid) {
    return await this.prototype.request({
      url: "notify/delete",
      method: "POST",
      data: {
        notify_id: pid
      }
    });
  }

  /**
   * notify/detail
   * 获取通知详细信息
   * @param {number} pid 通知编号
   */
  static async getNoticeDetail(pid) {
    return await this.prototype.request({
      url: "notify/detail",
      method: "GET",
      data: {
        notify_id: pid
      }
    });
  }

  /**
   * notify/searchddl
   * 查询该用户是否针对通知设置了ddl
   * @param {number} pid 通知编号
   */
  static async getNoticeDDL(pid) {
    return await this.prototype.request({
      url: "notify/searchddl",
      method: "GET",
      data: {
        notify_id: pid
      }
    });
  }

  /**
   * notify/noreadnum
   * 查询用户未读的通知数目
   */
  static async getNoticeNotRead() {
    return await this.prototype.request({
      url: "notify/noreadnum",
      method: "GET"
    });
  }

  /**
   * notify/focuson
   * 获取前十热点通知
   */
  static async getTopTen() {
    return await this.prototype.request({
      url: "notify/focuson",
      method: "GET"
    });
  }
}

export { NotifyModel };
