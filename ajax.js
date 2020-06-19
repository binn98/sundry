var axios = function ajax(url, data, myset) {
  let promise = new Promise((resolve, reject) => {
    const _that = this;
    // 定义基准路径
    let baseURL = "";
    let postData = data || "";
    // 此处token存在本地，如果请求头需要带就加上.
    let location_token = wx.getStorageSync("token_" + 'v1.0');
    wx.request({
      url:baseURL + url,
      data: postData,
      header: {
        token: location_token,
      },
      method: myset || "GET",
      // 微信小程序请求成功回调.
      success: (res) => {
        resolve(res.data)
      },
      error: (res) => {
        // 这里是promise的失败回调
        reject(res);
      },
    });
  });
  return promise;
};
