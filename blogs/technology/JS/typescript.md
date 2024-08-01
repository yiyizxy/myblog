---
title: Typescript
date: 2024/08/01
tags:
 - javascript
categories:
 - javascript
---

## 什么是TypeScript？

Typescript是一个强类型的JavaScript超集，支持ES6语法，支持面向对象编程的概念，如类、接口、继承、泛型等。Typescript并不直接在浏览器上运行，需要编译器编译成纯Javascript来运行。

## 为什么要使用TypeScript?TypeScript相对于JavaScript的优势是什么？

增加了静态类型，可以在开发人员编写脚本时检测错误，使得代码质量更好，更健壮。
优势:
1.杜绝手误导致的变量名写错;
2.类型可以一定程度上充当文档;
3.IDE自动填充，自动联想;

## TypeScript中const和readonly的区别？枚举和常量枚举的区别？接口和类型别名的区别？

const可以防止变量的值被修改，readonly可以防止变量的属性被修改。
枚举和常量枚举: 常量枚举只能使用常量枚举表达式，并且不同于常规的枚举，它们在编译阶段会被删除。 常量枚举成员在使用的地方会被内联进来。 之所以可以这么做是因为，常量枚举不允许包含计算成员。
接口和类型别名: 两者都可以用来描述对象或函数的类型。与接口不同，类型别名还可以用于其他类型，如基本类型（原始值）、联合类型、元组。

## TypeScript中any类型的作用是什么？

为编程阶段还不清楚类型的变量指定一个类型。这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。

## TypeScript中any、never、unknown、null&undefined和void有什么区别？

any: 动态的变量类型（失去了类型检查的作用）。
never: 永不存在的值的类型。例如：never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型。
unknown: 任何类型的值都可以赋给unknown类型，但是unknown类型的值只能赋给unknown本身和any类型。
null&undefined: 默认情况下null和undefined是所有类型的子类型。就是说你可以把null和undefined赋值给number类型的变量。当你指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自。
void: 没有任何类型。例如：一个函数如果没有返回值，那么返回值可以定义为void。

## TypeScript中interface可以给Function/Array/Class（Indexable）做声明吗？

```js
/* 可以 */
// 函数声明
interface Say {
    (name: string): viod;
}
let say: Say = (name: string):viod => {}

// Array 声明
interface NumberArray { 
 [index: number]: number; 
} 
let fibonacci: NumberArray = [1, 1, 2, 3, 5];

// Class 声明
interface PersonalIntl {
 name: string
 sayHi (name: string): string
}
```

## TypeScript中可以使用String、Number、Boolean、Symbol、Object等给类型做声明吗？

```js
/* 可以 */
let name: string = "bob";
let decLiteral: number = 6;
let isDone: boolean = false;
let sym: symbol = Symbol();
interface Person {
 name: string;
 age: number;
}
```

## TypeScript中的this和JavaScript中的this有什么差异？

TypeScript：noImplicitThis: true 的情况下，必须去声明 this 的类型，才能在函数或者对象中使用this。
Typescript 中箭头函数的 this 和 ES6 中箭头函数中的 this 是一致的。

## TypeScript中使用Union Types时有哪些注意事项？

属性或方法访问: 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法。

```js
function getLength(something: string | number): number {
   return something.length;
}
// index.ts(2,22): error TS2339: Property 'length' does not exist on type >'string | number'.
//   Property 'length' does not exist on type 'number'.

function getString(something: string | number): string {
   return something.toString();
}
```

## TypeScript如何设计Class的声明？

```js
// 在声明类的时候，一般类中都会包含构造函数、对构造函数中的属性进行类型声明、类中的方法
class Greeter {
   greeting: string;
   constructor(message: string) {
       this.greeting = message;
   } 
   greet(): string{
       return "Hello, " + this.greeting;
   }
}
let greeter = new Greeter("world");
```

## TypeScript中如何联合枚举类型的Key?

```js
enum str {
   A,
   B,
   C
}
type strUnion =  keyof typeof str; // 'A' | 'B' | 'C'
```

