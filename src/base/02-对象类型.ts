let obj1: Object = {
  x: 1,
  y: 2,
};

// obj1.x // 报错，类型Object上不存在属性x
obj1.toString(); // 正常

let obj2: { x: number; y: number } = {
  x: 1,
  y: 2,
};

obj2.x; // 正常
obj2.y; // 正常
// obj2.z; // 报错，类型{ x: number; y: number }上不存在属性z

//
let date1: Date = new Date();

//
let str1: String = new String("typescript");
str1.substring(1);

let str2: string = "typescript";

let str3: String;
str3 = new String("typescript");
str3 = "typescript";

let str4: string;
str4 = "typescript";
// str4 = new String('typescript') // 报错
// 不能将String类型分配给string，string是基元，String是包装器对象

// 现有的样子
type Obj = {
  getX: (a: string, c: boolean) => void;
  getN: (a: number) => void;
};

// 想要的样子
type Obj1 = {
  getX: (c: boolean) => void;
  getN: () => void;
};

// 处理的过程
type Obj2<T> = {
  [Key in keyof T]: T[Key] extends (s: any, ...arg: infer Arg) => any
    ? (...arg: Arg) => ReturnType<T[Key]>
    : T[Key];
};

// 处理的方法
type NewObj = Obj2<Obj>
// type NewObj 等同于 type Obj1

export default void 0
