# MongoDB副本集搭建方法与注意事项

请注意，我们搭建的是集群内网互通的副本集，外网无法访问。

## 特点
* 服务器多分区可用，不存在单点故障（云服务总会出现某分区故障）。
* 数据多分区冗余，保证数据安全。
* MongoDB4副本集环境下支持事物，做到金融级保障。

## 数据库安全
1. 创建管理员，开启身份认证。
2. 配置防火墙，数据库仅对内网指定机器可访问，拒绝所有外网访问。
3. 不要在代码里写死数据库密码。
4. 数据库密码经过二次加密后保存至onePassword或者其他密码管理器里面。
5. 团队在管理密码与秘钥上要有流程，不要随意提供给开发者。
6. 做好代码审计与数据库权限管理，一定要review，一定要review，一定要review。

## 安装MongoDB4.0
1. 下载安装包`wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-4.0.9.tgz`
2. 解压安装包`tar -zxvf mongodb-linux-x86_64-4.0.9.tgz`
3. 移动安装包至目标路径，我的目标路径是/data/mongo，`mv mongodb-linux-x86_64-4.0.9.tgz /data/mongo`
4. 配置`/etc/bashrc`文件，追加**代码块1**的内容。
5. 刷新配置，`source /etc/bashrc`
6. 创建目标文件夹，用来存放数据文件、日志、SSLKey，`mkdir -p mongodb/data mongodb/keyfiles mongodb/logs`
7. 创建数据库配置文件，`vi /data/mongodb/mongo.conf`，复制**代码块2**的内容，此时先注释**安全配置**的内容。
8. 启动数据库，`mongod -f /data/mongodb/mongo.conf`
9. 在其余两台机器上执执行上述过程。

## 副本集命令配置
```bash
> mongod --port 27017
> config = {
  "_id": "repName",
  "members": [
    {"_id": 0, "host": "192.168.1.10:27017", "priority": 50},
    {"_id": 1, "host": "192.168.1.11:27017", "priority": 5},
    {"_id": 2, "host": "192.168.1.12:27017", "arbiterOnly": true}
  ]
}
> rs.initiate(config) // 副本集初始化
> rs.status() // 查看副本集配置
```
> * priority，用来控制节点成为主节点的优先级
> * arbiterOnly，此节点只负责投票不参数数据同步

## 添加管理员
基于角色来创建用户

```bash
> use admin
> db.createUser({user:"root", pwd:"推荐使用密码生成器生成", roles:[{role: "root", db:"admin" }]})
```

更多角色，请参考[官方文档](https://docs.mongodb.com/manual/reference/built-in-roles/#database-user-roles)

## 添加keyfile用于副本集节点认证
```bash
> openssl rand -base64 90 -out /data/mongodb/keyfiles/replKey
> chmod 600 /data/mongodb/keyfiles/replKey
```

复制这个keyfile到其他节点，恢复先前注释的**安全配置**，重启实例。

## 注意
随着时间的变化配置可能过时，但是大致的流程类似。为了节省宝贵的时间，推荐阅读官方文档。

## 代码块

### 代码块1：
```bashrc
# MongoDB config
MONGO_HOME=/data/mongo
PATH=$MONGO_HOME/bin:$PATH
export PATH MONGO_HOME
```

### 代码块2：
配置文件更多细节，请参考[官方文档](https://docs.mongodb.com/manual/reference/configuration-options/)

```mongo.conf
# 进程管理
processManagement:
  fork: true
  pidFilePath: /data/mongodb/mongod.pid

# 网络配置
net:
  port: 27017
  bindIp: 0.0.0.0
  bindIpAll: true

# 存储配置
storage:
  dbPath: /data/mongodb/data
  journal:
    enabled: true

# 系统日志
systemLog:
  destination: file
  logAppend: true
  path: /data/mongodb/logs/mongod.log

# 副本集
replication:
  oplogSizeMB: 30000
  replSetName: "repName"

# 安全配置
security:
  keyFile: /data/mongodb/keyfiles/replKey
  authorization: enabled
```
