enum E {
  X,
  Y,
  Z,
}

function fa(obj: { X: number }) {
  return obj.X;
}

fa(E)
