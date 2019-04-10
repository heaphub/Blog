# Git秘籍

使用此秘籍不废话

## 实战方法

### 提交信息写错了

执行如下命令，修改提交信息后，按`esc + : + wq + enter`完成修改。这个修改不是在原有上直接修改，会生成一个新的提交，使用`git push -f`覆盖一下就好了。

```bash
git commit --amend
```

### 将其他分支的某个提交附加到当前分支

例如修复了线上Bug，但是测试环境的Bug还没修，传统的方法就是直接复制修复代码到develop分支然后提交。

这样做效率太低了。

使用cherry-pick把某个提交搬到当前分支上，也可以将某个提交区间搬过来。

```bash
git checkout develop
git cherry-pick commit-hash | branch
```

### 这段代码谁写的

这个命令可以将文件中的每一行的作者、最新的变更提交和提交时间展示出来。

```bash
git blame [file_name]
```

### 不再管理这个文件的变化

有时不小心将x.log文件提交到了版本库，此时在.gitignore文件中添加忽略后发现无用。

使用如下命令停止追踪文件。

```bash
git rm --cached filepath
```

### 后悔药

卧槽，我竟然删除了没有推到远端的分支，代码全没了。

reflog记录了git的所有操作，可以理解为这时git的oplog，通过它回到任何你想返回的状态。

```bash
git reflog
```

使用reset命令或checkout命令到指定的commit-hash即可恢复。

### 重构提交，保证版本库的一条线

在开发过程中会经常提交保存，有时多个提交都是在针对一个功能，那么在发合并请求时代码审查员看着一大堆的提交不知你在干嘛。

这时我们需要整理自己的提交信息，合并多个提交、提炼提交信息、修改提交顺序，保证提交信息说清楚这个提交的具体作用。

交互式变基，绝对是整理提交的一把能手。

下面的代码代表在feature-x分支上向下的5个提交进行交互式变基。

```bash
git rebase -i feature-x~5
```

输入上面命令，会进入变基的变基器，

```bash
pick 7fad941 add 修改功能A大小
pick 953aabb add 修改功能A颜色

# Rebase 731d00b..953aabb onto 731d00b (2 commands)
#
# Commands:
# p, pick = use commit
# r, reword = use commit, but edit the commit message
# e, edit = use commit, but stop for amending
# s, squash = use commit, but meld into previous commit
# f, fixup = like "squash", but discard this commit's log message
# x, exec = run command (the rest of the line) using shell
# d, drop = remove commit
```

这两提交都是在修改同一个功能的样式，那么可以合并在一起，将`pick`修改为`s`。

```bash
s 7fad941 add 修改功能A大小
s 953aabb add 修改功能A颜色

# Rebase 731d00b..953aabb onto 731d00b (2 commands)
#
# Commands:
# p, pick = use commit
# r, reword = use commit, but edit the commit message
# e, edit = use commit, but stop for amending
# s, squash = use commit, but meld into previous commit
# f, fixup = like "squash", but discard this commit's log message
# x, exec = run command (the rest of the line) using shell
# d, drop = remove commit
```

保存并退出编辑器，此时需要你输入新的提交信息，输入后保存即可。

**推荐使用SourceTree的可视化交互式变基特别方便。**

变基冲突时，处理好冲突后使用如下命令继续变基。

```bash
git rebase --continue
```

终止变基

```bash
git rebase --abort
```