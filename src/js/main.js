import _ from 'lodash';

const component = () => {
  const elm = document.createElement('div');
  elm.innerHTML = _.join(['hello', 'webpack'], '');
  return elm;
}
document.body.appendChild(component());