## TypeScript中type和interface的区别?

相同点：

1. 都可以描述'对象'或者'函数'
2. 都允许拓展(extends)

不同点：

1. type可以声明基本类型，联合类型，元组
2. type可以使用 typeof 获取实例的类型进行赋值
3. 多个相同的interface 声明可以自动合并

结论：使用interface描述‘数据结构’，使用type描述‘类型关系’

## TypeScript 中 ?.、??、!、!.、_、**等符号的含义？

`?.` 可选链遇到null和undefined可以立即停止表达式的运行。
`??` 空值合并运算符，当左侧操作数为null或undefined时，其返回右侧的操作数，否则返回左侧的操作数。
`!` 非空断言运算符x!，将从x值域中排除null和undefined
`!.` 在变量名后添加，可以断言排除undefined和null类型
`_` 数字分割符分隔符不会改变数值字面量的值，使人更容易读懂数字 .e.g 1_101_324。
`**` 求幂, `2**3=8`

## 简单介绍一下TypeScript模块的加载机制？

假设有一个导入语句import { a } from "moduleA";

1. 首先，编译器会尝试定位需要导入的模块文件，通过绝对或者相对的路径查找方式；
2. 如果上面的解析失败了，没有查找到对应的模块，编译器会尝试定位一个外部模块声明（.d.ts）；
3. 最后，如果编译器还是不能解析这个模块，则会抛出一个错误error TS2307: Cannot find module 'moduleA'.

## 简单聊聊你对TypeScript类型兼容性的理解？

ts类型兼容：当一个类型Y可以赋值给另一个类型X时，我们就可以说类型X兼容类型Y。也就是说两者在结构上是一致的，而不一定非得通过extends的方式继承而来
接口的兼容性：X = Y只要目标类型X中声明的属性变量在源类型Y中都存在就是兼容的（ Y中的类型可以比X中的多，但是不能少）
函数的兼容性：X = Y Y的每个参数必须能在X里找到对应类型的参数，参数的名字相同与否无所谓，只看它们的类型（参数可以少但是不能多。与接口的兼容性有区别，原因参考第 17 问）

## 协变、逆变、双变和抗变的理解？

协变：X = Y，Y类型可以赋值给X类型的情况就叫做协变，也可以说是X类型兼容Y类型

```js
interface X { name: string; age: number; } 
interface Y { name: string; age: number; hobbies: string[] }
let x: X = { name: 'xiaoming', age: 16 }
let y: Y = { name: 'xiaohong', age: 18, hobbies: ['eat'] }
x = y
```

逆变：printY=printX，函数X类型可以赋值给函数Y类型，因为函数Y在调用的时候参数是按照Y类型进行约束的，但是用到的是函数X的X的属性和方法，ts检查结果是类型安全的。这种特性就叫做逆变，函数的参数有逆变的性质。

```js
let printY: (y: Y) => void
printY = (y) => { console.log(y.hobbies) }
let printX: (x: X) => void
printX = (x) => { console.log(x.name) }
printY = printX
```

双变（双向协变）：X = Y；Y = X父类型可以赋值给子类型，子类型可以赋值给父类型，既逆变又协变，叫做“双向协变”（ts2.x 之前支持这种赋值，之后 ts 加了一个编译选项 strictFunctionTypes，设置为 true 就只支持函数参数的逆变，设置为 false 则支持双向协变）
抗变（不变）：非父子类型之间不会发生型变，只要类型不一样就会报错

## TypeScript中对象展开会有什么副作用吗？

展开对象后面的属性会覆盖前面的属性；仅包含对象自身的可枚举属性，不可枚举的属性将会丢失。

## 类型的全局声明和局部声明

如果声明文件内不包含import、export，那么这个文件声明的类型就会变成全局声明。反之，若是这个文件包含了import、export，那么这个文件包含的类型声明则会是局部声明，不会影响到全局声明。

## TypeScript中同名的interface或者同名的interface和class可以合并吗？

- 同名的interface会自动合并,它们的成员会被合并到一个接口中。
- 同名的interface和class 不能直接合并，但可以通过 interface 扩展 class 的静态部分来实现类似的效果

