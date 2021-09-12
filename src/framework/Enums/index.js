class Enums {
  data = {};
  alias = [];
  constructor(enumsName) {
    this.enumsName = enumsName;
  }
  set(name, value) {
    this.data[name] = value + '';
    return this;
  }
  get(name) {
    return this.data[name];
  }
  is(nameOrAlias) {
    return this.enumsName === nameOrAlias || this.alias.includes(nameOrAlias);
  }
  getData() {
    return this.data;
  }
}

export default Enums;
