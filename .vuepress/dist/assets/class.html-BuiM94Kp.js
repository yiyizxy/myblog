import{_ as n,o as s,c as a,e as t}from"./app-COjMlnxi.js";const p="/myblog/assets/new-BgIRENHm.png",o={},e=t(`<p>寄生组合继承</p><p>通过构造函数继承属性</p><p>通过原型链继承方法</p><pre><code class="language-js"><span class="token keyword">class</span> <span class="token class-name">Dog</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">name</span><span class="token operator">:</span> string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
    <span class="token punctuation">}</span> <span class="token comment">// 构造函数可以protected，这种情况下只能实例化，无法继承</span>
    <span class="token comment">// 构造函数可以private，那类既不能实例化也不能被继承</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> string <span class="token comment">// 在ts中，属性必须赋初始直，即constructor中的this.name = name ｜ name?:string | name: string = &#39;wangwang&#39;</span>
    <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token keyword">private</span> <span class="token function">pri</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// 私有成员private只能类自己调用，类的实例、子类无法调用</span>
    <span class="token keyword">protected</span> <span class="token function">pro</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// 保护成员只能在子类中调用</span>
    readonly legs<span class="token operator">:</span> number <span class="token operator">=</span> <span class="token number">4</span> <span class="token comment">// 只读</span>
    <span class="token keyword">static</span> <span class="token literal-property property">food</span><span class="token operator">:</span> string <span class="token operator">=</span> <span class="token string">&#39;fish&#39;</span> <span class="token comment">// 静态成员只能通过类名(包括子类)访问，实例无法访问</span>
<span class="token punctuation">}</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">Dog</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span> <span class="token comment">// 类成员的属性都是实例属性，非原型属性，类成员的方法都是原型方法,只能打印出constructor和run方法</span>
<span class="token keyword">let</span> dog <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Dog</span><span class="token punctuation">(</span><span class="token string">&#39;wangwang&#39;</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>dog<span class="token punctuation">)</span> <span class="token comment">// 只能打印出name</span>
<span class="token comment">// console.log(dog.pri()) // error,类的私有成员只能类自己调用</span>
<span class="token comment">// console.log(dog.pro()) // error,类的保护成员只能子类调用</span>
<span class="token comment">// console.log(dog.food) // error,类的静态成员只能类本身及子类调用，Dog.food、Husky.food</span>

<span class="token keyword">class</span> <span class="token class-name">Husky</span> <span class="token keyword">extends</span> <span class="token class-name">Dog</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">name</span><span class="token operator">:</span> string<span class="token punctuation">,</span> <span class="token literal-property property">color</span><span class="token operator">:</span> string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span> <span class="token comment">// 必须super,作用是调用父类的构造函数constructor,子类必须要有父类的name属性</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>color <span class="token operator">=</span> color
        <span class="token comment">// this.pri() // error,类的私有成员只能类自己调用</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">pro</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token literal-property property">color</span><span class="token operator">:</span> string
<span class="token punctuation">}</span>

<span class="token comment">// 类的所有成员属性默认都是public,</span>
</code></pre><h2 id="new发生了什么" tabindex="-1"><a class="header-anchor" href="#new发生了什么"><span>new发生了什么？</span></a></h2><ol><li>创建一个新对象</li><li>将构造函数的作用域赋值给新对象（因此this就指向了新对象）</li><li>执行构造函数中的代码（为这个新对象添加属性）</li><li>返回新对象，则返回该对象，否则，返回建的空对象作为thi新创建的对象</li></ol><p><img src="`+p+'" alt="new" title="new"></p>',7),c=[e];function l(r,i){return s(),a("div",null,c)}const u=n(o,[["render",l],["__file","class.html.vue"]]),m=JSON.parse('{"path":"/blogs/technology/JS/class.html","title":"Class","lang":"en-US","frontmatter":{"title":"Class","date":"2024/07/01","tags":["javascript"],"categories":["javascript"]},"headers":[{"level":2,"title":"new发生了什么？","slug":"new发生了什么","link":"#new发生了什么","children":[]}],"git":{"createdTime":1719836602000,"updatedTime":1725607239000,"contributors":[{"name":"zhuxiaoying","email":"zhuxiaoying@meituan.com","commits":5}]},"filePathRelative":"blogs/technology/JS/class.md"}');export{u as comp,m as data};
