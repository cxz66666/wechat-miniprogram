import { config } from "../config.js";
import { Base64 } from "./base64.js";

/**
 * 错误提示
 */

/**
 * HTTP 类
 * 功能：发送请求，处理基本类型错误，并生成alert提醒
 */
class HTTP {
  /**
   * 发送HTTP请求
   * @param {object} params 请求数据
   * params = {
   *  data: 请求数据 ||
   *  method http请求方法 默认 GET ||
   *  dataType 期望返回的数据格式，默认 json
   *  showError 是否在HTTP类内弹出错误警告 默认 true
   * }
   */
  request({
    url,
    data = {},
    method = "GET",
    raw = false,
    dataType = "json",
    showError = true
  }) {
    console.log(
      "<HTTP> A Request has been sent to: ",
      config.api_base_url + url,
      "\nMethod:",
      method,
      "\nData:",
      data
    );
    return new Promise((resolve, reject) => {
      this._request(
        url,
        resolve,
        reject,
        data,
        method,
        raw,
        dataType,
        showError
      );
    });
  }

  /**
   * 发送HTTP请求
   * @param {string} url 请求地址
   * @param {function} resolve
   * @param {function} reject
   * @param {object} data 请求数据
   * @param {string} method http请求方法
   * @param {string} dataType 期望返回的数据格式，默认json，支持json，text，base64
   */
  _request(
    url,
    resolve,
    reject,
    data = {},
    method = "GET",
    raw = false,
    dataType = "json",
    showError = true
  ) {
    wx.request({
      url: raw ? url : config.api_base_url + url,
      method: method,
      data: data,
      dataType: dataType,
      header: {
        "content-type": "application/json",
        NOTIFY_AUTH_BEARER: this._encode()
      },
      success: (res) => {
        console.log("Request Success", res);
        const code = res.statusCode.toString();
        if (code.startsWith("2") && res.data.status) {
          resolve(res.data);
        } else {
          console.warn("res err", res);
          if (!res.data) {
            //没有返回值
            if (showError) this._show_error(res.statusCode, "未知获取返回值");
            reject(res);
          } else if (res.data.description) {
            //有返回值且有描述
            if (showError)
              this._show_error(res.statusCode, res.data.description);
            reject(res);
          } else {
            //有返回值没描述
            if (showError) this._show_error(res.statusCode, "未知错误");
            reject(res);
          }
        }
      },
      fail: (res) => {
        console.warn("fail", res);
        if (!res.data) {
          //没有返回值
          if (showError) this._show_error(res.statusCode, "未知获取返回值");
          reject(res);
        } else if (res.data.description) {
          //有返回值且有描述
          if (showError) this._show_error(res.statusCode, res.data.description);
          reject(res);
        } else {
          //有返回值没描述
          if (showError) this._show_error(res.statusCode, "未知错误");
          reject(res);
        }
      }
    });
  }

  /**
   * 显示alert
   * @param {number} error_code 错误代码
   */
  _show_error(statusCode, errMsg = "") {
    if (config.mode != "dev") return;
    console.log("error code", statusCode);
    wx.showModal({
      title: "错误提示：dev模式",
      content: errMsg + " (" + statusCode + ")"
    });
  }
  /**
   * 从storage内获取token 并返回bearer+ token
   */
  _encode() {
    const token = wx.getStorageSync("token");
    return "Bearer " + token;
  }
}

export { HTTP };
