import{_ as p,r as e,o,c as r,a as n,b as a,d as t,e as l}from"./app-BcWTENpX.js";const c={},i=l(`<h2 id="eslint" tabindex="-1"><a class="header-anchor" href="#eslint"><span>eslint</span></a></h2><h3 id="使用" tabindex="-1"><a class="header-anchor" href="#使用"><span>使用</span></a></h3><pre><code class="language-shell"><span class="token function">pnpm</span> <span class="token function">add</span> eslint <span class="token parameter variable">-D</span> // 安装
<span class="token function">pnpm</span> create @eslint/config // eslint配置文件的初始化
or
<span class="token function">npm</span> init @eslint/config
</code></pre><pre><code class="language-json"><span class="token comment">// .eslintignore</span>

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
</code></pre><pre><code class="language-js"><span class="token comment">// 配置</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">env</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">browser</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">es2021</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">node</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">&#39;plugin:@typescript-eslint/recommended&#39;</span><span class="token punctuation">,</span>
        <span class="token string">&#39;plugin:vue/vue3-recommended&#39;</span><span class="token punctuation">,</span>
        <span class="token string">&#39;plugin:prettier/recommended&#39;</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">parser</span><span class="token operator">:</span> <span class="token string">&#39;vue-eslint-parser&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">parserOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">ecmaVersion</span><span class="token operator">:</span> <span class="token string">&#39;latest&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">ecmaFeatures</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">jsx</span><span class="token operator">:</span> <span class="token boolean">true</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">parser</span><span class="token operator">:</span> <span class="token string">&#39;@typescript-eslint/parser&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">sourceType</span><span class="token operator">:</span> <span class="token string">&#39;module&#39;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;@typescript-eslint&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">indent</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;error&#39;</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token string-property property">&#39;linebreak-style&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;error&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;unix&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token literal-property property">quotes</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;error&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;single&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token literal-property property">semi</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;error&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;always&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token comment">// vite打包时自动去除console和debugger,所以这里直接关掉检查</span>
        <span class="token string-property property">&#39;no-console&#39;</span><span class="token operator">:</span> <span class="token string">&#39;off&#39;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&#39;no-debugger&#39;</span><span class="token operator">:</span> <span class="token string">&#39;off&#39;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><h2 id="prettier" tabindex="-1"><a class="header-anchor" href="#prettier"><span>Prettier</span></a></h2><p>虽然ESLint本身具备自动格式化代码的功能(eslint --fix)，但术业有专攻，ESLint 的主要优势在于代码的风格检查并给出提示，而在代码格式化这一块 Prettier 做的更加专业，因此我们经常将 ESLint 结合 Prettier 一起使用。</p><h3 id="使用-1" tabindex="-1"><a class="header-anchor" href="#使用-1"><span>使用</span></a></h3><p><code>pnpm add prettier -D</code></p><pre><code class="language-js"><span class="token comment">// .prettierrc.js 详见：https://www.prettier.cn/docs/options.html</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">printWidth</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token comment">//一行的字符数，如果超过会进行换行，默认为80</span>
    <span class="token literal-property property">tabWidth</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token comment">// 一个 tab 代表几个空格数，默认为 2 个</span>
    <span class="token literal-property property">useTabs</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">//是否使用 tab 进行缩进，默认为false，表示用空格进行缩减</span>
    <span class="token literal-property property">singleQuote</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 字符串是否使用单引号，默认为 false，使用双引号</span>
    <span class="token literal-property property">semi</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 行尾是否使用分号，默认为true</span>
    <span class="token literal-property property">trailingComma</span><span class="token operator">:</span> <span class="token string">&quot;none&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 是否使用尾逗号</span>
    <span class="token literal-property property">htmlWhitespaceSensitivity</span><span class="token operator">:</span> <span class="token string">&quot;strict&quot;</span><span class="token punctuation">,</span> <span class="token comment">// HTML空白敏感度</span>
    <span class="token literal-property property">bracketSpacing</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 对象大括号直接是否有空格，默认为 true，效果：{ a: 1 }</span>
    <span class="token literal-property property">proseWrap</span><span class="token operator">:</span> <span class="token string">&quot;never&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 换行设置</span>
<span class="token punctuation">}</span>
</code></pre><h3 id="prettierignore" tabindex="-1"><a class="header-anchor" href="#prettierignore"><span>.prettierignore</span></a></h3><p>也可以不创建，配置.eslingignore即可</p><pre><code class="language-json">/dist<span class="token comment">/*
.local
.output.js
/node_modules/**

**/</span>*.svg
**<span class="token comment">/*.sh

/public/*
</span></code></pre><h3 id="配置" tabindex="-1"><a class="header-anchor" href="#配置"><span>配置</span></a></h3><pre><code class="language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">printWidth</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token comment">//一行的字符数，如果超过会进行换行，默认为80</span>
    <span class="token literal-property property">tabWidth</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token comment">// 一个 tab 代表几个空格数，默认为 2 个</span>
    <span class="token literal-property property">useTabs</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">//是否使用 tab 进行缩进，默认为false，表示用空格进行缩减</span>
    <span class="token literal-property property">singleQuote</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 字符串是否使用单引号，默认为 false，使用双引号</span>
    <span class="token literal-property property">semi</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 行尾是否使用分号，默认为true</span>
    <span class="token literal-property property">trailingComma</span><span class="token operator">:</span> <span class="token string">&#39;none&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 是否使用尾逗号</span>
    <span class="token literal-property property">htmlWhitespaceSensitivity</span><span class="token operator">:</span> <span class="token string">&#39;strict&#39;</span><span class="token punctuation">,</span> <span class="token comment">// HTML空白敏感度</span>
    <span class="token literal-property property">bracketSpacing</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 对象大括号直接是否有空格，默认为 true，效果：{ a: 1 }</span>
    <span class="token literal-property property">proseWrap</span><span class="token operator">:</span> <span class="token string">&#39;never&#39;</span> <span class="token comment">// 换行设置</span>
<span class="token punctuation">}</span>
</code></pre><h3 id="vscode-prettier插件" tabindex="-1"><a class="header-anchor" href="#vscode-prettier插件"><span>Vscode Prettier插件</span></a></h3><p>vscode安装prettier-code formatter插件后，我们看下如果项目中是否安装prettier包和是否配置prettierrc文件，代码最终如何格式化？ 1.无npm包无配置文件，使用捆绑prettier + settings.json 2.有npm包无配置文件，使用捆绑prettier + settings.json 3.有npm包有配置文件，使用npm prettier + 配置文件。 4.无npm包有配置文件，使用捆绑prettier + 配置文件</p><h2 id="husky" tabindex="-1"><a class="header-anchor" href="#husky"><span>Husky</span></a></h2><p>husky是一个为git客户端增加 hook 的工具。安装后，它会自动在仓库中的.git/目录下增加相应的钩子；比如pre-commit钩子就会在你执行git commit的触发。如何使用</p><pre><code class="language-json">package.json配置
<span class="token punctuation">{</span>
  <span class="token property">&quot;husky&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;hooks&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;pre-commit&quot;</span><span class="token operator">:</span> <span class="token string">&quot;lint-staged&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 执行单个命令</span>
      <span class="token property">&quot;pre-commit&quot;</span><span class="token operator">:</span> <span class="token string">&quot;echo wangnima &amp;&amp; echo handsome&quot;</span> <span class="token comment">// 执行多个命令</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><p>或者根目录下配置.huskyrc.js，从 1.0.0 开始，husky的配置可以使用 .huskyrc、.huskyrc.json、.huskyrc.js 或 husky.config.js 文件</p><pre><code class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">tasks</span> <span class="token operator">=</span> <span class="token parameter">arr</span> <span class="token operator">=&gt;</span> arr<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&#39; &amp;&amp; &#39;</span><span class="token punctuation">)</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">hooks</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&#39;pre-commit&#39;</span><span class="token operator">:</span> <span class="token function">arr</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
      <span class="token string">&#39;echo wangnima&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;npm run test&#39;</span>
    <span class="token punctuation">]</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><h2 id="lint-staged" tabindex="-1"><a class="header-anchor" href="#lint-staged"><span>lint-staged</span></a></h2><p>从v3.1开始，您现在可以使用不同的方式进行lint-staged配置：</p><ul><li>package.json配置文件中的lint-staged</li><li>.lintstagedrc JSON或YML格式的文件</li><li>lint-staged.config.js JS格式的文件</li><li>使用 --config 或 -c 标志传递配置文件</li></ul><p>lint-staged是一个在git暂存文件上（也就是被 git add 的文件）运行已配置的linter（或其他）任务。lint-staged总是将所有暂存文件的列表传递给任务。</p><pre><code class="language-json"><span class="token property">&quot;lint-staged&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token property">&quot;src/**/*.{js,vue}&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;prettier --write&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;eslint --cache --fix&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;git add&quot;</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><h2 id="commitlint" tabindex="-1"><a class="header-anchor" href="#commitlint"><span>commitlint</span></a></h2><p><code>@commitlint/config-conventional</code>由type和subject组成</p><ul><li>feat: 添加新功能。</li><li>fix: 修复 Bug。</li><li>chore: 一些不影响功能的更改。</li><li>docs: 专指文档的修改。</li><li>perf: 性能方面的优化。</li><li>refactor: 代码重构。</li><li>test: 添加一些测试代码等等。</li></ul><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>`,31),u={href:"https://juejin.cn/post/7239987776552714300?searchId=202403281603225E8084C31DAD2F0CE4A0",target:"_blank",rel:"noopener noreferrer"},k={href:"https://juejin.cn/post/7293480734492246051?searchId=202403281547271B847421C0F521058DFE",target:"_blank",rel:"noopener noreferrer"},d={href:"https://juejin.cn/post/6847902218713038862",target:"_blank",rel:"noopener noreferrer"};function m(g,h){const s=e("ExternalLinkIcon");return o(),r("div",null,[i,n("p",null,[n("a",u,[a("你不能再说你不会配置ESLint和prettier了"),t(s)]),n("a",k,[a("工程化之代码规范——eslint + prettier + husky梳理实践"),t(s)]),n("a",d,[a("使用husky + lint-staged助力团队编码规范"),t(s)])])])}const f=p(c,[["render",m],["__file","eslint.html.vue"]]),b=JSON.parse('{"path":"/blogs/technology/kuangjia/eslint.html","title":"eslint && prettier","lang":"en-US","frontmatter":{"title":"eslint && prettier","date":"2024/09/04","tags":["框架"],"categories":["框架"]},"headers":[{"level":2,"title":"eslint","slug":"eslint","link":"#eslint","children":[{"level":3,"title":"使用","slug":"使用","link":"#使用","children":[]}]},{"level":2,"title":"Prettier","slug":"prettier","link":"#prettier","children":[{"level":3,"title":"使用","slug":"使用-1","link":"#使用-1","children":[]},{"level":3,"title":".prettierignore","slug":"prettierignore","link":"#prettierignore","children":[]},{"level":3,"title":"配置","slug":"配置","link":"#配置","children":[]},{"level":3,"title":"Vscode Prettier插件","slug":"vscode-prettier插件","link":"#vscode-prettier插件","children":[]}]},{"level":2,"title":"Husky","slug":"husky","link":"#husky","children":[]},{"level":2,"title":"lint-staged","slug":"lint-staged","link":"#lint-staged","children":[]},{"level":2,"title":"commitlint","slug":"commitlint","link":"#commitlint","children":[]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"git":{"createdTime":1725440342000,"updatedTime":1725440342000,"contributors":[{"name":"zhuxiaoying","email":"zhuxiaoying@meituan.com","commits":1}]},"filePathRelative":"blogs/technology/框架/eslint.md"}');export{f as comp,b as data};
