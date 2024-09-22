---
title: React-Router
date: 2024/07/29
tags:
 - 框架
categories:
 - 框架
---

## React-Router是什么？

可以实现无刷新页面的情况下显示不同的页面
react-router: 实现了路由的核心功能,提供一些核心api,如Router、Route，不提供和Dom相关的api
react-router-dom: 基于react-router，提供浏览器运行环境所需的特定组件,`<BrowserRouter>`、`<HashRouter>`、`<Route>`、`<Routes>`这些
react-router-native: 基于react-router，加入了react-native运行环境下的一些功能
react-router-config: 用于配置静态路由的工具库

## history和hash路由区别？

hash路由url上会携带#不美观,不支持SSR
history路由需要后端配合改（ningix）,支持SSR

## V6和V5的区别

1.`<Route>`路径的变化

* 占位符`*`和`:id`可以用，正则不能用了
* v6中的所有路径匹配都将忽略URL上的尾部"/"

```bash
// v6
/user/*
/detail/:id
```

2.`<Switch>`重命名为`<Routes>`

```js
// 原
<Switch>
    <Route path="/index1"><Index1/></Route>
    <Route path="/index2"><Index1/></Route>
</Switch>

// v6
<Routes>
    <Route path="/index1"><Index1/></Route>
    <Route path="/index2"><Index1/></Route>
</Routes>
```

3.`<Route>`的component变成了element

```js
// 原
<Route path="/index1" component={Index1} />

// v6
<Route path="/index1" element={<Index1 />} />
```

4.`<Outlet>`渲染子路由

```js
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/content" element={<Content />}>
      <Route path="index1" element={<Index1 />} />
      <Route path="index2" element={<Index2 />} />
    </Route>
  </Routes>
</BrowserRouter>

// Content
import { Outlet } from 'react-router-dom'
function Content() {
  return (
    <div>
      <title>这是Content</title>
      {/* 这里渲染子路由！！ */}
      <Outlet />
      {/* 这里渲染子路由！！ end */}
    </div>
  )
}
```

5.取消useHistory，用useNavigate作为替代

```js
// 原
import { useHistory } from 'react-router-dom';
...
const history = useHistory()
history.push('/index1')
history.replace('/index2')
...

// v6
import { useNavigate } from 'react-router-dom';
...
const navigate = useNavigate();
navigate('/index1')
navigate('/index2', {replace: true})
...
```

6.重定向`<Redirect/>`删除，新增`<Navigate/>`

```js
// defore
<Redirect to='index1' />
// after
<Navigate to='index1' />
```

7.新增useRoutes，可以替代react-router-config，通过useRoutes渲染路由，传入我们已经集中配置好的routes

```js
const routes = {
    path: '/',
    element: <SecurityLayout />,
    children: [
        { path: '', element: <Navigate to="/user/login" /> }, // Redirect 重定向！
        {
            path: '',
            element: <BasicLayout />,
            children: [
                // BasicLayout 业务页面
                {
                    path: 'index1',
                    element: <Index1/>
                },
                {
                    path: 'index2',
                    element: <Index2/>
                },
            ]
        },
    ]
}
function RenderRoutes() {
    const element = useRoutes(routes)
    return element;
}
```

## React-routerV6引入的hooks有哪些？

useLocation获取当前页路径以及从哪个页面跳转过来

```js
import { useLocation } from "react-router-dom"

const About = () => {
  const location = useLocation()
  const { from, pathname } = location
  return (
    <>
      now you are in {pathname}, and you are from {from} page
    </>
  );
};
export default About

```

useNavigate实现页面跳转

```js
import { useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()
  return (
    <>
      login
      <button
        onClick={() => {
          navigate("/about")
        }}
      >
        跳转到关于页面
      </button>
    </>
  )
}
export default Login
```

## 默认显式二级路由

去掉原本的Route标签中的path属性，改为添加index属性

```js
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="board" element={<Board />}></Route>
          <Route index element={<Article />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
```

## 参考

[react-router v6](https://juejin.cn/post/7052933770260938783)