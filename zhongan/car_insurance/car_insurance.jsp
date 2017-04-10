<%@page contentType="text/html" pageEncoding="UTF-8"%>
<% request.setAttribute("ctx", request.getContextPath());%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1">
<link rel="stylesheet" href="${ctx}/static/css/document/mobile_initial.css">
<title>民盛驾乘意外险</title>
<link rel="stylesheet" href="${ctx}/static/css/zhongan/car_insurance/index.css" />
</head>
<body>
  <div id="app"></div>

    <script>
        var ctx = '${ctx}';

        //点击手机的回退按钮，将调用以下函数，模拟单页回退的效果
        function backFromjs() {
          var btn = document.getElementById("go_back");
          if (btn) {
            document.getElementById("go_back").click();
          } else {
            window.minsheng.clickOnAndroid();
          }
        }
    </script>
    <script src="${ctx}/static/js/plugins/mobiscroll/js/jquery-1.9.1.min.js"></script>
    <link href="${ctx}/static/js/plugins/mobiscroll/css/mobiscroll.custom-2.5.0.min.css" rel="stylesheet" type="text/css" />
    <script src="${ctx}/static/js/plugins/mobiscroll/js/mobiscroll.custom-2.5.0.min.js" type="text/javascript"></script>
    <script src="${ctx}/static/js/mobile/zhongan/car_insurance/bundle.js"></script>
</body>
</html>