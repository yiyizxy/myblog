---
title: eslint && prettier
date: 2024/09/04
tags:
 - 框架
categories:
 - 框架
---

## eslint

### 使用

```shell
pnpm add eslint -D // 安装
pnpm create @eslint/config // eslint配置文件的初始化
or
npm init @eslint/config
```

```json
// .eslintignore

*.sh
node_modules
*.md
*.woff
*.ttf
.vscode
.idea
dist
/public
/docs
.husky
.local
/bin
Dockerfile
```

```js
// 配置
module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/vue3-recommended',
        'plugin:prettier/recommended'
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: {
            jsx: true
        },
        parser: '@typescript-eslint/parser',
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint', 'vue'],
    rules: {
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        // vite打包时自动去除console和debugger,所以这里直接关掉检查
        'no-console': 'off',
        'no-debugger': 'off'
    }
}
```

## Prettier

虽然ESLint本身具备自动格式化代码的功能(eslint --fix)，但术业有专攻，ESLint 的主要优势在于代码的风格检查并给出提示，而在代码格式化这一块 Prettier 做的更加专业，因此我们经常将 ESLint 结合 Prettier 一起使用。

### 使用

`pnpm add prettier -D`

```js
// .prettierrc.js 详见：https://www.prettier.cn/docs/options.html
module.exports = {
    printWidth: 100, //一行的字符数，如果超过会进行换行，默认为80
    tabWidth: 4, // 一个 tab 代表几个空格数，默认为 2 个
    useTabs: false, //是否使用 tab 进行缩进，默认为false，表示用空格进行缩减
    singleQuote: true, // 字符串是否使用单引号，默认为 false，使用双引号
    semi: true, // 行尾是否使用分号，默认为true
    trailingComma: "none", // 是否使用尾逗号
    htmlWhitespaceSensitivity: "strict", // HTML空白敏感度
    bracketSpacing: true, // 对象大括号直接是否有空格，默认为 true，效果：{ a: 1 }
    proseWrap: "never", // 换行设置
}
```

### .prettierignore

也可以不创建，配置.eslingignore即可

```json
/dist/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*
```

### 配置

```js
module.exports = {
    printWidth: 100, //一行的字符数，如果超过会进行换行，默认为80
    tabWidth: 4, // 一个 tab 代表几个空格数，默认为 2 个
    useTabs: false, //是否使用 tab 进行缩进，默认为false，表示用空格进行缩减
    singleQuote: true, // 字符串是否使用单引号，默认为 false，使用双引号
    semi: true, // 行尾是否使用分号，默认为true
    trailingComma: 'none', // 是否使用尾逗号
    htmlWhitespaceSensitivity: 'strict', // HTML空白敏感度
    bracketSpacing: true, // 对象大括号直接是否有空格，默认为 true，效果：{ a: 1 }
    proseWrap: 'never' // 换行设置
}
```

### Vscode Prettier插件

vscode安装prettier-code formatter插件后，我们看下如果项目中是否安装prettier包和是否配置prettierrc文件，代码最终如何格式化？
1.无npm包无配置文件，使用捆绑prettier + settings.json
2.有npm包无配置文件，使用捆绑prettier + settings.json
3.有npm包有配置文件，使用npm prettier + 配置文件。
4.无npm包有配置文件，使用捆绑prettier + 配置文件

## Husky

husky是一个为git客户端增加 hook 的工具。安装后，它会自动在仓库中的.git/目录下增加相应的钩子；比如pre-commit钩子就会在你执行git commit的触发。如何使用

```json
package.json配置
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged", // 执行单个命令
      "pre-commit": "echo wangnima && echo handsome" // 执行多个命令
    }
  }
}
```

或者根目录下配置.huskyrc.js，从 1.0.0 开始，husky的配置可以使用 .huskyrc、.huskyrc.json、.huskyrc.js 或 husky.config.js 文件

```js
const tasks = arr => arr.join(' && ')

module.exports = {
  hooks: {
    'pre-commit': arr([
      'echo wangnima',
      'npm run test'
    ])
  }
}
```

## lint-staged

从v3.1开始，您现在可以使用不同的方式进行lint-staged配置：

- package.json配置文件中的lint-staged
- .lintstagedrc JSON或YML格式的文件
- lint-staged.config.js JS格式的文件
- 使用 --config 或 -c 标志传递配置文件

lint-staged是一个在git暂存文件上（也就是被 git add 的文件）运行已配置的linter（或其他）任务。lint-staged总是将所有暂存文件的列表传递给任务。

```json
"lint-staged": {
  "src/**/*.{js,vue}": [
    "prettier --write",
    "eslint --cache --fix",
    "git add"
  ]
}
```

## commitlint

`@commitlint/config-conventional`由type和subject组成

- feat: 添加新功能。
- fix: 修复 Bug。
- chore: 一些不影响功能的更改。
- docs: 专指文档的修改。
- perf: 性能方面的优化。
- refactor: 代码重构。
- test: 添加一些测试代码等等。

## 参考

[你不能再说你不会配置ESLint和prettier了](https://juejin.cn/post/7239987776552714300?searchId=202403281603225E8084C31DAD2F0CE4A0)
[工程化之代码规范——eslint + prettier + husky梳理实践](https://juejin.cn/post/7293480734492246051?searchId=202403281547271B847421C0F521058DFE)
[使用husky + lint-staged助力团队编码规范](https://juejin.cn/post/6847902218713038862)
