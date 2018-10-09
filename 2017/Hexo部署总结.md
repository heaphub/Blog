# Hexo部署总结
写程序有一段时间了，最近特别想写点什么，把自己的一些想法与经验分享给热爱写码子的你。

## Hexo
Hexo是基于Node的一个博客框架，采用Markdown语法书写内容，框架本身拥有较多的第三方插件和主题包。
结合Github的Pages服务，部署一个自己的博客真的是很方便。

## 环境准备
既然Hexo是基于Node的，那么Node肯定就少不了，其次需要使用到Git

### Node 安装
* [下载Node](https://nodejs.org/en/download/)

既然说到了Node，那么必须说一下Node的包管理工具NPM，通过npm命令可以很方便的安装和使用第三方库，并且具有很好的依赖管理。

NPM有个弱点，国人访问有点慢，此时推荐使用淘宝的NPM源[taonpm](https://npm.taobao.org/)来加速。

### Git 安装
* [下载Git](https://git-scm.com/downloads)

## Hexo 安装
```bash
npm i hexo -g
```
安装好以后，你就可以使用hexo命令来创建blog了。

## Hexo 常用命令
init 创建一个博客项目
```bash
cd project-path
hexo init
```

new 新建一片文章
```bash
hexo new 我是Hello
```

clean 清理已生成的博客
```bash
hexo clean
简写
hexo c
```

generate 生成博客
```bash
hexo generate
简写
hexo g
```

deploy 部署博客
```bash
hexo deploy
简写
hexo d
```

## Hexo 部署
写好了文章肯定是要分享给朋友们看的，那么这时就需要一个http服务器来部署我们的博客。

推荐给大家一个常用的方法，[Github Pages](https://pages.github.com/) 它提供了一个Http服务，方便我们快速部署website。

那么想用这个功能，前提就得有个Github账号，然后创建一个项目（记得把SSH Key提前设置到Github）。

将新建的项目地址复制到博客项目根目录下的_config.yml里面

```yaml
deploy:
  type: git
  repo: git@github.com:llb421270473/MyBlog.git // 自己的项目地址
```

## Hexo 百度BAE部署
Github Pages服务的确方便而且免费，缺点是国内访问慢，绑定的域名需要备案，否则各大手机软件会弹警告。

百度BAE的好处是速度快、稳定，最低0.1元/天，提供duapp的二级域名，从而免备案。

登录[百度云](https://cloud.baidu.com/)，购买一个lighttpd-static的执行单元，代码版本工具选择git，内存大小根据需求自己选，几毛钱的差价而已。

_config.yml 配置如下
```yaml
deploy:
  type: git
  repo: // BAE自己的项目地址
```

在.deploy_git/.git/config文件中追加如下内容，从而避免git上传报出文件内容过大的错误
```git
[http]
        postBuffer = 524288000
```

## 配置域名
现在注册域名就像淘宝购物这么简单，如果想给自己的博客分配个域名，那么这时Github Pages服务依旧可以帮助你。

首先将自己的域名使用CNAME的形式解析到  **自己的账号.github.io** 

其次在项目根目录的source文件夹下创建一个名称为CNAME的文件

在CNAME文件里写好你的域名（下面是我的博客域名）
```text
blog.coderdog.club
```

> source文件夹可以用来存储每次生成博客时需要拷贝的文件

## 一键部署
package.json的scripts可以存储一个命令执行过程，那么使用这个特性我们写个超级简单的脚本

```javascript
"scripts": {
    "deploy": "hexo c && hexo g && hexo d"
  }
```

执行脚本就可以轻松部署了
```javascript
npm run deploy
```
