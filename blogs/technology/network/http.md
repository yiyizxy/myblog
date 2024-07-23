---
title: HTTP
date: 2024/07/01
tags:
 - 网络
categories:
 - 网络
---

## TCP/IP网络模型

OIS7层模型：
物理层、数据链路层、网络层、传输层、会话层、表示层、应用层

TCP/IP模型：
数据链路层、网络层、传输层(TCP/IP协议)、应用层(HTTP协议)

## HTTP请求方法

1.GET
用途: 请求指定的资源。
特点: 数据在URL中可见，适用于查询操作。

2.POST
用途: 提交数据给服务器，如表单提交。
特点: 数据在请求体中，适用于创建或更新资源。

![difference](./assets/http/difference.png "differenec")

3.PUT
用途: 将请求的内容放到指定的URL下，如果存在则更新它。
特点: 类似POST，但通常用于明确的更新操作。

4.DELETE
用途: 删除指定的资源。
特点: 用于资源的删除操作。

5.HEAD
用途: 类似于GET，但服务器不返回消息体，只返回头信息。
特点: 用于获取资源的元数据。

6.OPTIONS
用途: 查询服务器支持的HTTP方法。
特点: 用于CORS中预检请求，或者了解服务器的能力。

7.PATCH
用途: 对资源进行部分更新。
特点: 与PUT类似，但只是部分修改。

8.TRACE
用途: 追踪请求-响应的传输路径。
特点: 主要用于测试或诊断。

9.CONNECT
用途: 用于代理服务器，将连接转换为透过代理服务器的TCP/IP隧道。
特点: 主要用于SSL加密服务器的通信。

使用场景举例

- GET: 获取网页内容或者查询API。
- POST: 提交表单数据或者上传文件。
- PUT: 更新用户信息或者替换文件内容。
- DELETE: 删除用户账户或者移除文件。
- HEAD: 检查网页是否存在或者获取文件大小。
- OPTIONS: 检查API的允许跨域请求的方法。
- PATCH: 更新部分用户资料，如更改邮箱。
- TRACE: 网络诊断工具，跟踪请求路径。
- CONNECT: 设置VPN连接或使用代理浏览网页。

HTTP状态码分类：

- 1XX ：信息状态码
- 2XX ：成功状态码
- 3XX ：重定向
- 4XX ：客户端错误
- 5XX: 服务器错误

1XX ：信息性状态码

- 100 Continue: 表示客户端可以继续发送请求体。通常在发送 POST 请求时，客户端发送请求头后，如果服务端准备好接收请求体，会返回 100 Continue，此时客户端可以继续发送请求体。这个状态码在大数据上传场景中很有用，服务器可以在接收完头部后，允许或拒绝客户端继续发送请求体。
- 101Switching Protocols：服务器根据客户端的请求切换协议

2XX ：成功状态码

- 200 OK：请求成功。
- 201 Created：请求已经被实现，结果是创建了新的资源。当我们发送一个POST请求创建新的资源时，此时查看服务器返回的状态码为 201 Created。 这个状态码表示请求已成功，并且服务器创建了新的资源。例如，在创建新的用户账户时，服务器成功接收并保存了用户提供的信息，返回201 Created，表示用户账户已成功创建。
- 204 No Content：服务器成功处理了请求，但没有返回任何内容。当我们发送一个异步的POST请求时，此时查看服务器返回的状态码为 202 Accepted。 这个状态码表示请求已被服务器接收，但尚未被处理。通常在异步处理场景中使用，服务器可能会在后台处理请求，而不会阻塞客户端的操作。例如，提交一个需要一段时间处理的任务。

3XX ：重定向

