import {Input} from 'element-ui';
export default {
    components: {
        Input
    },
    data() {
        return {
            value: null
        };
    },
    render(h) {
        return h(Input, {
            props: {
                value: this.value,
                placeholder: '请输入...'
            },
            on: {
                input: (value) => {
                    this.value = value;
                }
            }
        });
    }
};