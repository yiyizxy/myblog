import{_ as t,r as o,o as e,c,a as n,b as a,d as p,e as l}from"./app-COjMlnxi.js";const u={},k=l(`<h2 id="单例模式" tabindex="-1"><a class="header-anchor" href="#单例模式"><span>单例模式</span></a></h2><h3 id="定义" tabindex="-1"><a class="header-anchor" href="#定义"><span>定义</span></a></h3><p>保证一个类仅有一个实例，并提供一个访问它的全局访问点。</p><h3 id="实现" tabindex="-1"><a class="header-anchor" href="#实现"><span>实现</span></a></h3><p>先判断实例存在与否，如果存在则直接返回，如果不存在就创建了再返回。</p><h3 id="适用场景" tabindex="-1"><a class="header-anchor" href="#适用场景"><span>适用场景</span></a></h3><p>一个单一对象。比如：弹窗，无论点击多少次，弹窗只应该被创建一次</p><h3 id="例子" tabindex="-1"><a class="header-anchor" href="#例子"><span>例子</span></a></h3><pre><code class="language-js"><span class="token keyword">class</span> <span class="token class-name">CreateUser</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 代理实现单例模式</span>
<span class="token keyword">var</span> ProxyMode <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> instance <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>instance<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CreateUser</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 测试单例模式的实例</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ProxyMode</span><span class="token punctuation">(</span><span class="token string">&quot;aaa&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ProxyMode</span><span class="token punctuation">(</span><span class="token string">&quot;bbb&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 因为单例模式是只实例化一次，所以下面的实例是相等的</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a <span class="token operator">===</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">//true</span>
</code></pre><h2 id="策略模式" tabindex="-1"><a class="header-anchor" href="#策略模式"><span>策略模式</span></a></h2><h3 id="定义-1" tabindex="-1"><a class="header-anchor" href="#定义-1"><span>定义</span></a></h3><p>定义一系列的算法，把他们一个个封装起来，并且使他们可以相互替换。</p><h3 id="实现-1" tabindex="-1"><a class="header-anchor" href="#实现-1"><span>实现</span></a></h3><p>一个基于策略模式的程序至少由两部分组成。第一部分是一组策略类（可变），策略类封装了具体的算法，并负责具体的计算过程。第二个部分是环境类Context（不变），Context接受客户的请求，随后将请求委托给某一个策略类。要做到这一点，说明Context中要维持对某个策略对象的引用。</p><h3 id="例子-1" tabindex="-1"><a class="header-anchor" href="#例子-1"><span>例子</span></a></h3><pre><code class="language-js"><span class="token keyword">var</span> <span class="token function-variable function">calculateBonus</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">performanceLevel<span class="token punctuation">,</span> salary</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>performanceLevel <span class="token operator">===</span> <span class="token string">&quot;S&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> salary <span class="token operator">*</span> <span class="token number">4</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>performanceLevel <span class="token operator">===</span> <span class="token string">&quot;A&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> salary <span class="token operator">*</span> <span class="token number">3</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>performanceLevel <span class="token operator">===</span> <span class="token string">&quot;B&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> salary <span class="token operator">*</span> <span class="token number">2</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token function">calculateBonus</span><span class="token punctuation">(</span><span class="token string">&quot;B&quot;</span><span class="token punctuation">,</span> <span class="token number">20000</span><span class="token punctuation">)</span> <span class="token comment">// 输出：40000</span>
<span class="token function">calculateBonus</span><span class="token punctuation">(</span><span class="token string">&quot;S&quot;</span><span class="token punctuation">,</span> <span class="token number">6000</span><span class="token punctuation">)</span> <span class="token comment">// 输出：24000</span>

<span class="token comment">// 策略类</span>
<span class="token keyword">var</span> strategies <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">S</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">salary</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> salary <span class="token operator">*</span> <span class="token number">4</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">A</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">salary</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> salary <span class="token operator">*</span> <span class="token number">3</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">B</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">salary</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> salary <span class="token operator">*</span> <span class="token number">2</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">//环境类</span>
<span class="token keyword">var</span> <span class="token function-variable function">calculateBonus</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">level<span class="token punctuation">,</span> salary</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> strategies<span class="token punctuation">[</span>level<span class="token punctuation">]</span><span class="token punctuation">(</span>salary<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 使用</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">calculateBonus</span><span class="token punctuation">(</span><span class="token string">&quot;S&quot;</span><span class="token punctuation">,</span> <span class="token number">20000</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 输出：80000</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">calculateBonus</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">,</span> <span class="token number">10000</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 输出：30000</span>
</code></pre><h2 id="发布订阅模式" tabindex="-1"><a class="header-anchor" href="#发布订阅模式"><span>发布订阅模式</span></a></h2><pre><code class="language-js"><span class="token keyword">class</span> <span class="token class-name">EventCenter</span><span class="token punctuation">{</span>
    <span class="token comment">// 1. 定义事件容器，用来装事件数组</span>
    <span class="token keyword">let</span> handlers <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  
    <span class="token comment">// 2. 添加事件方法，参数：事件名 事件方法</span>
    <span class="token function">on</span><span class="token punctuation">(</span><span class="token parameter">type<span class="token punctuation">,</span> handler</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 创建新数组容器</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">[</span>type<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">[</span>type<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// 存入事件</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">[</span>type<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>handler<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  
    <span class="token comment">// 3. 触发事件，参数：事件名 事件参数</span>
    <span class="token function">emit</span><span class="token punctuation">(</span><span class="token parameter">type<span class="token punctuation">,</span> params</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 若没有注册该事件则抛出错误</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">[</span>type<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;该事件未注册&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// 触发事件</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">[</span>type<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">handler</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token function">handler</span><span class="token punctuation">(</span><span class="token operator">...</span>params<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  
    <span class="token comment">// 4. 事件移除，参数：事件名 要删除事件，若无第二个参数则删除该事件的订阅和发布</span>
    <span class="token function">off</span><span class="token punctuation">(</span><span class="token parameter">type<span class="token punctuation">,</span> handler</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">[</span>type<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;事件无效&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>handler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 移除事件</span>
        <span class="token keyword">delete</span> <span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">[</span>type<span class="token punctuation">]</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> index <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">[</span>type<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">findIndex</span><span class="token punctuation">(</span><span class="token parameter">el</span> <span class="token operator">=&gt;</span> el <span class="token operator">===</span> handler<span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">===</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;无该绑定事件&#39;</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 移除事件</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">[</span>type<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>index<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">[</span>type<span class="token punctuation">]</span><span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">delete</span> <span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">[</span>type<span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><h2 id="代理模式" tabindex="-1"><a class="header-anchor" href="#代理模式"><span>代理模式</span></a></h2><h3 id="定义-2" tabindex="-1"><a class="header-anchor" href="#定义-2"><span>定义</span></a></h3><p>为一个目标对象提供一个代理对象，以便控制对它的访问。</p><h3 id="适用场景-1" tabindex="-1"><a class="header-anchor" href="#适用场景-1"><span>适用场景</span></a></h3><p>在Web开发中，图片预加载是一种常用的技术，如果直接给某个img标签节点设置src属性，由于图片过大或者网络不佳，图片的位置往往有段时间会是一片空白。常见的做法是先用一张loading图片占位，然后用异步的方式加载图片，等图片加载好了再把它填充到img节点里，这种场景就很适合使用虚拟代理。</p><h3 id="实现-2" tabindex="-1"><a class="header-anchor" href="#实现-2"><span>实现</span></a></h3><pre><code class="language-js"><span class="token keyword">var</span> myImage <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> imgNode <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&quot;img&quot;</span><span class="token punctuation">)</span>
    document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>imgNode<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token function-variable function">setSrc</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">src</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            imgNode<span class="token punctuation">.</span>src <span class="token operator">=</span> src
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">var</span> proxyImage <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> img <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Image</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    img<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        myImage<span class="token punctuation">.</span><span class="token function">setSrc</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>src<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token function-variable function">setSrc</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">src</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            myImage<span class="token punctuation">.</span><span class="token function">setSrc</span><span class="token punctuation">(</span><span class="token string">&quot;file://C:/Users/svenzeng/Desktop/loading.gif&quot;</span><span class="token punctuation">)</span> <span class="token comment">// 占位图</span>
            img<span class="token punctuation">.</span>src <span class="token operator">=</span> src
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

proxyImage<span class="token punctuation">.</span><span class="token function">setSrc</span><span class="token punctuation">(</span><span class="token string">&quot;http://imgcache.qq.com/music/photo/k/000GGDys0yA0Nk.jpg&quot;</span><span class="token punctuation">)</span>
</code></pre>`,25),i={href:"https://juejin.cn/post/7272191578826686516?searchId=2024071716564094D6BBA5E3F9A7259E15",target:"_blank",rel:"noopener noreferrer"},r={href:"https://juejin.cn/post/7215967453929586748?searchId=2024071916370449C569B0C647F5507152#heading-2",target:"_blank",rel:"noopener noreferrer"};function d(h,m){const s=o("ExternalLinkIcon");return e(),c("div",null,[k,n("p",null,[n("a",i,[a("设计模式"),p(s)]),n("a",r,[a("设计模式"),p(s)])])])}const f=t(u,[["render",d],["__file","shejimoshi.html.vue"]]),w=JSON.parse('{"path":"/blogs/technology/JS/shejimoshi.html","title":"设计模式","lang":"en-US","frontmatter":{"title":"设计模式","date":"2024/08/01","tags":["javascript"],"categories":["javascript"]},"headers":[{"level":2,"title":"单例模式","slug":"单例模式","link":"#单例模式","children":[{"level":3,"title":"定义","slug":"定义","link":"#定义","children":[]},{"level":3,"title":"实现","slug":"实现","link":"#实现","children":[]},{"level":3,"title":"适用场景","slug":"适用场景","link":"#适用场景","children":[]},{"level":3,"title":"例子","slug":"例子","link":"#例子","children":[]}]},{"level":2,"title":"策略模式","slug":"策略模式","link":"#策略模式","children":[{"level":3,"title":"定义","slug":"定义-1","link":"#定义-1","children":[]},{"level":3,"title":"实现","slug":"实现-1","link":"#实现-1","children":[]},{"level":3,"title":"例子","slug":"例子-1","link":"#例子-1","children":[]}]},{"level":2,"title":"发布订阅模式","slug":"发布订阅模式","link":"#发布订阅模式","children":[]},{"level":2,"title":"代理模式","slug":"代理模式","link":"#代理模式","children":[{"level":3,"title":"定义","slug":"定义-2","link":"#定义-2","children":[]},{"level":3,"title":"适用场景","slug":"适用场景-1","link":"#适用场景-1","children":[]},{"level":3,"title":"实现","slug":"实现-2","link":"#实现-2","children":[]}]}],"git":{"createdTime":1719836602000,"updatedTime":1725607239000,"contributors":[{"name":"zhuxiaoying","email":"zhuxiaoying@meituan.com","commits":6}]},"filePathRelative":"blogs/technology/JS/设计模式.md"}');export{f as comp,w as data};