- 301 Moved Permanently：请求的资源已永久移动到新位置。当发送一个GET请求到一个已经永久重定向的资源时，此时查看服务器返回的状态码为 301 Moved Permanently。 这个状态码表示请求的资源已永久移动到新的位置。例如，当网站的 URL 结构发生变化时，服务器可能返回301，通知客户端将请求重定向到新的URL。
- 302 Found：请求的资源现在临时从不同的URI响应请求。当发送一个GET请求到一个临时重定向的资源时，此时查看服务器返回的状态码为 302 Found。 这个状态码表示请求的资源已经临时移动到新的位置。与301不同，302是临时性的重定向，客户端应该继续使用原始URL。例如，在网站维护期间，暂时将流量重定向到一个备用服务器。
- 304 Not Modified：自从上次请求后，请求的资源未修改过。当发送一个POST请求到一个期望得到重定向的资源时，此时查看服务器返回的状态码为 303 See Other。 这个状态码表示服务器接收到POST请求后，建议客户端将请求重定向到另一个URL。通常在需要使用GET请求获取结果的情况下使用。

4XX ：客户端错误

- 400 Bad Request：服务器无法理解请求的格式。当发送一个包含错误参数的GET请求，此时查看服务器返回的状态码为 400 Bad Request。 这个状态码表示服务器无法理解客户端发送的请求。可能是因为请求的格式不正确，缺少必要的参数等。例如，客户端发送了无效的查询参数。
- 401 Unauthorized：请求未授权。当发送一个需要授权的请求，但没有提供授权信息，此时查看服务器返回的状态码为 401 Unauthorized。 这个状态码表示客户端请求未被授权。通常，服务器将返回401状态码，要求客户端提供有效的身份验证信息，如用户名和密码。
- 403 Forbidden：服务器拒绝请求。当发送一个被禁止访问的请求，此时查看服务器返回的状态码为 403 Forbidden。 这个状态码表示客户端没有访问请求资源的权限。服务器理解客户端的请求，但拒绝执行。可能是由于身份验证通过但权限不足，或者是服务器拒绝执行特定操作的请求。
- 404 Not Found：服务器找不到请求的资源。当发送一个找不到资源的GET请求，此时查看服务器返回的状态码为 404 Not Found。 这个状态码表示服务器无法找到与请求的URI（通常是网页）相对应的资源。这可能是由于客户端请求了不存在的资源、拼写错误的URL等原因导致的，这个状态码在我们日常生活中也是较为常见的。例如，访问一个不存在的网页或请求一个不存在的API端点时，服务器通常返回404状态码。
- 429 Too Many Requests：客户端发送的请求过多。

5XX ：服务器错误

- 500 Internal Server Error：服务器遇到错误，无法完成请求。当发送一个导致服务器内部错误的请求，此时查看服务器返回的状态码为 500 Internal Server Error。 这个状态码表示服务器在处理请求时发生了意外的错误。可能是由于服务器上的代码错误、数据库故障等原因导致的。客户端通常无法解决这种问题，需要由服务器管理员进行修复。
- 501 Not Implemented：服务器不支持请求的功能，无法完成请求。
- 503 Service Unavailable：服务器暂时不可用，通常是由于过载或维护。当发送一个导致服务器暂时不可用的请求，此时查看服务器返回的状态码为 503 Service Unavailable。 这个状态码表示服务器暂时无法处理请求，通常是由于服务器过载、维护或其他暂时性问题。客户端通常可以在稍后重试该请求。例如，当网站维护时，服务器可能返回503状态码。

## XMLHttpRequest实现

XMLHttpRequest（XHR）是一个浏览器内置的对象，允许JavaScript发起HTTP(S)请求

```js
// 创建XMLHttpRequest对象
var xhr = new XMLHttpRequest()
// 配置请求方法,包括请求方法、URL、是否异步、用于进行HTTP认证的用户名、用于HTTP认证的密码
xhr.open('GET', 'http://example.com/api', true, 'username[可选]', 'password[可选]')
// 设置请求头(可选)
xhr.setRequestHeader('Content-Type', 'application/json')
// 设置响应类型（可选）
xhr.responseType = 'json';
// 注册事件监听
xhr.onreadyStateChange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      console.log()xhr.responseText
    } else {
       console.error('Request failed with status: ' + xhr.status);
            // 这里可以处理请求失败的情况
  }
}
// 发送请求，使用send方法发送请求。可以传递数据给服务器，如果不需要发送数据则传递null。
 xhr.send(null);
// 取消请求（可选）
如果需要取消已经发出的请求，可以使用abort方法。
 
 // 超时
 xhr.timeout = 1000;

 // 超时触发方法
 xhr.ontimeout = () => {
 }
 // 其他方法
const contentType = xhr.getResponseHeader("Content-Type"); // 获取某个响应头
const headers = xhr.getAllResponseHeaders(); // 获取所有响应头信息

// xhr.readyState
// 0-尚未调用open
// 1-已调用open
// 2-已调用send
// 3-已接收请求返回数据
// 4-已完成请求
```

