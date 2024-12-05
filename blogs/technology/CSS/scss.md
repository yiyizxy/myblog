
## SCSS介绍
SCSS是CSS的一种预编译语言，我们可以在SCSS中声明变量以及使用嵌套语法等，可以直观地看到选择器的嵌套关系，这一点是CSS中无法满足的。SCSS为开发人员书写样式提供了便利，但是浏览器只认识CSS文件，因此需要将SCSS文件编译为CSS文件才能正常被浏览器解析到。

## 基础

### 变量
变量可以使用`$`声明，SCSS文件中声明的变量也存在作用域。在最外层声明的变量为全局变量，可以在任何位置访问到。选择器中定义的属于局部变量，只可在选择器的作用域中访问到。可以使用!global将局部变量提升为全局变量。

注意:SCSS中变量名使用中划线或下划线都是指向同一变量的，也就是说相当于JS中的var。我们建议尽量使用中划线去声明变量。

### 嵌套规则

嵌套语法不仅可以作用在选择器上，还可以用于样式的嵌套。
在CSS文件中，层级较深的选择器有时需要非常多的前置选择器来寻找。而在SCSS中，我们可以通过嵌套语法来表示这种关系。嵌套语法类似于下面这样。

```html
<div id="app">
    <div class="demo">
        <a href="#">click</a>
    </div>
</div>
```

```scss
#app{
    background-color: red;
    .demo{
        background-color: green;
        a{
            color: blue;
        }
}
```

嵌套语法不仅可以使用在选择器的嵌套关系中，也可以使用在样式的嵌套上。样式嵌套中会在两个样式属性之间拼接中划线，代码如下：
scss 代码解读复制代码/*css*/
li {
    margin:1px solid #fff;
    margin-left:0;
    margin-right:0;
}
/*scss*/
li {
    border:1px solid #fff {
        left:0;
        right:0;
    }
}

2.3 父级选择器
父级选择器可以帮助我们找到上一层的选择器。语法为&，可以方便我们为父级元素添加hover、before、after这些属性。父级选择器通常也被用于嵌套规则中。
2.4 插值语法
插值语法类似于模板字符串，可以让我们取到目标变量中的值。语法为：#{}。

它存在的意义是由于变量无法直接在选择器位置上使用变量，变量更多的是作为属性值。所以如果需要在选择器位置使用变量，那么就需要使用插值用法。

对应代码为：
scss 代码解读复制代码$demo:'demo'
.app{
    background-color: red;
    .#{$demo}{
        background-color: green;
        a{
            color: blue;
        }
}
}

2.5 默认值
默认值通常用于变量声明，语法为：!default。如果已经定义了某变量，那么即使重新为该变量赋值，仍然会使用原变量的值。
scss 代码解读复制代码// SCSS
$name1:'zhangsan';
$name1:'lisi' !default;
#app{
    color: $name1;
}

//编译后的CSS
#app {
  color: "zhangsan";
}

2.6 注释
SCSS中的注释有两种：


使用/*这还是一段注释*/会被保存在编译后的CSS文件中。如果想要在任何环境下都可以保留一些重要信息，则可以使用/*!*/进行注释。


//注释编译成CSS文件，会被忽略。


3. @-rules
3.1 @import
@import用来导入SCSS文件。@import可以使用在全局中，也可使用在局部中。
3.2 @extend
@extend主要用来实现继承关系。当我们想要复用某一个选择器的样式，那么就可以使用@extend来实现。
scss 代码解读复制代码#a{
    color:red;
}
#b{
    @extend .a;
}

当然，也可以将需要继承的样式使用占位符%来声明，%表示的内容并不会被编译，只是起到一个占位作用。
scss 代码解读复制代码%border{
  border-radius: 5px;
}

.app {
	@extend %border;
}

4.控制指令
控制指令允许我们在SCSS文件中加入条件、循环这些代码逻辑。下面介绍常用的控制指令：

if if(expession,trueExp,falseExp),该指令的意思为如果表达式expession为真，则取值trueExp，否则是falseExp。


注意if指令后面的小括号一定不能有空格，否则无法正确识别。

SCSS 代码解读复制代码//SCSS
#app{
    color: if(1+1==2,blue,red)
}
//CSS
#app {
  color: blue;
}


@if @if会在条件表达式返回为TRUE时，将对应的样式文件进行编译.@if后面也可以继续跟@else以及@else if这些条件。

SCSS 代码解读复制代码//SCSS
p {
    @if 1 + 1 == 2 { border: 1px solid; }
    @if 5 < 3 { border: 2px dotted; }
    @if null  { border: 3px double; }
  }
//CSS
p {
  border: 1px solid;
}



@for @for支持两种方式。<start> 和 <end> 必须是整数值。

@for $var from <start> through <end>-------》[start,end]
@for $var from <start> to <end>-------》 [start,end)



@while和@for的功能一致，都可用来表示循环。唯一的区别在于@while中的变量需要我们自行控制如何变化。


scss 代码解读复制代码$i: 6;
@while $i > 0 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i - 2;
}

5.混合器
5.1声明混合器
重复的代码片段可以使用@mixin指令进行封装，相当于定义一个函数，可以提高代码的复用性。下面代码中的内容都可以被成功返回。
css 代码解读复制代码@mixin mixin-styles{
    border-radius: 5px;
    color:red;
}

当然，我们也可以在混合器中传入参数。参数也可以拥有默认值
css 代码解读复制代码@mixin mixin-styles($border-radius:5px,$color){
    border-radius: $border-radius;
    color:$color;
}

5.2使用混合器
可以使用@include调用声明的混合器。如果需要传递参数，则同JS传递参数方式。
less 代码解读复制代码.app {
    @include mixin-styles;      
}
## 参考
[SCSS学习]('https://juejin.cn/post/7128806118939344909')
