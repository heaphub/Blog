# Docker分阶段构建

使用不同的Image提供不同的构建环境，例如发布SPA应用，它需要先build再发布。build时需要Node环境，build成功后需要HTTP服务器提供访问。

分阶段构建，实现了构建的pipe line模式，可以把它理解成当前构建是由多个小的构建任务按顺序组成的，每个任务都会把自己的成果贡献给下一个任务。

## Dockerfile示例
构建SPA需要用到的镜像：
* Node
* Nginx

```Dockerfile
FROM node:8 as builder
WORKDIR /home/spa
COPY package.json /home/spa
RUN npm install --registry=https://registry.npm.taobao.org
COPY . /home/spa
RUN npm run build

FROM nginx:alpine
COPY --from=builder /home/spa/dist /usr/share/nginx/html
```

## 使用

拷贝上述`Dockerfile`到您的项目目录，执行如下命令即刻使用容器部署项目。

```bash
docker build . -t mySpaWithDocker
```

## Tips

镜像仓库推荐阿里云、腾讯云、网易蜂巢等，有精力的也可以考虑自建仓库。

可以考虑在SPA构建后，将静态资源上传至CDN提升页面加载速度，CDN设置过期时间为最大值，浏览器在资源不变的前提下可从缓存加载。