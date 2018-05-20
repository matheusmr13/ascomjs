const Style = require('./../style');

const merge = (...args) => {
  if (args.length < 2) {
    return (args && args[0]) || undefined;
  }

  if (args.length > 2) {
    return args.reduce((merged, actual) => merge(merged, actual), args[0]);
  }

  if (typeof args[1] === 'undefined') {
    return args[0];
  }

  if (!args[0] || (args[0].constructor !== args[1].constructor)) {
    return args[1];
  }

  const dest = args[0];
  const origin = args[1];
  Object.keys(origin).forEach((key) => {
    if (origin[key].constructor === Object) {
      dest[key] = merge(dest[key], origin[key]);
    } else {
      dest[key] = origin[key];
    }
  });
  return dest;
}

class Element {
  constructor(props = {}) {
    this.props = {
      ...props,
      style: merge({}, this.constructor.defaultStyle, props.style)
    };
    this.width = this.props.style.width || 0;
    this.height = 0;
  }

  render(parent) {
    const { children, style } = this.props;
    if (!children) {
      return Style.apply([[]], style, parent);
    }
    
    if (typeof children === 'string') {
      return Style.apply([children.split('')], style, parent);
    }

    if (children instanceof Element) {
      return Style.apply(children.render(this), style, parent)
    }
    
    if (Array.isArray(children)) {
      return Style.applyToSyblings(children, style, parent);
    }
  }
}

module.exports = Element;
