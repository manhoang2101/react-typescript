class GenerateData {
  public initialSchema: any;
  constructor(schema: { [x: string]: any } | null = null) {
    this.initialSchema = schema;
  }
  number = (length: number) => {
    let result = "";
    const characters = "1234567890";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return Number(result);
  };

  string = (length: number) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  dataEXST = (
    $length = 10,
    $sm: { [x: string]: any } | null = null
  ): any[] | any => {
    if (!$sm) $sm = this.initialSchema;
    const data = [];
    for (let i = 0; i <= $length; i += 1) {
      const item: { [x: string]: any } = {};
      if ($sm === null) return {};
      Object.keys($sm).forEach(($key: string | number) => {
        if ($sm && $sm[$key] instanceof Date) {
          item[$key] = new Date().toISOString();
        } else if ($sm && typeof $sm[$key] === "string") {
          item[$key] = this.string(10);
        } else if ($sm && typeof $sm[$key] === "number") {
          item[$key] = this.number(2);
        } else {
          item[$key] = $sm && $sm[$key];
        }
      });
      if ($length === 1) return item;
      data.push(item);
    }
    return data;
  };
}
export default GenerateData;