## 手撕ajax

实现一个如下ajax功能

```js
ajax({
  url: 'urltest',
  method: 'get',
  async: true,
  timeout: 3000,
  data: {
    payload: 'text'
  }
}).then(res => console.log('success'), err => console.log('fail'))
```

实现

```js
function ajax(options) {
	const { url, method, async, timeout, data } = options
	const xhr = new XMLHttpRequest()
	return new Promise((resolve, reject) => {
		xhr.onreadyStateChange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					resolve && resolve(xhr.responseText)
				} else {
					reject && reject()
				}
			}
		}
		// 超时
		xhr.timeout = () => reject && reject('超时')
		xhr.onerror = (err) => reject && reject(err)

		let _params = []
		let encodeData

        // 参数处理
		if (data instanceOf Object) {
			for (lei key in data) {
				_params.push(`${encodeURIComponent(key)}=${encodeURIComponent(Object[key])}`)
			}
			encodeData = _params.join('&')
		}

		// 方法处理
		if (method === 'get') {
			const index = url.indexOf('?')
			if (index === -1) {
				url += '?'
			} else {
				url += '&'
			}
			url += encodeData
		}

        // 建立连接
		xhr.open(method, url, async)

		if (method === 'get') {
			xhr.send(null)
		} else {
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;chartset=UTF-8')
			xhr.send(encodeData)
		}
	})
}

```

## HTTPS

// TODO


## HTTP vs RPC

HTTP协议（Hyper Text Transfer Protocol），又叫做超文本传输协议。是一种用于在Web浏览器和Web服务器之间交换数据的应用层协议。通过HTTP，Web浏览器可以向Web服务器发送请求并获取响应，从而实现Web页面的访问和传输。HTTP使用TCP作为传输层协议，并采用请求-响应模型来进行通信。RPC（Remote Procedure Call），又叫做远程过程调用，它允许客户端在不知道调用细节的情况下，调用存在于远程计算机上的某个对象，就像调用本地应用程序中的对象一样。RPC的调用协议通常包含传输协议和序列化协议。RPC并不是一个具体的协议，而是一种调用方式，它并没有具体实现，只要按照 RPC 通信协议规范实现的框架，都属于RPC，比如 Dubbo、gRPC 等。整体上看，HTTP和RPC的主要区别5点：1、基于的通信协议不同，HTTP只能基于HTTP协议，而RPC可以基于HTTP、TCP和UDP协议。2、调用方式不同，HTTP 接口通过 URL 进行调用，RPC 接口通过函数调用进行调用。3、使用场景上不同，HTTP主要用于 B/S 架构，是万维网数据通信的基础，服务在网页端和服务端的数据传输上 。而 RPC 更多用于 C/S 架构，多用于分布式系统内部集群里，例如云计算、微服务架构、分布式数据库等，它可以在不同的服务之间进行远程调用，从而实现分布式系统的协作。4、传输效率上，RPC使用自定义的TCP协议，请求报文体积更小，可以很好地减少报文体积，提高传输效率。而HTTP请求中会包含很多无用的内容。5、性能上，RPC协议通常使用二进制编码来传输数据，相对于HTTP协议的文本传输，RPC具有更高的性能和效率。RPC协议通常采用高效的序列化和反序列化技术，减少了数据传输的大小和开销，提高了通信的速度和响应时间。