# 前端异常错误收集平台

# 服务部署

## 开发环境启动

```
NODE_ENV=development pm2 start app.js --watch --name='error-server'
```

## 测试环境启动

```
NODE_ENV=test pm2 start app.js --name='error-server'
```

## 线上环境启动

```
NODE_ENV=production pm2 start app.js --name='error-server'
```

# 项目收集代码添加

## 1.添加到项目入口页面(HTML)

```

<script>
     var handleErr = function (e, filename, fnname, line) {
        var errObj = {
            filename: filename,
            fnname: fnname,
            line: line,
            errmsg: e.message,
            ua: navigator.userAgent,
            stack: e.stack,
            type: e.name,
            project: '项目名称',
            url: window.location.href
        }
        var urlData = [];

        for(let key in errObj) {
            urlData.push(key +'='+ encodeURIComponent(errObj[key]));
        }
        var url = '本项目地址/api/error?'
        var imgUrl = `${url}${urlData.join('&')}`;
        var image = new Image();
        image.src = imgUrl;
    }
</script>
```

```

```
