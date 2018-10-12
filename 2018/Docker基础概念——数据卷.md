# Docker基础概念——数据卷（Volume）
容器在启动时需要加载指定的Docker镜像，容器以**只读**的方式按序加载镜像的每一层，并在**顶层**添加一个**读写层**。容器只能在**读写层**修改或新增文件，那么当容器被删除，并再次使用原有镜像启动时，从前的修改都会**丢失**，为了使数据可以持久化，Docker加入了**数据卷**（Volume）的概念。

数据卷主要为容器提供数据持久服务，多个容器可共享一个数据卷。Volume在Docker启动前，将**宿主**的目录或者文件**链接到**指定的目录或文件上（此目录的父级目录是镜像在宿主的释放目录），容器启动后就可将数据**持久化**到宿主上。那么此时再删除容器，不会造成数据丢失的问题。

Docker的数据卷有如下几种：
1. 数据卷，如果`-v`参数不是映射模式，容器默认会创建一个匿名卷，在宿主默认目录（/var/lib/docker/volumes/）下。
2. 容器卷，将一个容器制作为数据卷。
3. 宿主目录或文件作为数据卷。
4. 远程目录或其他文件系统。


## 数据卷
### 创建
#### 匿名卷
docker run的-v命令创建**匿名卷**，此命令会在容器根目录下创建一个data目录。

```bash
$ docker run -d -v /data -p 8888:80 nginx
```

#### 非匿名卷
创建名为**my_storage**的数据卷。
```bash
$ docker volume create --name my_storage
```

挂载**my_storage**数据卷到容器内的**/data**目录。

```bash
$ docker run -d -v my_storage:/data -p 8888:80 nginx
```

### 移除
移除容器时同时移除匿名卷。

```bash
$ docker rm -v containerId
```

一次性容器，容器启动时加入`--rm`参数，当容器停止时它会删除容器和匿名卷。
```bash
$ docker run --rm -d -v /data -p 8888:80 nginx
```

非匿名数据卷。
```bash
$ docker volume ls
$ docker volume rm volumeId
```

## 容器卷
### 创建
容器卷，其实就是一个正常的容器，只不过它是用来被其他容器挂载数据卷用的。

使用`--name`参数创建一个名为**nginx-volume**的数据容器，容器卷无需工作在运行状态。

```bash
$ docker run --name nginx-volume -d -v /usr/share/nginx/html nginx echo volume container
```

为了直观表现数据的共享，我们向容器卷写入数据。

```bash
$ echo hi >> ~/Desktop/index.html
$ docker cp ~/Desktop/index.html nginx-volume:/usr/share/nginx/html/
```
### 挂载
`--volumes-from`参数可以挂载多个容器卷到一个容器，不同的容器也可挂载同一个容器卷。

```bash
$ docker run --name nginx1 -d --volumes-from nginx-volume -p 8888:80 nginx
$ docker run --name nginx2 -d --volumes-from nginx-volume -p 8889:80 nginx
```

访问*http://localhost:8888*和*http://localhost:8889*可以看到我们拷贝的index.html的内容。

`--volumes-from`还可以支持级联挂载，例如：

```bash
$ docker run --name nginx3 -d --volumes-from nginx2 -p 8890:80 nginx
```

### 移除
容器卷被移除前会检查是否还有其他容器正在使用自己，如果有则会拒绝移除。

```bash
$ docker rm -v containerId
```

## 宿主目录
将宿主**本地目录**映射到**容器内目录**，对容器内目录的读写会在宿主上保留，不随容器销毁而消失。

将桌面的data目录映射至容器的data目录。

```bash
$ docker run -d -v /Users/calvinlee/Desktop/data:/data -p 8888:80 nginx
```
