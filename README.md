# learn ts

## 1、搭建环境

1、node安装

node官网自行下载对应版本

检查版本:

```sh
node -v
```

2、typescript安装

```sh
npm install -g typescript
```

检查版本:

```sh
tsc -v
```

## 2、编译文件

```sh
tsc 01-hello.ts
```

执行上处命令，就会得到一个 01-hello.js 文件。

## 3、编译选项

* --outDir 指定编译文件输出目录

```sh
tsc --outDir ./dist ./src/01-hello.ts
```

* --target 指定编译的代码版本，默认为 ES3

```sh
tsc --outDir ./dist --target ES6 ./src/01-hello.ts
```

* --watch 在监听模式下运行，当文件发生改变的时候自动编译

```sh
tsc --outDir ./dist --target ES6 --watch ./src/01-hello.ts
```

### 3.1、编译配置文件 tsconfig.json

```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "target": "es6",
    "watch": true,
    "allowJs": true
  },
  "include": ["./src/**/*"]
}
```

```sh
tsc
```

* -p 指定配置文件

```sh
tsc -p ./ts.json
tsc -p ./src
```

[官方文档 tsconfig.json](https://www.tslang.cn/docs/handbook/tsconfig-json.html)

[编译选项 compilerOptions](https://www.tslang.cn/docs/handbook/compiler-options.html)

## 4、基础类型

### number类型

```ts
let binaryLiteral: number = 0b1010; // 二进制
let octalLiteral: number = 0o744;    // 八进制
let decLiteral: number = 6;    // 十进制
let hexLiteral: number = 0xf00d;    // 十六进制
```

### string类型

```ts
let name: string = "typescript";
let words: string = `您好，我是 ${ name }`;
```

### boolean类型

```ts
let flag: boolean = true;
let flag2: boolean = false;
```

### null类型

>表示对象值缺失。

```ts
let n: null = null;
```

### undefined类型

>用于初始化变量为一个未定义的值。

```ts
let u: undefined = undefined;
```

## 5、其他类型

### any类型

>声明为 any 的变量可以赋予任意类型的值，为ts的默认类型。

### 数组类型

```ts
let list: number[] = [1, 2, 3]; // 在元素类型后面加上[]
let list: Array<number> = [1, 2, 3]; // 或者使用数组泛型
```

### 元组（Tuple）类型

>元组类型用来表示已知元素数量和类型的数组，各元素的类型不必相同，对应位置的类型需要相同。

```ts
let x: [string, number];
x = ['typescript', 1]; // 运行正常
x = [1, 'typescript']; // 报错
console.log(x[0]); // 输出 typescript
```

### enum（枚举）类型

>枚举类型用于定义数值集合。

```ts
enum Color {Red, Green, Blue};
let c: Color = Color.Blue;
console.log(c);  // 输出 2

// 处理状态码
enum HTTP_CODE {
  OK = 200,
  NOT_FOUND = 404
}
if(res.code === HTTP_CODE.OK) {}

// 整合接口连接
enum URLS {
  USER_REGISETER = '/user/regiseter',
  USER_LOGIN = '/user/login'
}
```

### void类型

>用于标识方法返回值的类型，表示该方法没有返回值。

```ts
function hello(): void {
    alert("Hello typescript");
}
```

### never类型

>never 是其它类型（包括 null 和 undefined）的子类型，代表从不会出现的值。

```ts
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}
// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}
// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}
```

### object类型

```ts
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error
```

### unknow类型

>3.0版本中新增，属于安全版的any，但是与any有所不同。

* unknow仅能赋值给unkonow,any
* unknow没有任何属性和方法

### 函数类型

```ts
function add(x: number, y: number): number {
    return x + y;
}
console.log(add(1,2))
```

## 6、接口

>TypeScript的核心原则之一是对值所具有的结构进行类型检查。 在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。
>>接口是一系列抽象方法的声明，是一些方法特征的集合，这些方法都应该是抽象的，需要由具体的类去实现，然后第三方就可以通过这组抽象方法调用，让具体的类执行具体的方法。
>>>接口是一种类型，不能作为值去使用。

```ts
interface Person {
  name: string;
  readonly ID: number;
  age?: number;
  [propName: string]: any;
}
```

### 可选属性

可选属性的好处之一是可以对可能存在的属性进行预定义，好处之二是可以捕获引用了不存在的属性时的错误

### 只读属性

一些对象属性只能在对象刚刚创建的时候修改其值，后续只能读取，不能修改。

### 额外的属性

>索引签名参数类型必须为 string 或 number 之一，但是两者可同时出现
>>当同时存在数字类型索引和字符串类型索引的时候，数字类型的值必须是字符串类型的值类型或子类型
>>>这是因为当使用 number来索引时，JavaScript会将它转换成string然后再去索引对象。 也就是说用 100（一个number）去索引等同于使用"100"（一个string）去索引，因此两者需要保持一致

## 7、类型深入

### 联合类型

```ts
function css(ele: Element, attr: string, value: string | number) {
  //
}

let box = document.querySelector(".box");
if (box) {
  css(box, "width", "100px");
  css(box, "opacity", 1);
}
```

### 交叉类型

```ts
interface o1 {
  x: number;
  y: string;
}
interface o2 {
  z: boolean;
}

let o3: o1 & o2 = Object.assign({}, { x: 1, y: "2" }, { z: true });
```

### 字面量类型

```ts
function setPosition(
  ele: Element,
  direction: "left" | "top" | "right" | "bottom"
) {
  //
}

let box = document.querySelector(".box");
box && setPosition(box, "bottom");
// box && setPosition(box, 'leftTop') // 错误
```

### 类型别名

```ts
type dir = "left" | "top" | "right" | "bottom";
function setPosition(ele: Element, direction: dir) {
  //
}

let box = document.querySelector(".box");
box && setPosition(box, "bottom");
```

### 类型推导

类型推导发生在：

* 初始化变量
* 设置函数默认参数值
* 返回函数值

```ts
let x = 1; // 自动推导 x 为 number
x = 'a'; // 报错

function a(x = 1, y = 2) {
  return x + y;
}

function b(x: number, y: number) {
  return x + y;
}
```

### 类型断言

```ts
let img = document.querySelector(".img"); // Element
img && img.src // 报错
// 要让类型更加精确
let img1 = <HTMLImageElement>document.querySelector(".img");
img1 && img1.src 
let img2 = document.querySelector(".img") as HTMLImageElement;
img2 && img2.src 
```

### 类型操作符

#### typeof

>获取值的类型，注意：typeof操作的是值

```ts
let colors = {
  color1: "red",
  color2: "blue",
};

type tColors = typeof colors;
// 等同于
// type tColors = {
//   color1: "string",
//   color2: "string",
// }

let color3: tColors;
```

#### keyof

>获取类型的所对应的key的集合，返回值是key的联合类型，注意：keyof操作的是类型

```ts
interface Person {
  name: string;
  age: number;
}

type a = keyof Person; // 等同于 type a = 'name' | 'age'

let data: a;
data = "name";
data = "age";
data = "gender"; // 报错
```

```ts
function css(ele: Element, attr: keyof CSSStyleDeclaration) {
  return getComputedStyle(ele)[attr];
}

let box = document.querySelector(".box");
box && css(box, "width");
box && css(box, "aaa"); // 报错
```

```ts
interface Person {
  name: string;
  age: number;
}
let p1: Person = {
  name: "zhangsan",
  age: 30,
};
function getPersonVal(k: keyof Person) {
  return p1[k];
}

let p2 = {
  name: "zhangsan",
  age: 30,
  gender: "Man",
};
function getPersonVal2(k: keyof typeof p2) {
  return p2[k];
}
```

#### in

>操作符对值和类型都可以使用

针对值进行操作，用来判断值中是否包含指定的key

```ts
let a = "name" in { name: "zhangsan", age: 30 }; // true
let b = "gender" in { name: "zhangsan", age: 30 }; // false
```

针对类型进行操作的话，内部使用for...in对类型进行遍历

```ts
interface Person {
  name: string;
  age: number;
}
type personKeys = keyof Person;
type newPerson = {
  [k in personKeys]: string;
};
```

>注意：in后边的类型值必须是 string 或 number 或 symbol

#### extends

>类型继承操作符

```ts
interface type1 {
  x: number;
  y: number;
}

interface type2 extends type1 {
  z: string;
}

let a: type2 = {
  x: 1,
  y: 2,
  z: "3",
};
```

或者是这样：

```ts
type type1 = {
  x: number;
  y: number;
};
function fn<T extends type1>(args: T) {}
fn({ x: 1, y: 2 });
```

### 类型保护

#### typeof保护

```ts
function toUpperCase(str: string | string[]) {
  // str.length;
  // return str.toUpperCase(); // 报错

  if (typeof str === "string") {
    str.toUpperCase();
  } else {
    str.push();
  }
}
```

#### instanceof保护

```ts
function toUpperCase(str: string | string[]) {
  // str.length;
  // return str.toUpperCase(); // 报错

  if (str instanceof Array) {
    str.push();
  } else {
    str.toUpperCase();
  }
}
```

#### 自定义类型保护

```ts
// data is Element[] | NodeList 是一种类型谓词，格式为： xx is type
function canEach(
  data: Element[] | NodeList | Element
): data is Element[] | NodeList {
  return (<NodeList>data).forEach !== undefined;
}

function fn2(elements: Element[] | NodeList | Element) {
  if (canEach(elements)) {
    elements.forEach(() => {});
  } else {
    elements.classList.add("box");
  }
}
```
