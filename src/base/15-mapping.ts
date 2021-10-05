interface Obj {
  a: string;
  b: number;
  c: boolean;
}

// 仅读的
type ReadonlyObj = Readonly<Obj>

// 可选的
type PartialObj = Partial<Obj>

// 可抽取的
type PickObj = Pick<Obj, 'a' | 'b'>

// 
type RecordObj = Record<'x' | 'y', Obj>
