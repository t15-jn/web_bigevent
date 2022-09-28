$(function () {

  // 点击 '去注册账号' 
  $('#link-reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  //点击 '去登录'
  $('#link-login').on('click', function () {
    $('.reg-box').hide()
    $('.login-box').show()
  })

  //从layui 中获取form 对象
  let form = layui.form
  let layer = layui.layer


  //通过 form.verify 自定义密码校验规则
  form.verify({
    //自定义一个 叫 pwd 的校验规则
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    // 校验两次密码是否一致的规则
    repwd: function (value) { //value 是形参 可以拿到确认密码框中的值
      //用属性选择器获取到 密码框 中的值
      let pwd = $('.reg-box [name="password"]').val()
      //判断 密码框 和 确认密码框 中的 值是否一致
      if (pwd !== value) return '两次密码不一致!'
    }
  })

  //监听注册表单的提交事件
  $('#form-reg').on('submit', function (e) {
    //阻止默认提交行为
    e.preventDefault()
    //发起 ajax post 请求
    $.ajax({
      method: 'POST',
      url: `/api/reguser`,
      data: {
        username: $('.reg-box [name="uesrname"]').val(),
        password: $('.reg-box [name="password"]').val()
      },
      success: function (res) {
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg('注册成功,请登录!')
        // 模拟点击 事件
        $('#link-login').click()
      }
    })

  })


  //监听登录表单的提交事件
  $('#form-login').on('submit', function (e) {
    //阻止默认提交行为
    e.preventDefault()
    //获取数据
    $.ajax({
      method: 'POST',
      url: `/api/login`,
      //快速获取表单中的数组
      data: {
        username: $('.login-box [name="uesrname"]').val(),
        password: $('.login-box [name="password"]').val()
      },
      success: function (res) {
        console.log(res)
        if (res.status !== 0) return layer.msg('登录失败!')
        layer.msg('登录成功!')
        console.log(res.token)
        //将登录成功得到的 token 字符串 保存到 localStroage 中
        localStroage.setItem('token',res.token)
        //跳转到后台主页
        location.href = `/index.html`
        
      }
    })
  })
})