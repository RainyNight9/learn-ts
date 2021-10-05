# ts修改函数参数

## 实现：增加函数一个参数

```ts
// 现有的样子
type Obj = {
  getX: (a: string, c: boolean) => void;
  getN: (a: number) => void;
};

// 想要的样子
type Obj1 = {
  getX: (s: string[], a: string, c: boolean) => void;
  getN: (s: string[], a: number) => void;
};

// 处理的过程
type Obj2<T> = {
  [Key in keyof T]: T[Key] extends (...arg: any) => any
    ? (s: string[], ...arg: Parameters<T[Key]>) => ReturnType<T[Key]>
    : T[Key];
};

// 处理的方法
type NewObj = Obj2<Obj>
// type NewObj 等同于 type Obj1
```

来解释一下实现的代码：

1、循环泛型`T`里面所有的值。
2、如果`T[Key]`不满足`(...arg: any) => any`则不处理, 因为`T[Key]`可能不是函数类型。
3、反之`T[Key]`为函数类型, 则第一个参数为`s: string[]`。
4、`...arg`为后续参数类型, `Parameters<>`为自带方法, 可以推导出函数的所有参数组成的数组的类型。
5、`ReturnType<>`为自带方法, 可以推导出函数的返回值的类型。

## 实现: 去掉函数第一个参数

```ts
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
```

来解释一下实现的代码：

1、这里整体的逻辑是不变的, 与上面一个原理。
2、`(s: any, ...arg: infer Arg) => any`, 这里是核心, 将函数处理第一个参数以外的参数单独拿出来命名为Arg, 然后使用Arg来定义函数的参数。
3、infer是ts内置的关键字, 有点类似js中的var, 他可以定义一个变量。
