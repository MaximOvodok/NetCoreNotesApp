function enumToArray(Enum: any, keyProp: string, valueProp: string): any {
  var filtered = Object.keys(Enum).filter(
    (key: any) => !Number.isNaN(Number.parseInt(key))
  );
  return filtered.map(key => ({
    [keyProp]: key,
    [valueProp]: Enum[key]
  }));
}

export { enumToArray };
