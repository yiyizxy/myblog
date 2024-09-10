import{_ as a,r as t,o,c as p,a as s,b as e,d as r,e as c}from"./app-BcWTENpX.js";const l={},k=c(`<h2 id="react-router是什么" tabindex="-1"><a class="header-anchor" href="#react-router是什么"><span>React-Router是什么？</span></a></h2><p>可以实现无刷新页面的情况下显示不同的页面 react-router: 实现了路由的核心功能,提供一些核心api,如Router、Route，不提供和Dom相关的api react-router-dom: 基于react-router，提供浏览器运行环境所需的特定组件,<code>&lt;BrowserRouter&gt;</code>、<code>&lt;HashRouter&gt;</code>、<code>&lt;Route&gt;</code>、<code>&lt;Routes&gt;</code>这些 react-router-native: 基于react-router，加入了react-native运行环境下的一些功能 react-router-config: 用于配置静态路由的工具库</p><h2 id="history和hash路由区别" tabindex="-1"><a class="header-anchor" href="#history和hash路由区别"><span>history和hash路由区别？</span></a></h2><p>hash路由url上会携带#不美观,不支持SSR history路由需要后端配合改（ningix）,支持SSR</p><h2 id="v6和v5的区别" tabindex="-1"><a class="header-anchor" href="#v6和v5的区别"><span>V6和V5的区别</span></a></h2><p>1.<code>&lt;Route&gt;</code>路径的变化</p><ul><li>占位符 * 和 :id可以用，正则不能用了</li><li>v6中的所有路径匹配都将忽略URL上的尾部&quot;/&quot;</li></ul><pre><code class="language-bash">// v6
/user/*
/detail/:id
</code></pre><p>2.<code>&lt;Switch&gt;</code>重命名为<code>&lt;Routes&gt;</code></p><pre><code class="language-js"><span class="token comment">// 原</span>
<span class="token operator">&lt;</span>Switch<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>Route path<span class="token operator">=</span><span class="token string">&quot;/index1&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span>Index1<span class="token operator">/</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>Route<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>Route path<span class="token operator">=</span><span class="token string">&quot;/index2&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span>Index1<span class="token operator">/</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>Route<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>Switch<span class="token operator">&gt;</span>

<span class="token comment">// v6</span>
<span class="token operator">&lt;</span>Routes<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>Route path<span class="token operator">=</span><span class="token string">&quot;/index1&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span>Index1<span class="token operator">/</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>Route<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>Route path<span class="token operator">=</span><span class="token string">&quot;/index2&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span>Index1<span class="token operator">/</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>Route<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>Routes<span class="token operator">&gt;</span>
</code></pre><p>3.<code>&lt;Route&gt;</code>的component变成了element</p><pre><code class="language-js"><span class="token comment">// 原</span>
<span class="token operator">&lt;</span>Route path<span class="token operator">=</span><span class="token string">&quot;/index1&quot;</span> component<span class="token operator">=</span><span class="token punctuation">{</span>Index1<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">&gt;</span>

<span class="token comment">// v6</span>
<span class="token operator">&lt;</span>Route path<span class="token operator">=</span><span class="token string">&quot;/index1&quot;</span> element<span class="token operator">=</span><span class="token punctuation">{</span><span class="token operator">&lt;</span>Index1 <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">&gt;</span>
</code></pre><p>4.<code>&lt;Outlet&gt;</code>渲染子路由</p><pre><code class="language-js"><span class="token operator">&lt;</span>BrowserRouter<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>Routes<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>Route path<span class="token operator">=</span><span class="token string">&quot;/&quot;</span> element<span class="token operator">=</span><span class="token punctuation">{</span><span class="token operator">&lt;</span>Home <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>Route path<span class="token operator">=</span><span class="token string">&quot;/content&quot;</span> element<span class="token operator">=</span><span class="token punctuation">{</span><span class="token operator">&lt;</span>Content <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">}</span><span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>Route path<span class="token operator">=</span><span class="token string">&quot;index1&quot;</span> element<span class="token operator">=</span><span class="token punctuation">{</span><span class="token operator">&lt;</span>Index1 <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>Route path<span class="token operator">=</span><span class="token string">&quot;index2&quot;</span> element<span class="token operator">=</span><span class="token punctuation">{</span><span class="token operator">&lt;</span>Index2 <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>Route<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>Routes<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>BrowserRouter<span class="token operator">&gt;</span>

<span class="token comment">// Content</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Outlet <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;react-router-dom&#39;</span>

<span class="token keyword">function</span> <span class="token function">Content</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>title<span class="token operator">&gt;</span>这是Content<span class="token operator">&lt;</span><span class="token operator">/</span>title<span class="token operator">&gt;</span>
      
      <span class="token punctuation">{</span><span class="token comment">/* 这里渲染子路由！！ */</span><span class="token punctuation">}</span>
      <span class="token operator">&lt;</span>Outlet <span class="token operator">/</span><span class="token operator">&gt;</span>
      <span class="token punctuation">{</span><span class="token comment">/* 这里渲染子路由！！ end */</span><span class="token punctuation">}</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><p>5.取消useHistory，用useNavigate作为替代</p><pre><code class="language-js"><span class="token comment">// 原</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useHistory <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;react-router-dom&#39;</span><span class="token punctuation">;</span>
<span class="token operator">...</span>
<span class="token keyword">const</span> history <span class="token operator">=</span> <span class="token function">useHistory</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
history<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">&#39;/index1&#39;</span><span class="token punctuation">)</span>
history<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token string">&#39;/index2&#39;</span><span class="token punctuation">)</span>
<span class="token operator">...</span>

<span class="token comment">// v6</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useNavigate <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;react-router-dom&#39;</span><span class="token punctuation">;</span>
<span class="token operator">...</span>
<span class="token keyword">const</span> navigate <span class="token operator">=</span> <span class="token function">useNavigate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">navigate</span><span class="token punctuation">(</span><span class="token string">&#39;/index1&#39;</span><span class="token punctuation">)</span>
<span class="token function">navigate</span><span class="token punctuation">(</span><span class="token string">&#39;/index2&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">replace</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token operator">...</span>
</code></pre><p>6.重定向<code>&lt;Redirect/&gt;</code>删除，新增<code>&lt;Navigate/&gt;</code></p><pre><code class="language-js"><span class="token comment">// defore</span>
<span class="token operator">&lt;</span>Redirect to<span class="token operator">=</span><span class="token string">&#39;index1&#39;</span> <span class="token operator">/</span><span class="token operator">&gt;</span>
<span class="token comment">// after</span>
<span class="token operator">&lt;</span>Navigate to<span class="token operator">=</span><span class="token string">&#39;index1&#39;</span> <span class="token operator">/</span><span class="token operator">&gt;</span>
</code></pre><p>7.新增useRoutes，可以替代react-router-config，通过useRoutes渲染路由，传入我们已经集中配置好的routes</p><pre><code class="language-js"><span class="token keyword">const</span> routes <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">element</span><span class="token operator">:</span> <span class="token operator">&lt;</span>SecurityLayout <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span> <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">element</span><span class="token operator">:</span> <span class="token operator">&lt;</span>Navigate to<span class="token operator">=</span><span class="token string">&quot;/user/login&quot;</span> <span class="token operator">/</span><span class="token operator">&gt;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Redirect 重定向！</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">element</span><span class="token operator">:</span> <span class="token operator">&lt;</span>BasicLayout <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token comment">// BasicLayout 业务页面</span>
                <span class="token punctuation">{</span>
                    <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;index1&#39;</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">element</span><span class="token operator">:</span> <span class="token operator">&lt;</span>Index1<span class="token operator">/</span><span class="token operator">&gt;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">{</span>
                    <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;index2&#39;</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">element</span><span class="token operator">:</span> <span class="token operator">&lt;</span>Index2<span class="token operator">/</span><span class="token operator">&gt;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">RenderRoutes</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> element <span class="token operator">=</span> <span class="token function">useRoutes</span><span class="token punctuation">(</span>routes<span class="token punctuation">)</span>
    <span class="token keyword">return</span> element<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>`,21),u={href:"https://juejin.cn/post/7052933770260938783",target:"_blank",rel:"noopener noreferrer"};function i(d,g){const n=t("ExternalLinkIcon");return o(),p("div",null,[k,s("p",null,[s("a",u,[e("react-router v6"),r(n)])])])}const m=a(l,[["render",i],["__file","react-router.html.vue"]]),y=JSON.parse('{"path":"/blogs/technology/kuangjia/react-router.html","title":"React-Router","lang":"en-US","frontmatter":{"title":"React-Router","date":"2024/07/29","tags":["框架"],"categories":["框架"]},"headers":[{"level":2,"title":"React-Router是什么？","slug":"react-router是什么","link":"#react-router是什么","children":[]},{"level":2,"title":"history和hash路由区别？","slug":"history和hash路由区别","link":"#history和hash路由区别","children":[]},{"level":2,"title":"V6和V5的区别","slug":"v6和v5的区别","link":"#v6和v5的区别","children":[]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"git":{"createdTime":1722346234000,"updatedTime":1725353590000,"contributors":[{"name":"zhuxiaoying","email":"zhuxiaoying@meituan.com","commits":3}]},"filePathRelative":"blogs/technology/框架/react-router.md"}');export{m as comp,y as data};
