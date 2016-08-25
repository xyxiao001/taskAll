'use strict'

//开启步骤选择
$("#steps").bwizard()

// 下一步的限制方法
var myNext = function () {}

// 获取模板数据 动态生成右边控件
var modelData = {
  title: {
    text: '浙江大学国际医院讲座报名',
    dom: '#title-name',
    control: '活动标题',
    type: 'text'
  },
  campaign: {
    value: '',
    dom: '#title-img',
    control: '宣传图',
    type: 'file',
    msg: '建议尺寸：宽度360，高度不限'
  },
  introdution: {
    text: '<p>【报名时间】 即日起截止至2016-9-15 12: 00</p>' +
          '<p>【报名方式】 请准确填写以下内容报名！</p>' +
          '<p>【报名人数】 仅限100人，先到先得！</p>' +
          '<p>【活动时间】 2016-9-15 （周日）9:00-11:00</p>' +
          '<p>【地址】 杭州市下城区东新路848号浙大国际医院</p>' +
          '<p>【提醒】 如放弃参与，请在就诊前一天致电告知</p>' +
          '<p>【提醒】 活动当天请携带以往相关检查资料。</p>',
    dom: '#introdution',
    control: '活动说明',
    type: 'textarea'
  },
  info: {
    text: [
      {id: 0, name: 'username', text: '【姓名】', type: '文本输入框', required: true},
      {id: 1, name: 'phone', text: '【电话】', type: '手机号输入框', required: true},
      {id: 2, name: 'IDcard', text: '【身份证】', type:'身份证输入框', required: false},
      {id: 3, name: 'address', text: '【地址】', type: '文本输入框', required: false}
    ],
    dom: '#main',
    control: '填写信息',
    type: 'form'
  }
}

$(function () {
  var i = 0;
  // 开始执行遍历数据
  for (i in modelData) {
    switch (modelData[i].type) {
      case 'text':
        createControl.inputText(modelData[i])
        break
      case 'file':
        createControl.inputFile(modelData[i])
        break
      case 'textarea':
        createControl.textarea(modelData[i])
        break
      case 'form':
        createControl.form(modelData[i])
        break
      default: console.log('目前还没有处理这种类型的方法， 类型：' + modelData[i].type)

    }
  }
})


// 显示表格方法
function showInfo(dom, data, checked) {
  // 清空tbody
  $( dom +' .show-info tbody').html('')
  data.forEach(function (item, index) {
    var tr = document.createElement('tr')
    var td1 = document.createElement('td')
    var radio = document.createElement('input')
    radio.type = 'radio'
    radio.name = 'serial'
    radio.value = index
    if (index === checked) {
      radio.checked = 'checked'
    }
    td1.appendChild(radio)
    var td2 = document.createElement('td')
    td2.innerHTML = item.text
    var td3 = document.createElement('td')
    td3.innerHTML = item.type
    var td4 = document.createElement('td')
    td4.innerHTML = item.required === true ? '是' : '否'
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    $( dom + ' .show-info tbody').append(tr)
  })
}

// 修改模板的填写信息
  function changeInfo(dom, data) {
    $(dom).html('')
    data.forEach(function (item) {
      var div = document.createElement('div')
      div.className = 'form-group'
      var label = document.createElement('label')
      label.setAttribute('for', item.name)
      label.innerHTML = item.text
      var input = document.createElement('input')
      input.setAttribute('id', item.name)
      input.type = 'text'
      div.appendChild(label)
      div.appendChild(input)
      $(dom).append(div)
    })
  }


// 生成控件函数
var createControl = {
  // 生成普通输入框控件
  inputText: function (data) {
    //生成dom
    var div = document.createElement('div')
    div.className = 'form-group'
    var label = document.createElement('label')
    label.innerHTML = data.control + '：'
    div.appendChild(label)
    var input = document.createElement('input')
    input.id = data.dom + '-input'
    input.id = input.id.replace('#', '')
    input.className = 'form-control'
    input.type = 'text'
    input.value = data.text
    div.appendChild(input)
    document.querySelector('.page1 section.right').appendChild(div)
    // 然后传值到绑定函数
    bind.inputText(data.dom, data.dom + '-input')
  },

  // 限制只能输数字控件
  inputNum: function (data) {
  },

  // 文件上传控件
  inputFile: function (data) {
    //生成dom
    var div = document.createElement('div')
    div.className = 'form-group'
    var label = document.createElement('label')
    label.innerHTML = data.control + '：'
    div.appendChild(label)
    var input = document.createElement('input')
    input.id = data.dom + '-input'
    input.id = input.id.replace('#', '')
    input.className = 'form-control'
    input.type = 'file'
    input.accept= 'image/*'
    div.appendChild(input)
    var span = document.createElement('span')
    span.innerHTML = data.msg
    div.appendChild(span)
    document.querySelector('.page1 section.right').appendChild(div)
    // 然后传值到绑定函数
    bind.inputFile(data.dom, data.dom + '-input')
  },

  // 富文本编辑控件
  textarea: function (data) {
    //生成dom
    var div = document.createElement('div')
    div.className = 'form-group'
    var label = document.createElement('label')
    label.innerHTML = data.control + '：'
    div.appendChild(label)
    var edit = document.createElement('div')
    edit.style.height = '260px'
    edit.id = data.dom + '-input'
    edit.id = edit.id.replace('#', '')
    div.appendChild(edit)
    document.querySelector('.page1 section.right').appendChild(div)
    // 生成编辑器
    var editor = new wangEditor(edit.id)
    editor.create()
    // 设置编辑器内容
    editor.$txt.html(data.text)
    // 然后传值到绑定函数
    bind.textarea(data.dom, data.dom + '-input', editor)
  },

  // 表单提交控件
  form: function (data) {
    // 生成操作的dom
    var div = document.createElement('div')
    div.className = 'form-group'
    div.id = data.dom + '-div'
    div.id = div.id.replace('#', '')
    var p = document.createElement('p')
    p.innerHTML = data.control + '：'
    div.appendChild(p)
    var controlDiv = document.createElement('div')
    controlDiv.className = 'form-group control-info'
    controlDiv.innerHTML = '<button type="button" class="btn btn-success" name="add">新增</button>' +
                           '<button type="button" class="btn btn-warning" name="up">上移</button>' +
                           '<button type="button" class="btn btn-info" name="down">下移</button>' +
                           '<button type="button" class="btn btn-danger" name="del">删除</button>'
    div.appendChild(controlDiv)
    var table = document.createElement('table')
    table.className = 'table table-bordered table-hover table-responsive show-info'
    table.innerHTML = '<thead><tr><th>操作</th><th>项目名称</th><th>类型</th><th>是否必填</th></tr></thead><tbody></tbody>'
    div.appendChild(table)
    document.querySelector('.page1 section.right').appendChild(div)

    //生成数据
    showInfo(data.dom + '-div', data.text, 0)
    //绑定事件
    bind.form(data.dom, data.dom + '-div', data.text)
  }
}


