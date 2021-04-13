"use strict";

module.exports = {
    types: [
        { value: '功能', name: '功能: 根据需求新增产品功能' },
        { value: '修复', name: '修复: 修复一个Bug' },
        { value: '文档', name: '文档: 变更当前的文档' },
        { value: '格式', name: '格式: 代码格式 (如删除空格、格式化、去掉末尾分号等)' },
        { value: '重构', name: '重构: 代码重构，不包括 bug 修复、功能新增' },
        { value: '性能', name: '性能: 性能优化' },
        { value: '测试', name: '测试: 添加、修改测试用例' },
        { value: '工具', name: '工具: 开发工具变动(构建、脚手架工具等)' },
        { value: '回滚', name: '回滚: 代码回退' }
    ],

    scopes: [
        { name: '模块1' },
        { name: '模块2' },
        { name: '模块3' },
        { name: '模块4' }
    ],

    // it needs to match the value for field type. Eg.: 'fix'/*
    scopeOverrides: {
        fix: [
            { name: 'merge' },
            { name: 'style' },
            { name: 'e2eTest' },
            { name: 'unitTest' }
        ]
    },
    // override the messages, defaults are as follows
    messages: {
        type: '选择一种你的提交类型:',
        scope: '选择一个scope (可选):',
        // used if allowCustomScopes is true
        customScope: 'Denote the SCOPE of this change:',
        subject: '填写一个简单的描述:\n',
        body: '添加一个更加详细的描述，使用"|"换行(可选)：\n',
        breaking: '非兼容性说明 (可选):\n',
        footer: '关联关闭的issue，例如：#31, #34(可选):\n',
        confirmCommit: '确定提交说明?'
    },

    allowCustomScopes: true,
    allowBreakingChanges: ['功能', '修复'],

    // limit subject length
    subjectLimit: 100

};