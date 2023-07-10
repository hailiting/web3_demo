export function desensitization(
  fields: number | string,
  sliceNum: number = 3
): string {
  if (`${fields}`.toLowerCase() === "null" || typeof fields === "undefined") {
    return "***";
  }
  const fieldsLen = `${fields}`.length;

  if (fieldsLen < sliceNum * 2) {
    return `${fields}`[0] + "***" + `${fields}`[fieldsLen - 1];
  }
  const start = `${fields}`.substring(0, sliceNum);
  const end = `${fields}`.substring(fieldsLen - sliceNum, fieldsLen);
  return `${start}***${end}`;
}
