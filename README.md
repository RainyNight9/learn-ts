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
