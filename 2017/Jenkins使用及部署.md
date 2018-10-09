# Jenkins使用及部署
![](http://otj0cetqv.bkt.clouddn.com/170723/jenkins_icon.jpg)

<center>Build great things at any scale</center>
---

[Jenkins](https://jenkins.io)是用来持续集成的利器，它可以帮我们打包（build）、跑测试（test）、部署到测试或者生产环境（deploy）

### 安装

首先确保您的电脑安装了[Docker](https://www.docker.com/docker-mac)，推荐国内docker镜像仓库[网易蜂巢](https://c.163.com/hub#/m/home/)

```docker
docker pull hub.c.163.com/library/jenkins:latest
docker run -p 8080:8080 -p 50000:50000 -v /your/home:/var/jenkins_home hub.c.163.com/library/jenkins:latest
```

命令介绍
* docker pull image_path // 下载一个镜像
* docker run // 启动容器
  * -p 将本地的8080映射到容器的8080
  * -v 将本地的路径挂载到容器的/var/jenkins_home路径
  * 最后一个参数是镜像名称
  * 还可加入-d命令，使容器可以运行在后台

### 使用

docker run 命令执行后在浏览器打开 http://localhost:8080

按照下图步骤初始化jenkins

![](http://otj0cetqv.bkt.clouddn.com/170723/jenkins_start_1.png)
![](http://otj0cetqv.bkt.clouddn.com/170723/jenkins_start_2.png)
![](http://otj0cetqv.bkt.clouddn.com/170723/jenkins_start_3.png)
![](http://otj0cetqv.bkt.clouddn.com/170723/jenkins_start_4.png)
  
### 安装jenkins插件

点击 系统管理 > 管理插件 > 可选插件 > nodeJs Plugin 

安装成功后

点击 系统管理 > Global Tool Configuration，参考下图配置

![](http://otj0cetqv.bkt.clouddn.com/170723/jenkins_start_5.png)

### 配置SSH

配置git访问权限，参考下图

第一步

![](http://otj0cetqv.bkt.clouddn.com/170723/jenkins_start_6.png)

第二步

我们配置SSH的方式访问代码仓库，把ssh的 **私钥** 复制到此处

![](http://otj0cetqv.bkt.clouddn.com/170723/jenkins_start_7.png)

### 创建Job
![](http://otj0cetqv.bkt.clouddn.com/170723/jenkins_start_8.png)

使用Git获取源代码

![](http://otj0cetqv.bkt.clouddn.com/170723/jenkins_start_9.png)


配置构建环境和脚本

![](http://otj0cetqv.bkt.clouddn.com/170723/jenkins_start_10.png)

### 控制台
点击立即构建，待构建完成W显示的是个太阳说明构建成功。

![](http://otj0cetqv.bkt.clouddn.com/170723/jenkins_start_11.png)


### 总结
本项目展示的是一个Web前端项目的构建过程，Jenkins还可以构建Android Apk，Java War包等更多构建需求。

构建执行完毕，可以执行各种bash命令以及SSH远程命令，完成最终的发布过程。


