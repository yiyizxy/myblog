import{_ as n,o as s,c as a,e as t}from"./app-BcWTENpX.js";const p="/myblog/assets/difference-DrHlDGT0.png",e={},o=t('<h2 id="tcp-ip网络模型" tabindex="-1"><a class="header-anchor" href="#tcp-ip网络模型"><span>TCP/IP网络模型</span></a></h2><p>OIS7层模型： 物理层、数据链路层、网络层、传输层、会话层、表示层、应用层</p><p>TCP/IP模型： 数据链路层、网络层、传输层(TCP/IP协议)、应用层(HTTP协议)</p><h2 id="http请求方法" tabindex="-1"><a class="header-anchor" href="#http请求方法"><span>HTTP请求方法</span></a></h2><p>1.GET 用途: 请求指定的资源。 特点: 数据在URL中可见，适用于查询操作。</p><p>2.POST 用途: 提交数据给服务器，如表单提交。 特点: 数据在请求体中，适用于创建或更新资源。</p><p><img src="'+p+`" alt="difference" title="differenec"></p><p>3.PUT 用途: 将请求的内容放到指定的URL下，如果存在则更新它。 特点: 类似POST，但通常用于明确的更新操作。</p><p>4.DELETE 用途: 删除指定的资源。 特点: 用于资源的删除操作。</p><p>5.HEAD 用途: 类似于GET，但服务器不返回消息体，只返回头信息。 特点: 用于获取资源的元数据。</p><p>6.OPTIONS 用途: 查询服务器支持的HTTP方法。 特点: 用于CORS中预检请求，或者了解服务器的能力。</p><p>7.PATCH 用途: 对资源进行部分更新。 特点: 与PUT类似，但只是部分修改。</p><p>8.TRACE 用途: 追踪请求-响应的传输路径。 特点: 主要用于测试或诊断。</p><p>9.CONNECT 用途: 用于代理服务器，将连接转换为透过代理服务器的TCP/IP隧道。 特点: 主要用于SSL加密服务器的通信。</p><p>使用场景举例</p><ul><li>GET: 获取网页内容或者查询API。</li><li>POST: 提交表单数据或者上传文件。</li><li>PUT: 更新用户信息或者替换文件内容。</li><li>DELETE: 删除用户账户或者移除文件。</li><li>HEAD: 检查网页是否存在或者获取文件大小。</li><li>OPTIONS: 检查API的允许跨域请求的方法。</li><li>PATCH: 更新部分用户资料，如更改邮箱。</li><li>TRACE: 网络诊断工具，跟踪请求路径。</li><li>CONNECT: 设置VPN连接或使用代理浏览网页。</li></ul><p>HTTP状态码分类：</p><ul><li>1XX ：信息状态码</li><li>2XX ：成功状态码</li><li>3XX ：重定向</li><li>4XX ：客户端错误</li><li>5XX: 服务器错误</li></ul><p>1XX ：信息性状态码</p><ul><li>100 Continue: 表示客户端可以继续发送请求体。通常在发送 POST 请求时，客户端发送请求头后，如果服务端准备好接收请求体，会返回 100 Continue，此时客户端可以继续发送请求体。这个状态码在大数据上传场景中很有用，服务器可以在接收完头部后，允许或拒绝客户端继续发送请求体。</li><li>101Switching Protocols：服务器根据客户端的请求切换协议</li></ul><p>2XX ：成功状态码</p><ul><li>200 OK：请求成功。</li><li>201 Created：请求已经被实现，结果是创建了新的资源。当我们发送一个POST请求创建新的资源时，此时查看服务器返回的状态码为 201 Created。 这个状态码表示请求已成功，并且服务器创建了新的资源。例如，在创建新的用户账户时，服务器成功接收并保存了用户提供的信息，返回201 Created，表示用户账户已成功创建。</li><li>204 No Content：服务器成功处理了请求，但没有返回任何内容。当我们发送一个异步的POST请求时，此时查看服务器返回的状态码为 202 Accepted。 这个状态码表示请求已被服务器接收，但尚未被处理。通常在异步处理场景中使用，服务器可能会在后台处理请求，而不会阻塞客户端的操作。例如，提交一个需要一段时间处理的任务。</li></ul><p>3XX ：重定向</p><ul><li>301 Moved Permanently：请求的资源已永久移动到新位置。当发送一个GET请求到一个已经永久重定向的资源时，此时查看服务器返回的状态码为301 Moved Permanently。 这个状态码表示请求的资源已永久移动到新的位置。例如，当网站的URL结构发生变化时，服务器可能返回301，通知客户端将请求重定向到新的URL。</li><li>302 Found：请求的资源现在临时从不同的URI响应请求。当发送一个GET请求到一个临时重定向的资源时，此时查看服务器返回的状态码为 302 Found。 这个状态码表示请求的资源已经临时移动到新的位置。与301不同，302是临时性的重定向，客户端应该继续使用原始URL。例如，在网站维护期间，暂时将流量重定向到一个备用服务器。</li><li>304 Not Modified：自从上次请求后，请求的资源未修改过。当发送一个POST请求到一个期望得到重定向的资源时，此时查看服务器返回的状态码为 303 See Other。 这个状态码表示服务器接收到POST请求后，建议客户端将请求重定向到另一个URL。通常在需要使用GET请求获取结果的情况下使用。</li></ul><p>301 vs 302 vs 304 301：永久重定向，客户端和搜索引擎应更新到新的URL。 302：临时重定向，客户端应使用新的URL进行当前请求，但将来仍使用原始URL。 304：缓存验证，资源未修改，客户端应使用缓存的副本。</p><p>4XX ：客户端错误</p><ul><li>400 Bad Request：服务器无法理解请求的格式。当发送一个包含错误参数的GET请求，此时查看服务器返回的状态码为 400 Bad Request。 这个状态码表示服务器无法理解客户端发送的请求。可能是因为请求的格式不正确，缺少必要的参数等。例如，客户端发送了无效的查询参数。</li><li>401 Unauthorized：请求未授权。当发送一个需要授权的请求，但没有提供授权信息，此时查看服务器返回的状态码为 401 Unauthorized。 这个状态码表示客户端请求未被授权。通常，服务器将返回401状态码，要求客户端提供有效的身份验证信息，如用户名和密码。</li><li>403 Forbidden：服务器拒绝请求。当发送一个被禁止访问的请求，此时查看服务器返回的状态码为 403 Forbidden。 这个状态码表示客户端没有访问请求资源的权限。服务器理解客户端的请求，但拒绝执行。可能是由于身份验证通过但权限不足，或者是服务器拒绝执行特定操作的请求。</li><li>404 Not Found：服务器找不到请求的资源。当发送一个找不到资源的GET请求，此时查看服务器返回的状态码为 404 Not Found。 这个状态码表示服务器无法找到与请求的URI（通常是网页）相对应的资源。这可能是由于客户端请求了不存在的资源、拼写错误的URL等原因导致的，这个状态码在我们日常生活中也是较为常见的。例如，访问一个不存在的网页或请求一个不存在的API端点时，服务器通常返回404状态码。</li><li>429 Too Many Requests：客户端发送的请求过多。</li></ul><p>5XX ：服务器错误</p><ul><li>500 Internal Server Error：服务器遇到错误，无法完成请求。当发送一个导致服务器内部错误的请求，此时查看服务器返回的状态码为 500 Internal Server Error。 这个状态码表示服务器在处理请求时发生了意外的错误。可能是由于服务器上的代码错误、数据库故障等原因导致的。客户端通常无法解决这种问题，需要由服务器管理员进行修复。</li><li>501 Not Implemented：服务器不支持请求的功能，无法完成请求。</li><li>503 Service Unavailable：服务器暂时不可用，通常是由于过载或维护。当发送一个导致服务器暂时不可用的请求，此时查看服务器返回的状态码为 503 Service Unavailable。 这个状态码表示服务器暂时无法处理请求，通常是由于服务器过载、维护或其他暂时性问题。客户端通常可以在稍后重试该请求。例如，当网站维护时，服务器可能返回503状态码。</li></ul><h2 id="重定向" tabindex="-1"><a class="header-anchor" href="#重定向"><span>重定向</span></a></h2><h3 id="_301-永久重定向" tabindex="-1"><a class="header-anchor" href="#_301-永久重定向"><span>301（永久重定向）</span></a></h3><p>定义 301状态码表示请求的资源已被永久移动到新的URL。客户端（如浏览器）在接收到301响应后，应使用新的URL进行后续的请求。</p><p>使用场景 网站迁移：当整个网站从一个域名迁移到另一个域名时。 页面重构：当某个页面的URL发生永久变化时。 SEO 优化：301重定向有助于将旧URL的权重传递到新URL，从而保持搜索引擎排名。</p><h3 id="_302-临时重定向" tabindex="-1"><a class="header-anchor" href="#_302-临时重定向"><span>302（临时重定向）</span></a></h3><p>定义 302状态码表示请求的资源临时移动到了新的URL。客户端应继续使用原始的URL进行后续请求。</p><p>使用场景 临时维护：当某个页面临时不可用，需要将用户重定向到另一个页面。 A/B 测试：在进行A/B测试时，可以临时重定向用户到不同的页面。</p><h3 id="区别" tabindex="-1"><a class="header-anchor" href="#区别"><span>区别</span></a></h3><p>重定向的性质： 301：永久重定向，表示资源已永久移动到新的URL。 302：临时重定向，表示资源暂时移动到新的URL。</p><p>浏览器行为： 301：浏览器会缓存重定向，后续请求直接使用新的URL。 302：浏览器不会缓存重定向，后续请求仍使用原始URL。</p><p>SEO 影响： 301：有助于将旧URL的权重传递到新URL，有利于SEO。 302：不会将旧URL的权重传递到新URL，对SEO没有帮助。</p><h2 id="get和post的请求的区别" tabindex="-1"><a class="header-anchor" href="#get和post的请求的区别"><span>GET和POST的请求的区别</span></a></h2><p>Post和Get是HTTP请求的两种方法，其区别如下：</p><p>应用场景： GET请求是一个幂等的请求，一般 Get 请求用于对服务器资源不会产生影响的场景，比如说请求一个网页的资源。而 Post不是一个幂等的请求，一般用于对服务器资源会产生影响的情景，比如注册用户这一类的操作。 是否缓存： 因为两者应用场景不同，浏览器一般会对 Get 请求缓存，但很少对 Post 请求缓存。 发送的报文格式： Get请求的报文中实体部分为空，Post请求的报文中实体部分一般为向服务器发送的数据。 安全性： Get请求可以将请求的参数放入url中向服务器发送，这样的做法相对于Post请求来说是不太安全的，因为请求的url会被保留在历史记录中。 请求长度： 浏览器由于对url长度的限制，所以会影响get请求发送数据时的长度。这个限制是浏览器规定的，并不是 RFC 规定的。 参数类型：post的参数传递支持更多的数据类型。</p><h2 id="post和put请求的区别" tabindex="-1"><a class="header-anchor" href="#post和put请求的区别"><span>POST和PUT请求的区别</span></a></h2><p>PUT请求是向服务器端发送数据，从而修改数据的内容，但是不会增加数据的种类等，也就是说无论进行多少次PUT操作，其结果并没有不同。（可以理解为时更新数据） POST请求是向服务器端发送数据，该请求会改变数据的种类等资源，它会创建新的内容。（可以理解为是创建数据）</p><h2 id="常见的http请求头和响应头" tabindex="-1"><a class="header-anchor" href="#常见的http请求头和响应头"><span>常见的HTTP请求头和响应头</span></a></h2><h3 id="常见的请求头" tabindex="-1"><a class="header-anchor" href="#常见的请求头"><span>常见的请求头</span></a></h3><ul><li>Accept:浏览器能够处理的内容类型</li><li>Accept-Charset:浏览器能够显示的字符集</li><li>Accept-Encoding：浏览器能够处理的压缩编码</li><li>Accept-Language：浏览器当前设置的语言</li><li>Connection：浏览器与服务器之间连接的类型</li><li>Cookie：当前页面设置的任何Cookie</li><li>Host：发出请求的页面所在的域</li><li>Referer：发出请求的页面的URL</li><li>User-Agent：浏览器的用户代理字符串</li></ul><h3 id="常见的响应头" tabindex="-1"><a class="header-anchor" href="#常见的响应头"><span>常见的响应头</span></a></h3><ul><li>Date：表示消息发送的时间，时间的描述格式由rfc822定义</li><li>server:服务器名称</li><li>Connection：浏览器与服务器之间连接的类型</li><li>Cache-Control：控制HTTP缓存</li><li>content-type:表示后面的文档属于什么MIME类型</li></ul><p>常见的Content-Type属性值有以下四种：</p><ol><li><p>application/x-www-form-urlencoded：浏览器的原生form表单，如果不设置enctype属性，那么最终就会以application/x-www-form-urlencoded方式提交数据。该种方式提交的数据放在body里面，数据按照key1=val1&amp;key2=val2的方式进行编码，key和val都进行了URL转码。</p></li><li><p>multipart/form-data：该种方式也是一个常见的POST提交方式，通常表单上传文件时使用该种方式。</p></li><li><p>application/json：服务器消息主体是序列化后的JSON字符串。</p></li><li><p>text/xml：该种方式主要用来提交XML格式的数据。</p></li></ol><h2 id="xmlhttprequest实现" tabindex="-1"><a class="header-anchor" href="#xmlhttprequest实现"><span>XMLHttpRequest实现</span></a></h2><p>XMLHttpRequest（XHR）是一个浏览器内置的对象，允许JavaScript发起HTTP(S)请求</p><pre><code class="language-js"><span class="token comment">// 创建XMLHttpRequest对象</span>
<span class="token keyword">var</span> xhr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XMLHttpRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 配置请求方法,包括请求方法、URL、是否异步、用于进行HTTP认证的用户名、用于HTTP认证的密码</span>
xhr<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">&#39;GET&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;http://example.com/api&#39;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token string">&#39;username[可选]&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;password[可选]&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// 设置请求头(可选)</span>
xhr<span class="token punctuation">.</span><span class="token function">setRequestHeader</span><span class="token punctuation">(</span><span class="token string">&#39;Content-Type&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;application/json&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// 设置响应类型（可选）</span>
xhr<span class="token punctuation">.</span>responseType <span class="token operator">=</span> <span class="token string">&#39;json&#39;</span><span class="token punctuation">;</span>
<span class="token comment">// 注册事件监听</span>
xhr<span class="token punctuation">.</span><span class="token function-variable function">onreadyStateChange</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>readyState <span class="token operator">===</span> <span class="token number">4</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token number">200</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">)</span>xhr<span class="token punctuation">.</span>responseText
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
       console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&#39;Request failed with status: &#39;</span> <span class="token operator">+</span> xhr<span class="token punctuation">.</span>status<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 这里可以处理请求失败的情况</span>
	<span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 发送请求，使用send方法发送请求。可以传递数据给服务器，如果不需要发送数据则传递null。</span>
 xhr<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 取消请求（可选）</span>
<span class="token comment">// 如果需要取消已经发出的请求，可以使用abort方法。</span>
 
 <span class="token comment">// 超时</span>
 xhr<span class="token punctuation">.</span>timeout <span class="token operator">=</span> <span class="token number">1000</span><span class="token punctuation">;</span>

 <span class="token comment">// 超时触发方法</span>
 xhr<span class="token punctuation">.</span><span class="token function-variable function">ontimeout</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
 <span class="token punctuation">}</span>
 <span class="token comment">// 其他方法</span>
<span class="token keyword">const</span> contentType <span class="token operator">=</span> xhr<span class="token punctuation">.</span><span class="token function">getResponseHeader</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 获取某个响应头</span>
<span class="token keyword">const</span> headers <span class="token operator">=</span> xhr<span class="token punctuation">.</span><span class="token function">getAllResponseHeaders</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 获取所有响应头信息</span>

<span class="token comment">// xhr.readyState</span>
<span class="token comment">// 0-尚未调用open</span>
<span class="token comment">// 1-已调用open</span>
<span class="token comment">// 2-已调用send</span>
<span class="token comment">// 3-已接收请求返回数据</span>
<span class="token comment">// 4-已完成请求</span>
</code></pre><h2 id="手撕ajax" tabindex="-1"><a class="header-anchor" href="#手撕ajax"><span>手撕ajax</span></a></h2><p>实现一个如下ajax功能</p><pre><code class="language-js"><span class="token function">ajax</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">&#39;urltest&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">method</span><span class="token operator">:</span> <span class="token string">&#39;get&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">async</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">timeout</span><span class="token operator">:</span> <span class="token number">3000</span><span class="token punctuation">,</span>
  <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">payload</span><span class="token operator">:</span> <span class="token string">&#39;text&#39;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;success&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token parameter">err</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;fail&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><p>实现</p><pre><code class="language-js"><span class="token keyword">function</span> <span class="token function">ajax</span><span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">const</span> <span class="token punctuation">{</span> url<span class="token punctuation">,</span> method<span class="token punctuation">,</span> async<span class="token punctuation">,</span> timeout<span class="token punctuation">,</span> data <span class="token punctuation">}</span> <span class="token operator">=</span> options
	<span class="token keyword">const</span> xhr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XMLHttpRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
		xhr<span class="token punctuation">.</span><span class="token function-variable function">onreadyStateChange</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>readyState <span class="token operator">===</span> <span class="token number">4</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token keyword">if</span> <span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token number">200</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
					resolve <span class="token operator">&amp;&amp;</span> <span class="token function">resolve</span><span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>responseText<span class="token punctuation">)</span>
				<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
					reject <span class="token operator">&amp;&amp;</span> <span class="token function">reject</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// 超时</span>
		xhr<span class="token punctuation">.</span><span class="token function-variable function">timeout</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> reject <span class="token operator">&amp;&amp;</span> <span class="token function">reject</span><span class="token punctuation">(</span><span class="token string">&#39;超时&#39;</span><span class="token punctuation">)</span>
		xhr<span class="token punctuation">.</span><span class="token function-variable function">onerror</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> reject <span class="token operator">&amp;&amp;</span> <span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>

		<span class="token keyword">let</span> _params <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
		<span class="token keyword">let</span> encodeData

        <span class="token comment">// 参数处理</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>data instanceOf Object<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">for</span> <span class="token punctuation">(</span>lei key <span class="token keyword">in</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
				_params<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token function">encodeURIComponent</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token function">encodeURIComponent</span><span class="token punctuation">(</span>Object<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
			encodeData <span class="token operator">=</span> _params<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&#39;&amp;&#39;</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 方法处理</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>method <span class="token operator">===</span> <span class="token string">&#39;get&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">const</span> index <span class="token operator">=</span> url<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">&#39;?&#39;</span><span class="token punctuation">)</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">===</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				url <span class="token operator">+=</span> <span class="token string">&#39;?&#39;</span>
			<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
				url <span class="token operator">+=</span> <span class="token string">&#39;&amp;&#39;</span>
			<span class="token punctuation">}</span>
			url <span class="token operator">+=</span> encodeData
		<span class="token punctuation">}</span>

        <span class="token comment">// 建立连接</span>
		xhr<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span>method<span class="token punctuation">,</span> url<span class="token punctuation">,</span> async<span class="token punctuation">)</span>

		<span class="token keyword">if</span> <span class="token punctuation">(</span>method <span class="token operator">===</span> <span class="token string">&#39;get&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			xhr<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			xhr<span class="token punctuation">.</span><span class="token function">setRequestHeader</span><span class="token punctuation">(</span><span class="token string">&#39;Content-type&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;application/x-www-form-urlencoded;chartset=UTF-8&#39;</span><span class="token punctuation">)</span>
			xhr<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>encodeData<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><h2 id="https" tabindex="-1"><a class="header-anchor" href="#https"><span>HTTPS</span></a></h2><p>// TODO</p><h2 id="http-vs-rpc" tabindex="-1"><a class="header-anchor" href="#http-vs-rpc"><span>HTTP vs RPC</span></a></h2><p>HTTP协议（Hyper Text Transfer Protocol），又叫做超文本传输协议。是一种用于在Web浏览器和Web服务器之间交换数据的应用层协议。通过HTTP，Web浏览器可以向Web服务器发送请求并获取响应，从而实现Web页面的访问和传输。HTTP使用TCP作为传输层协议，并采用请求-响应模型来进行通信。RPC（Remote Procedure Call），又叫做远程过程调用，它允许客户端在不知道调用细节的情况下，调用存在于远程计算机上的某个对象，就像调用本地应用程序中的对象一样。RPC的调用协议通常包含传输协议和序列化协议。RPC并不是一个具体的协议，而是一种调用方式，它并没有具体实现，只要按照 RPC 通信协议规范实现的框架，都属于RPC，比如 Dubbo、gRPC 等。整体上看，HTTP和RPC的主要区别5点：1、基于的通信协议不同，HTTP只能基于HTTP协议，而RPC可以基于HTTP、TCP和UDP协议。2、调用方式不同，HTTP 接口通过 URL 进行调用，RPC 接口通过函数调用进行调用。3、使用场景上不同，HTTP主要用于 B/S 架构，是万维网数据通信的基础，服务在网页端和服务端的数据传输上 。而 RPC 更多用于 C/S 架构，多用于分布式系统内部集群里，例如云计算、微服务架构、分布式数据库等，它可以在不同的服务之间进行远程调用，从而实现分布式系统的协作。4、传输效率上，RPC使用自定义的TCP协议，请求报文体积更小，可以很好地减少报文体积，提高传输效率。而HTTP请求中会包含很多无用的内容。5、性能上，RPC协议通常使用二进制编码来传输数据，相对于HTTP协议的文本传输，RPC具有更高的性能和效率。RPC协议通常采用高效的序列化和反序列化技术，减少了数据传输的大小和开销，提高了通信的速度和响应时间。</p><h2 id="http-1-0-vs-http-1-1-vs-http-2-0" tabindex="-1"><a class="header-anchor" href="#http-1-0-vs-http-1-1-vs-http-2-0"><span>HTTP/1.0 vs HTTP/1.1 vs HTTP/2.0</span></a></h2><h3 id="http-1-0" tabindex="-1"><a class="header-anchor" href="#http-1-0"><span>HTTP/1.0</span></a></h3><p>特点 无状态协议：每个请求/响应对是独立的，服务器不会保留客户端的状态。 单个请求/响应：每次请求都会打开一个新的 TCP连接，响应完成后立即关闭连接。 缺乏持久连接：每个请求都需要重新建立连接，导致了较高的延迟和开销。 缓存控制：使用Expires头字段进行缓存控制，但缺乏更细粒度的缓存机制。</p><p>缺点 连接开销大：每次请求都需要重新建立连接，增加了延迟和资源消耗。 缺乏并发：无法在同一个连接上并发多个请求，限制了性能。</p><h2 id="http-1-1" tabindex="-1"><a class="header-anchor" href="#http-1-1"><span>HTTP/1.1</span></a></h2><p>特点 持久连接：默认启用持久连接（使用Connection: keep-alive头字段），即一个TCP连接上可以传送多个HTTP请求，减少了连接开销和延迟。 管道化：允许在发送前一个响应之前发送多个请求，从而提高了传输效率（但由于实现复杂，实际使用较少）。 分块传输编码（Chunked Transfer Encoding）：支持服务器在响应头发送之前发送部分响应体，使得服务器可以开始发送响应而不必知道整个响应的大小。 改进的缓存控制：引入了Cache-Control头字段，提供了更细粒度的缓存控制机制。 额外的请求方法：增加了OPTIONS、PUT、DELETE和TRACE等请求方法。 Host头字段：引入Host头字段，允许在同一个IP地址上托管多个域名（虚拟主机）。</p><p>优点 减少连接开销：持久连接和管道化显著减少了连接开销和延迟。 改进的缓存机制：更细粒度的缓存控制提高了性能。 支持虚拟主机：允许在同一个服务器上托管多个域名。</p><h2 id="http-2-0" tabindex="-1"><a class="header-anchor" href="#http-2-0"><span>HTTP/2.0</span></a></h2><p>特点 二进制分帧层：使用二进制分帧层而不是文本协议，将HTTP消息分解为更小的帧，提高了传输效率。 多路复用：允许在一个连接上并发处理多个请求和响应，消除了 HTTP/1.1 中的队头阻塞问题。 首部压缩（Header Compression）：使用HPACK算法压缩头部，减少了传输的数据量。 服务器推送：允许服务器在客户端请求之前主动推送资源，提高了页面加载速度。 优先级和依赖性：允许客户端指定请求的优先级和依赖关系，以优化资源加载顺序。</p><p>优点 提高传输效率：二进制分帧和头部压缩显著提高了传输效率。 并发处理：多路复用消除了队头阻塞问题，提高了并发处理能力。 更快的页面加载：服务器推送和优先级机制显著提高了页面加载速度。</p><h2 id="http-1-0-vs-http-1-1" tabindex="-1"><a class="header-anchor" href="#http-1-0-vs-http-1-1"><span>HTTP/1.0 VS HTTP/1.1</span></a></h2><ol><li>HTTP1.1支持长连接，1个TCP连接允许多个HTTP请求</li><li>缓存方面HTTP1.0支持Expires[强缓存]和Last-modified、If-modified-since[弱缓存],HTTP1.1则支持Cache-control和Etag、If-none-match</li><li>HTTP1.1引入了range头，允许只请求资源的某个部分</li><li>HTTP1.1新增Host字段，用来表示请求服务器的域名<code>m.dianping.com</code></li><li>HTTP1.1新增请求方法，包括：PUT、DELETE、OPTIONS</li></ol><h2 id="http-1-1-vs-http-2-0" tabindex="-1"><a class="header-anchor" href="#http-1-1-vs-http-2-0"><span>HTTP/1.1 VS HTTP/2.0</span></a></h2><ol><li>二进制协议：请求头信息和数据体都用二进制，统称为‘桢’，而非文本形式</li><li>多路复用：仍然复用TCP连接，但是在一个连接里，客户端和服务器都可以同时发送多个请求或回应，而且不用按照顺序一一发送，这样就避免了HTTP1.1&quot;队头堵塞&quot;的问题。</li><li>首部压缩：使用HPACK算法压缩头部，减少了传输的数据量</li><li>服务器推送：允许服务器在客户端请求之前主动推送资源，提高了页面加载速度</li><li>数据流：HTTP/2使用了数据流的概念，因为HTTP/2的数据包是不按顺序发送的，同一个连接里面连续的数据包，可能属于不同的请求。因此，必须要对数据包做标记，指出它属于哪个请求。HTTP/2将每个请求或回应的所有数据包，称为一个数据流。每个数据流都有一个独一无二的编号。数据包发送时，都必须标记数据流ID ，用来区分它属于哪个数据流。</li></ol>`,78),c=[o];function l(i,u){return s(),a("div",null,c)}const k=n(e,[["render",l],["__file","http.html.vue"]]),h=JSON.parse('{"path":"/blogs/technology/network/http.html","title":"HTTP","lang":"en-US","frontmatter":{"title":"HTTP","date":"2024/07/01","tags":["网络"],"categories":["网络"]},"headers":[{"level":2,"title":"TCP/IP网络模型","slug":"tcp-ip网络模型","link":"#tcp-ip网络模型","children":[]},{"level":2,"title":"HTTP请求方法","slug":"http请求方法","link":"#http请求方法","children":[]},{"level":2,"title":"重定向","slug":"重定向","link":"#重定向","children":[{"level":3,"title":"301（永久重定向）","slug":"_301-永久重定向","link":"#_301-永久重定向","children":[]},{"level":3,"title":"302（临时重定向）","slug":"_302-临时重定向","link":"#_302-临时重定向","children":[]},{"level":3,"title":"区别","slug":"区别","link":"#区别","children":[]}]},{"level":2,"title":"GET和POST的请求的区别","slug":"get和post的请求的区别","link":"#get和post的请求的区别","children":[]},{"level":2,"title":"POST和PUT请求的区别","slug":"post和put请求的区别","link":"#post和put请求的区别","children":[]},{"level":2,"title":"常见的HTTP请求头和响应头","slug":"常见的http请求头和响应头","link":"#常见的http请求头和响应头","children":[{"level":3,"title":"常见的请求头","slug":"常见的请求头","link":"#常见的请求头","children":[]},{"level":3,"title":"常见的响应头","slug":"常见的响应头","link":"#常见的响应头","children":[]}]},{"level":2,"title":"XMLHttpRequest实现","slug":"xmlhttprequest实现","link":"#xmlhttprequest实现","children":[]},{"level":2,"title":"手撕ajax","slug":"手撕ajax","link":"#手撕ajax","children":[]},{"level":2,"title":"HTTPS","slug":"https","link":"#https","children":[]},{"level":2,"title":"HTTP vs RPC","slug":"http-vs-rpc","link":"#http-vs-rpc","children":[]},{"level":2,"title":"HTTP/1.0 vs HTTP/1.1 vs HTTP/2.0","slug":"http-1-0-vs-http-1-1-vs-http-2-0","link":"#http-1-0-vs-http-1-1-vs-http-2-0","children":[{"level":3,"title":"HTTP/1.0","slug":"http-1-0","link":"#http-1-0","children":[]}]},{"level":2,"title":"HTTP/1.1","slug":"http-1-1","link":"#http-1-1","children":[]},{"level":2,"title":"HTTP/2.0","slug":"http-2-0","link":"#http-2-0","children":[]},{"level":2,"title":"HTTP/1.0 VS HTTP/1.1","slug":"http-1-0-vs-http-1-1","link":"#http-1-0-vs-http-1-1","children":[]},{"level":2,"title":"HTTP/1.1 VS HTTP/2.0","slug":"http-1-1-vs-http-2-0","link":"#http-1-1-vs-http-2-0","children":[]}],"git":{"createdTime":1719836602000,"updatedTime":1725875699000,"contributors":[{"name":"zhuxiaoying","email":"zhuxiaoying@meituan.com","commits":6}]},"filePathRelative":"blogs/technology/network/http.md"}');export{k as comp,h as data};