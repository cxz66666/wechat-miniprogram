import { HTTP } from "../utils/http";

class UserModel extends HTTP {
  /**
   * url: user/info
   * get the user info with this token
   */
  static async getUserInfo() {
    return await this.prototype.request({
      url: "user/info",
      method: "get"
    });
  }

  /**
   *
   * @param {list} modify_filed  the list for changed filed, not string
   * @param {object} modify_info changed object, the json object
   * if status is success ,it works fine
   */
  static async modifyUserInfo(modify_filed, modify_info) {
    return await this.prototype.request({
      url: "user/modify/info",
      method: "post",
      data: {
        modify_field: modify_filed.join(","),
        ...modify_info
      }
    });
  }

  // async testToken (code) {
  //   return await this.prototype.request({
  //     url: 'user/get',
  //     data: {
  //     },
  //     method: 'get'
  //   })
  // }

  // async verifyToken (token) {
  //   return await this.prototype.request({
  //     url: 'token/verify',
  //     data: {
  //       token
  //     },
  //     method: 'post'
  //   })
  // }
}

export { UserModel };
