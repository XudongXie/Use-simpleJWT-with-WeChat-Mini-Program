 //Javascript function to request data from a server
 
 function accessServer (url, method, access_token) {
    var that = this
    return new Promise(function (resolve, reject) {
      wx.request({
        url: url,
        data:
          {},
        method: method,
        header:
        {
          'Content-Type': 'application/json', 
          'Authorization': 'Token ' + access_token
        },
        success: function (res) {
          if (res.statusCode == 200) { //Data request sucessfully fullfilled 
            resolve(res)
          }
          else { // code 401 returned
            reject(new Error('Access token Expired.'))
          }
        }, 
        fail: function (res) {
          reject(new Error('Network failed.'))
        }
      })

    })
  }

  //Javascript function to get a new access token via refresh_token
  function referesh_token(wxuserinfo) {
    var that = this
    return new Promise(function (resolve, reject) {
      var userinfo =
      {
        refresh_token: wxuserinfo.referesh_token,
        access_token: wxuserinfo.access_token,
        openid: wxuserinfo.openid,
      }
      var that = this
      wx.request(
        {
          url: token_refresh_url
          data:
          {
            refresh: userinfo.refresh_token
          },
          headers:
          {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          success: function (res) {
            if (res.statusCode == 200)  //new access_token successfully returned        
            {
              userinfo.access_token = res.data.access
              resolve(userinfo)
            }
            else {
              reject(new Error('Failed to refresh Access Token.'))
            }
          }, 
          fail: function (res) {
            reject(new Error('Network failed.'))
          }
        }) 
    }) 
  }

// Javascript function to generate token pair for an exsiting user with WeChat's openid 
function obtaintokenpair(wxuserinfo) {
    var that = this
    return new Promise(function (resolve, reject) {
      var userinfo =
      {
        refresh_token: wxuserinfo.referesh_token,
        access_token: wxuserinfo.access_token,
        openid: wxuserinfo.openid,
      }
      var that = this
      wx.request(
        {
          url: that.data.wxuserlogin,          
          data:
          {
            openid: userinfo.openid
          },
          headers:
          {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          success: function (res) {
            if (res.statusCode == 200)  //User's new tokens successfully returned       
            {
              userinfo.refresh_token = res.data.tokens.refresh_token
              userinfo.access_token = res.data.tokens.access_token
              resolve(userinfo)
            }
            else {
              reject(new Error("Not an exising user, pls sign up."))
            }
          }, 
          fail: function (res) {
               reject(new Error('Network failed.'))
          }
        }) 
    }) 
  }
  
module.exports = {
  accessServer: accessServer,
  referesh_token: referesh_token,
  obtaintokenpair: obtaintokenpair,  
}
