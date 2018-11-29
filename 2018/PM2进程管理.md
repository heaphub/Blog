# PM2进程管理
It allows you to keep applications alive forever, to reload them without downtime and facilitate common Devops tasks.

上面是官方说的，下面是我说的。

使用Daemon（守护进程）的方式运行你的代码，同时可以做到Zero Downtime（不停机）更新你的代码。

## 支持的语言
PM2可以运行bash、python、ruby、perl、node。

我主要是用PM2运行Node。ruby可以使用Puma、Unicorn（推荐Puma）。

## 运行模式
### fork
没啥说的，启动一个进程并运行目标代码。

### cluster
集群模式，这是PM2优秀的功能之一。采用Master和Worker的形式来运行代码，从而做到Load-Balancing（负载平衡）。

Zero Downtime也是依赖此特性，fork模式是做不到的。reload时按顺序杀死工作进程，保证任意时刻都有工作进程在提供服务。reload过程中PM2会发送`SIGINT`信号给进程，进程做出退出服务的处理，包括停止接收新的请求、继续处理刚才未完成的请求、回收数据库和缓存的连接（Graceful Shutdown）。

## 其他优秀特性
* 最大内存使用限制，触发后自动重启。
* 定时重启，支持cron配置。
* 强大的监控，从前叫Keymetrics，现在是PM2 Plus。
* startup 和 save(dump) 实现服务器开机自动启动。
* deploy特性，支持SSH Remote Deploy。

## 常用命令
* start、restart、stop、reload 启动、重启、停止、重加载（Zero Downtime）。
* startOrGracefulReload 启动或重加载，自动检查程序是否启动，从而使用start或reload。
* startup、save（dump）创建服务器自动开机启动脚本，save会保存当前运行的所有进程，并在服务器重启后恢复运行。
* list 列出当前正在进行的服务。
* log 接入进程的stdout，从而获取console信息。
* monit 显示监控信息

## 坑
官方文档写的json配置中存在错误，exec_mode官方给的值是fork、cluster。但是在3.x版本里面这个配置错误，正确的值是fork、cluster_model。

这个错误主要会出现在3.x版本执行`startOrGracefulReload`时，会触发*port is already in use*从而导致进程无限重启。exec_mode设置为`cluster_mode`可解决此问题。

## 更多功能
详见[https://pm2.io/](https://pm2.io/) 或 `pm2 --help`

> 好的工具一般会在`--help`里把特性给你讲清楚。

## 知识点 
* 关于Cluster特性，可以查看Node的cluster模块。
* 多进程通讯。