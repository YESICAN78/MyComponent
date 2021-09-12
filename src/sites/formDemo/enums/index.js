import Enums from '../../../framework/Enums/index';
const enums = [new Enums('驾驶证').set('A1', '0').set('A2', '1').set('B1', '2').set('B2', '3').set('C1', '4')];
export default (enumsName) => {
  return enums.find((item) => item.is(enumsName));
};
