import{_ as n,o as s,c as a,e as p}from"./app-COjMlnxi.js";const t="/myblog/assets/extend1-BY26Tpqw.png",o={},e=p('<h2 id="原型链模式" tabindex="-1"><a class="header-anchor" href="#原型链模式"><span>原型链模式</span></a></h2><p>简单回顾下构造函数、原型和实例的关系：每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型对象的内部指针。那如果让原型对象等于另一个类型的实例。 <img src="'+t+`" alt="原型链" title="原型链"></p><p>思路：原型对象上的所有属性和方法都可以被实例共享</p><pre><code class="language-js"><span class="token keyword">function</span> <span class="token function">SuperType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>property <span class="token operator">=</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
<span class="token class-name">SuperType</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">getSuperValue</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>property
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">SubType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>subproperty <span class="token operator">=</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>
<span class="token comment">//继承了 SuperType</span>
<span class="token class-name">SubType</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SuperType</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token class-name">SubType</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">getSubValue</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>subproperty
<span class="token punctuation">}</span>

<span class="token keyword">var</span> instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SubType</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">alert</span><span class="token punctuation">(</span>instance<span class="token punctuation">.</span><span class="token function">getSuperValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">//true</span>
</code></pre><p>本质：重写了原型对象方式，将父对象的属性方法作为自对象原型对象的属性方法，同时重写构造函数 优点：所有对象实例可共享原型对象所包含的属性和方法 缺点： 1.包含引用类型值的原型属性会被所有实例共享 2.在创建子类型的实例时，不能向超类型的构造函数中传递参数</p><p>*<strong>注意：通过原型链实现继承时，不能使用对象字面量创建原型方法。因为这样会重写原型链</strong></p><pre><code class="language-js"><span class="token keyword">function</span> <span class="token function">SuperType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>property <span class="token operator">=</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
<span class="token class-name">SuperType</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">getSuperValue</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>property
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">SubType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>subproperty <span class="token operator">=</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>
<span class="token comment">//继承了 SuperType</span>
<span class="token class-name">SubType</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SuperType</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token class-name">SubType</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>constructor <span class="token operator">=</span> SubType

<span class="token comment">// 使用字面量添加新方法，会导致上一行代码无效！！</span>
<span class="token class-name">SubType</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">getSubValue</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>subproperty
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">someOtherMethod</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SubType</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">alert</span><span class="token punctuation">(</span>instance<span class="token punctuation">.</span><span class="token function">getSuperValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// error</span>
</code></pre><h2 id="构造函数" tabindex="-1"><a class="header-anchor" href="#构造函数"><span>构造函数</span></a></h2><p>思路：在子类的构造函数内部调用父类的构造函数</p><pre><code class="language-js"><span class="token keyword">function</span> <span class="token function">SuperType</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
<span class="token punctuation">}</span>
<span class="token class-name">SuperType</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">getSuperValue</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>property
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">SubType</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//继承了 SuperType，同时还传递了参数 </span>
    <span class="token function">SuperType</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span>
    <span class="token comment">//实例属性</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">29</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SubType</span><span class="token punctuation">(</span><span class="token string">&quot;Nicholas&quot;</span><span class="token punctuation">)</span>
<span class="token function">alert</span><span class="token punctuation">(</span>instance<span class="token punctuation">.</span>name<span class="token punctuation">)</span>    <span class="token comment">//&quot;Nicholas&quot;</span>
<span class="token function">alert</span><span class="token punctuation">(</span>instance<span class="token punctuation">.</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">//29</span>
</code></pre><p>缺点：原型链上的共享方法无法读取继承</p><h2 id="组合继承" tabindex="-1"><a class="header-anchor" href="#组合继承"><span>组合继承</span></a></h2><p>实现思路：构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性。结果，每个实例都会有自己的一份实例属性的副本，但同时又共享着对方法的引用，最大程度的节省了内存。另外，这种混合模式还支持向构造函数传递参数。</p><pre><code class="language-js"><span class="token keyword">function</span> <span class="token function">SuperType</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
    <span class="token keyword">this</span><span class="token punctuation">.</span>colors <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;red&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;blue&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;green&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token class-name">SuperType</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">sayName</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">SubType</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//继承属性 </span>
    <span class="token function">SuperType</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span> <span class="token comment">// 第二次调用SuperType()</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age
<span class="token punctuation">}</span>
<span class="token comment">//继承方法</span>
<span class="token class-name">SubType</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SuperType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 第一次调用SuperType()</span>
<span class="token class-name">SubType</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>constructor <span class="token operator">=</span> SubType
<span class="token class-name">SubType</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">sayAge</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>age<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> instance1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SubType</span><span class="token punctuation">(</span><span class="token string">&quot;Nicholas&quot;</span><span class="token punctuation">,</span> <span class="token number">29</span><span class="token punctuation">)</span>
instance1<span class="token punctuation">.</span>colors<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">&quot;black&quot;</span><span class="token punctuation">)</span>
<span class="token function">alert</span><span class="token punctuation">(</span>instance1<span class="token punctuation">.</span>colors<span class="token punctuation">)</span> <span class="token comment">// &quot;red,blue,green,black&quot;</span>
instance1<span class="token punctuation">.</span><span class="token function">sayName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// &quot;Nicholas&quot;</span>
instance1<span class="token punctuation">.</span><span class="token function">sayAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 29</span>

<span class="token keyword">var</span> instance2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SubType</span><span class="token punctuation">(</span><span class="token string">&quot;Greg&quot;</span><span class="token punctuation">,</span> <span class="token number">27</span><span class="token punctuation">)</span>
<span class="token function">alert</span><span class="token punctuation">(</span>instance2<span class="token punctuation">.</span>colors<span class="token punctuation">)</span> <span class="token comment">// &quot;red,blue,green&quot;</span>
instance2<span class="token punctuation">.</span><span class="token function">sayName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// &quot;Greg&quot;</span>
instance2<span class="token punctuation">.</span><span class="token function">sayAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 27</span>
</code></pre><p>缺点：无论什么情况下，父类构造函数会调用2次，一次是在创建子类原型的时候（SubType.prototype = new SuperType()），另一次是在子类型构造函数内部（SuperType.call(this, name)）</p><h2 id="寄生组合继承" tabindex="-1"><a class="header-anchor" href="#寄生组合继承"><span>寄生组合继承</span></a></h2><pre><code class="language-js"><span class="token keyword">function</span> <span class="token function">SuperType</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
    <span class="token keyword">this</span><span class="token punctuation">.</span>colors <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;red&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;blue&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;green&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token class-name">SuperType</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">sayName</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">SubType</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//继承属性 </span>
    <span class="token function">SuperType</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age
<span class="token punctuation">}</span>
<span class="token comment">//继承方法</span>
<span class="token class-name">SubType</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">SuperType</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span>
<span class="token class-name">SubType</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>constructor <span class="token operator">=</span> SubType
<span class="token class-name">SubType</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">sayAge</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>age<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><h2 id="如何实现多重继承" tabindex="-1"><a class="header-anchor" href="#如何实现多重继承"><span>如何实现多重继承</span></a></h2><pre><code class="language-js"><span class="token keyword">function</span> <span class="token function">SuperType</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
    <span class="token keyword">this</span><span class="token punctuation">.</span>colors <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;red&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;blue&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;green&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token class-name">SuperType</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">sayName</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">SuperKind</span><span class="token punctuation">(</span><span class="token parameter">kind</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>kind <span class="token operator">=</span> kind
<span class="token punctuation">}</span>
<span class="token class-name">SuperKind</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">sayKind</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>kind<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">SubType</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> kind</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//继承属性 </span>
    <span class="token function">SuperType</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span>
    <span class="token function">SuperKind</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> kind<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">//继承方法</span>
<span class="token class-name">SubType</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">SuperType</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span>
Object<span class="token punctuation">.</span><span class="token function">assing</span><span class="token punctuation">(</span><span class="token class-name">SubType</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> <span class="token class-name">SuperKind</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span>
<span class="token class-name">SubType</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>constructor <span class="token operator">=</span> SubType
</code></pre>`,19),c=[e];function u(l,k){return s(),a("div",null,c)}const r=n(o,[["render",u],["__file","jicheng.html.vue"]]),y=JSON.parse('{"path":"/blogs/technology/JS/jicheng.html","title":"继承","lang":"en-US","frontmatter":{"title":"继承","date":"2024/07/17","tags":["javascript"],"categories":["javascript"]},"headers":[{"level":2,"title":"原型链模式","slug":"原型链模式","link":"#原型链模式","children":[]},{"level":2,"title":"构造函数","slug":"构造函数","link":"#构造函数","children":[]},{"level":2,"title":"组合继承","slug":"组合继承","link":"#组合继承","children":[]},{"level":2,"title":"寄生组合继承","slug":"寄生组合继承","link":"#寄生组合继承","children":[]},{"level":2,"title":"如何实现多重继承","slug":"如何实现多重继承","link":"#如何实现多重继承","children":[]}],"git":{"createdTime":1721230981000,"updatedTime":1725607239000,"contributors":[{"name":"zhuxiaoying","email":"zhuxiaoying@meituan.com","commits":3}]},"filePathRelative":"blogs/technology/JS/继承.md"}');export{r as comp,y as data};
