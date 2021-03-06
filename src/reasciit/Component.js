const Style = require('ascii-dom/style');
const Element = require('ascii-dom/core/Element');

class Component {
	state = {};
	props = {};

	render(window, parent) {
		this.width = parent.width;
		const children = this._render();
		const style = {};

		if (!children) {
			return Style.apply([[]], style, parent);
		}

		if (typeof children === 'string') {
			return Style.apply([children.split('')], style, parent);
		}

		if (children instanceof Element) {
			return Style.apply(children.render(window, this), style, parent);
		}

		if (Array.isArray(children)) {
			return Style.applyToSyblings(children, style, window, this);
		}

		throw new Error('Invalid children');
	}

	setState(newState) {
		this.state = {
			...(this.state),
			...newState
		};
		Component.redraw();
	}
}

module.exports = Component;
