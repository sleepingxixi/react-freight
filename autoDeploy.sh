#!/bin/bash

## 目前这个文件已经上传到远程服务器的/usr/local/web下，并且通过alias设置了快捷方式，通过执行lp_deploy就可以完成部署了

# 删除dist目录内容，并拷贝最新文件到dist目录
if [[ -z "$(find /usr/local/web/tmp -maxdepth 0 -empty)" ]]; then
  echo 'tmp不为空'
  rm -rf /usr/local/web/spa/*
  cp -r /usr/local/web/tmp/* /usr/local/web/spa/
fi

# 检查是否有nginx进行，有则删除
ID=$(netstat -tulnp | grep :80 | awk '{print $7}' | cut -d '/' -f 1)
echo $ID
if [[ -n "$ID" ]]; then
    kill $ID
    echo '删除完成'
fi

# 启动nginx
nginx -c /usr/local/web/nginx/conf/nginx.conf
newID=$(netstat -tulnp | grep :80 | awk '{print $7}' | cut -d '/' -f 1)
echo $newID
if [[ -n "$newID" ]]; then
    echo '启动成功'
    # 删除临时目录内容
    rm -rf /usr/local/web/tmp/*
fi



