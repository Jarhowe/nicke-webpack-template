import { isExternal } from '@/utils';
import './index.scss';

export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    isExternal() {
      return isExternal(this.iconClass);
    },
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className;
      } else {
        return 'svg-icon';
      }
    },
    styleExternalIcon() {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
      };
    }
  },
  render(h) {
    const {isExternal, styleExternalIcon, svgClass, iconName} = this;
    if (isExternal) {
      return h('div', {
        class: 'svg-external-icon svg-icon',
        style: styleExternalIcon,
        on: {
          ...this.$listeners
        }
      });
    } else {
      return h('svg', {
        class: svgClass,
        attrs: {
          'aria-hidden': true,
          width: '100%',
          height: '100%'
        },
        on: {
          ...this.$listeners
        }
      }, [
        h('use', {
          attrs: {
            href: iconName
          }
        })
      ]);
    }
  }
};
