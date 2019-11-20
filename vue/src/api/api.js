import qs from 'qs'
import axios from 'axios'
import router from '../router'

//请求头
axios.defaults.headers = {

    "Content-type": "application/x-www-form-urlencoded"
}


//如果请求头为axios.defaults.headers["Content-type"] = "application/json"，则去掉 qs.stringify()。 否则就添加
export default {
    install(Vue, options) {
        axios.interceptors.request.use(config => {
            //console.log('发送请求2', config)
            var userInfo = localStorage.getItem("userInfo");
            if (userInfo == null) {
                userInfo = "";
            } else {
                userInfo = JSON.parse(userInfo);
                //console.log(userInfo);
            }

            config.headers = {
                "Content-type": "application/x-www-form-urlencoded",
                "adminSession": userInfo.loginSession,
                // "sys_user_id":userInfo.id,
                "adminId": userInfo.id,
                "loginTime": userInfo.loginTime,
            }
            //console.log(config)
            return config
        }, error => {

            console.log('发送请求错误')
            return Promise.reject(error)
        })
        //登陆成功
        axios.interceptors.response.use(response => {
            //console.log('响应数据停止', response)
            if (response.data.statusCode == 200) {
                //alert(response.data.message)
                //账号密码正确登录成功
                //router.push("/")
            }
            return response
        }, error => {
            // alert('网络错误请返回重试')
            return Promise.reject(error)
        })


        // 页码
        Vue.prototype.$pageSize = 15
        Vue.prototype.$PostUrl = require('./url')
        // 获取数据API
        Vue.prototype.$PostAPI = (url, params) => {
            return axios.post(url, qs.stringify(params))
                .then(Res => Res.data)
        }

        Vue.prototype.$GetAPI = (url, params) => {
            return axios.get(url, {
                params
            })
                .then(Res => Res.data)
        }









        Vue.prototype.$upImg = (url, params) => {

            return axios.post(url, params, {
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            })
                .then(Res => Res.data)
        }
        axios.interceptors.response.use(
            (response) => {
                if (response.data.code == 500072) {
                    router.push({
                        path: "/"
                        // query: { myData: res.obj }
                    });
                    alert(response.data.msg)
                }
                return response;
            }


        )














    }

}
