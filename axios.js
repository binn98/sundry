
document.write('<script language=javascript src="https://cdn.bootcss.com/axios/0.19.2/axios.min.js"></script>')

function fetch(config) {
  let url='https://devopenapi.viplex.cn/bfrontapi/';
  //返回promise对象
  return new Promise((resolve, reject) => {
    //创建axios实例，把基本的配置放进去
    const instance = axios.create({
      //定义请求文件类型
      headers: {
        // "Content-Type": "text/html; charset=utf-8",
        'Content-type': 'application/x-www-form-urlencoded',
				'token': ''
      },
      // 请求超时
      timeout: 30000,
      //定义请求根目录
      baseURL: config.api ? config.api : url,
    });
    const interceptors = instance.interceptors.request.use((config) => {
      // 在发送请求之前做些什么
      if (process.browser) {
        config.headers["token"] = localStorage.getItem("token");
      }
      return config;
    });
    //请求成功后执行的函数
    instance(config)
      .then((res) => {
        resolve(res);
        //失败后执行的函数
      })
      .catch((err) => {
        // console.log(err);
        reject(err);
      });
  });
}


// 封装调用的接口 axios
function axios(option) {
  return fetch({
    //这里的url为baseURL下接口地址，如baseURL为'www.baidu.com',接口地址为'www.baidu.com/api/getdata',那么url里就写'api/getdata'
    url: option.url,
    method: option.type || "get",
    data: option.data || "",
  });
}
