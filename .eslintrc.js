// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
      parser: 'babel-eslint'
    },
    env: {
      es6: true,
      browser: true,
      node: true,
      jquery: true
    },
    extends: ['plugin:vue/essential'],
    // required to lint *.vue files
    plugins: [
      'vue'
    ],
    // add your custom rules here
    // off | 0 -- 关闭规则
    // warn | 1 -- 开启规则，警告级别(不会导致程序退出)
    // error | 2 -- 开启规则，错误级别(当被触发的时候，程序会退出)
    rules: {
      // 解决Parsing error: x-invalid-end-tag错误问题
      "vue/no-parsing-error": [
        2, { 
          "x-invalid-end-tag": false 
        }
      ],
      // allow async-await
      'generator-star-spacing': 'off',
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
      'no-undef': 1,
      // 不允许在变量定义之前使用它们
      'no-use-before-define': 1,
      // 分号/定义变量未使用规则
      'semi': [2, 'always'],
      // 强制在 function的左括号之前使用一致的空格
      'space-before-function-paren': [2, "never"],
      // 禁止出现未使用过的变量
      'no-unused-vars': [2, {
        // 允许声明未使用变量  
        'vars': 'local',
        // 参数不检查  
        'args': 'none'
      }],
      "indent": 0,
      //强制使用一致的缩进 第二个参数为 "tab" 时，会使用tab，
      // if while function 后面的{必须与if在同一行，java风格。
      "brace-style": [
        2, "1tbs", 
        {
          "allowSingleLine":true
        }
      ]
    }
  }
  