```js
// 同名的interface会自动合并
interface Person {
    name: string;
}

interface Person {
    age: number;
}

const person: Person = {
    name: "John",
    age: 30
};
console.log(person); // 输出: { name: "John", age: 30 }
```

```js
// 通过interface扩展class的静态部分来实现类似的效果
class Person {
    constructor(public name: string) {}
}

interface Person {
    age: number;
}

const person = new Person("John");
person.age = 30;
```

```js
class Person {
  constructor(public name: string) {}
}

// 使用命名空间扩展类
namespace Person {
    export let defaultAge = 30;
    export function createPerson(name: string): Person {
        return new Person(name);
    }
}

const person = Person.createPerson("John");
console.log(person); // 输出: Person { name: "John" }
console.log(Person.defaultAge); // 输出: 30
```

## 如何使TypeScript项目引入并识别编译为JavaScript的npm库包？

1. 选择安装ts版本，npm install @types/包名 --save；
2. 对于没有类型的js库，需要编写同名的.d.ts文件

## TypeScript的tsconfig.json中有哪些配置项信息？

```json
{
  "files": [],
  "include": [],
  "exclude": [],
  "compileOnSave": false,
  "extends": "",
  "compilerOptions": {
    "baseUrl": ".", 
    "paths": { 
        "@helper/*": ["src/helper/*"], 
        "@utils/*": ["src/utils/*"], 
         ... 
        } 
   } 
}
```

- files: 一个数组列表，里面包含指定文件的相对或绝对路径，用来指定待编译文件，编译器在编译的时候只会编译包含在files中列出的文件,files依赖的文件不会编译。
- include&exclude: 指定编译某些文件，或者指定排除某些文件。
- compileOnSave:true 让IDE在保存文件的时候根据tsconfig.json重新生成文件。
- extends: 可以通过指定一个其他的tsconfig.json文件路径，来继承这个配置文件里的配置。
- compilerOptions: 编译配置项，如何对具体的ts文件进行编译
- paths: 设置模块导入的路径别名

## files和include的区别

### 显式列出vs模式匹配

files：显式列出每个文件
include：使用模式匹配多个文件

### 精确控制vs灵活性

files：精确控制要编译的文件
include：灵活匹配多个文件或文件夹

### 自动包含依赖文件

files：不自动包含依赖文件
include：自动包含依赖文件

## declare，declare global是什么？

declare是用来定义全局变量、全局函数、全局命名空间、js modules、class等
declare global为全局对象 window 增加新的属性

```js
declare global { 
   interface Window { 
        csrf: string; 
   }
}
```

## 对TypeScript类中成员的public、private、protected、readonly修饰符的理解？

public: 成员都默认为public，被此限定符修饰的成员是可以被外部访问；
private: 被此限定符修饰的成员是只可以被类的内部访问；
protected: 被此限定符修饰的成员是只可以被类的内部以及类的子类访问;
readonly: 关键字将属性设置为只读的。只读属性必须在声明时或构造函数里被初始化。

## keyof和typeof关键字的作用？

keyof:获取索引类型的属性名，构成联合类型。
typeof:获取一个变量或对象的类型。

## 简述工具类型Exclude、Omit、Merge、Intersection、Overwrite的作用

Exclude<T, U> 从 T 中排除出可分配给 U的元素。
Omit<T, K> 的作用是忽略T中的某些属性。
Merge<O1, O2> 是将两个对象的属性合并。
Compute<A & B> 是将交叉类型合并
Intersection<T, U>的作用是取T的属性,此属性同样也存在与U。
Overwrite<T, U> 是用U的属性覆盖T的相同属性。

## 数组定义的两种方式

```js
type Foo= Array<string>;
interface Bar { 
     baz: Array<{ name: string, age: number}>
}

type Foo = string[];
interface Bar { 
     baz : { name: string, age: number }[] 
}
```

## 参考

[TypeScript TS](https://juejin.cn/post/6999985372440559624?searchId=202408011553468D2E043AF0EBBE5F6153)