// 绑定处理事件函数
var bind = {
  inputText: function (pre, next) {
    function update() {
      $(pre).text($(next).val())
    }
    $(next).keyup(update).blur(update)
  },

  inputFile: function (pre, next) {
    function updata() {
      var dom = document.querySelector(next)
      var file = dom.files[0]
      if(!/.(gif|jpg|jpeg|png|gif|jpg|png)$/.test(file.name)){
        alert("图片类型必须是.gif,jpeg,jpg,png中的一种")
      } else {
        var src = window.URL.createObjectURL(file)
        console.log($(pre))
        $(pre).attr('src', src)
      }
    }
    $(next).change(updata)
  },

  textarea: function (pre, next, edit) {
    function update() {
      $(pre).html(edit.$txt.html())
    }
    $(next).keyup(update).blur(update)
  },
  form: function (pre, next, data) {
    var tableInfo = {
      add: function () {
          layer.open({
            title: '新增',
            content: '<div class="form-group"><label for="add-name">项目名称:</label><input type="text" name="add-name" class="form-control" id="add-name"></div>' +
                     '<div class="form-group"><label for="add-type">项目类型:</label><select class="form-control select-type">' +
                     '<option>文本输入框</option><option>手机号输入框</option><option>文件上传框</option></select></div>' +
                     '<div class="form-group required"><label for="add-name">是否必填:</label><input type="radio" name="isRequired" id="required"><label class="radioText" for="required">是</label>'+
                     '<input type="radio" name="isRequired" id="notRequired" checked="true"><label class="radioText" for="notRequired">否</label></div>',
            area: '400px',
            yes: function (index) {
              if($.trim($('#add-name').val()).length === 0) {
                layer.tips('请输入新增项目名称！', '#add-name')
              } else {
                // 新增
                var addItem = {}
                addItem.text = $.trim($('#add-name').val())
                addItem.type = $('select.select-type').val()
                addItem.required = $('#required').prop('checked')
                addItem.name = 'new'
                data.push(addItem)
                showInfo(next, data, 0)
                changeInfo(pre, data)
                layer.close(index)
              }
            }
          })
        },
        // 上移操作
        up: function () {
          var hasChecked = false
          var checked = ''
          $(next + ' .show-info input[type="radio"]').each(function (index, val) {
            if (val.checked) {
              hasChecked = val.checked
              checked = val
            }
          })
          if (!hasChecked) {
            layer.msg('还没选呢！')
          } else {
            if (~~(checked.value) === 0) {
              layer.msg('已经在最上面了！', {offset: '200px', time: 1500 })
            } else {
              // 执行换位操作
              //保存当前对象
              var old = data[checked.value - 1]
              data[checked.value - 1] = data[checked.value]
              data[checked.value] = old
              showInfo(next, data, checked.value - 1)
              changeInfo(pre, data)
            }
          }
        },

        //下移操作
        down: function () {
          var hasChecked = false
          var checked = ''
          $(next + ' .show-info input[type="radio"]').each(function (index, val) {
            if (val.checked) {
              hasChecked = val.checked
              checked = val
            }
          })
          if (!hasChecked) {
            layer.msg('还没选呢！')
          } else {
            if (~~(checked.value) === data.length - 1) {
              layer.msg('下面没地方了！', {offset: '200px', time: 1500 })
            } else {
              // 执行换位操作
              //保存当前对象
              var old = data[~~(checked.value) + 1]
              data[~~(checked.value) + 1] = data[checked.value]
              data[checked.value] = old
              showInfo(next, data, ~~(checked.value) + 1)
              changeInfo(pre, data)
            }
          }
        },

        del: function () {
          var hasChecked = false
          var checked = ''
          $(next + ' .show-info input[type="radio"]').each(function (index, val) {
            if (val.checked) {
              hasChecked = val.checked
              checked = val
            }
          })
          if (!hasChecked) {
            layer.msg('还没选呢！')
          } else {
            layer.confirm('确认删除?', {icon: 2, title: '提示', offset: '200px'}, function (index) {
              // 删除该项
              data.splice(checked.value, 1)
              showInfo(next, data, 0)
              changeInfo(pre, data)
              layer.close(index)
            })
          }
        }
    }
    // 按钮点击事件
      $(next + ' .control-info button').click(function () {
        // 表格事件
        tableInfo[this.name]()
      })
  }
}


//更换模板样式
$('.changeModel').click(function () {
  $('#changeModel').modal('show')
})

// 点击模板
$('.show-item .item').click(function () {
  $('#changeModel').modal('hide')
})
