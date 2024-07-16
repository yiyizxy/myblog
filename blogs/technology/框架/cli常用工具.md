---
title: cli常用工具
date: 2024/07/16
tags:
 - 框架
categories:
 - 框架
---

## cli相关

### 1.处理依赖

`path`: 处理路径

`chalk`
作用:用于在终端中设置文本样式
主要功能
文本颜色：设置文本的前景色，如红色、绿色、蓝色等。
背景颜色：设置文本的背景色。
文本样式：设置文本的样式，如粗体、下划线、斜体等。
组合样式：可以组合多种样式应用于同一段文本。

```js
const chalk = require('chalk')
console.log(chalk.red('This is a red text'))
console.log(chalk.bgRed('This text has a red background'))
console.log(chalk.bold('This is bold text'))
console.log(chalk.blue('Hello', chalk.red.bold('World'), '!'))
```

`fs-extra`
作用：是一个基于 Node.js内置的 fs 模块的增强版，提供了更多实用的文件系统操作方法
主要功能
文件和目录的复制：递归复制文件和目录。
文件和目录的移动：递归移动文件和目录。
文件和目录的删除：递归删除文件和目录。
创建目录：递归创建目录。
读取和写入 JSON 文件：简化 JSON 文件的读写操作。
确保文件和目录存在：确保文件或目录存在，如果不存在则创建它们。
```js
const fs = require('fs-extra')
// 递归复制文件或目录
fs.copy('/path/to/source', '/path/to/destination')
  .then(() => console.log('Copy completed!'))
  .catch(err => console.error(err))

// 确保文件存在
fs.ensureFile('/path/to/file.txt')
  .then(() => console.log('File ensured!'))
  .catch(err => console.error(err))
```

`inquirer`
作用:用于在命令行界面（CLI）中与用户进行交互的Node.js库
主要功能
- 创建交互式提示：支持多种类型的提示，包括输入、确认、单选、多选等。
- 自定义提示：允许自定义提示的行为和外观。
- 异步操作支持：可以在提示过程中进行异步操作，如从服务器获取数据。
- 验证和过滤：支持对用户输入进行验证和过滤。

`commander`
作用：一个用于构建命令行接口（CLI）应用的Node.js库
主要功能
命令定义：定义和处理多个命令，每个命令可以有自己的选项和参数。
选项解析：支持短选项（如 -p）和长选项（如 --port），并且可以为选项指定默认值。
参数解析：解析命令行参数，并将其传递给相应的命令处理函数。
自动生成帮助信息：自动生成并显示命令和选项的帮助信息。
全局选项：支持全局选项，这些选项可以在所有命令中使用。

```js
const { Command } = require('commander')
const program = new Command()

program
  .name('my-cli-tool')
  .description('An example CLI tool')
  .version('1.0.0');

program
  .command('serve')
  .description('Start the server')
  .option('-p, --port <number>', 'Port to run the server on', 3000)
  .action((options) => {
    console.log(`Server is running on port ${options.port}`);
  })

program
  .command('build')
  .description('Build the project')
  .option('-o, --output <directory>', 'Output directory', 'dist')
  .action((options) => {
    console.log(`Building the project to ${options.output}`);
  })

program.parse(process.argv)

```

`download-git-repo`:

### 2.处理工程入口

```js
// 1.初始化npm
npm init

// 2.新建主命令
新建bin/index.js文件 + package.json里配置bin入口
// #! /usr/bin/env node

// 3.关联主命令与配置项
npm link

// 4.执行主命令即可关联逻辑内容
// yiyizxy-cli
```

### 3.加入交互命令

```js

```

`npm-run-all`: 用于并行或串行运行多个 npm script 的工具包

都是改变this指向和函数的调用，call和apply功能类似，只是传参不同

