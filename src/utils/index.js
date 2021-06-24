/**
 * 是否外部链接
 * @param {string} path
 * @returns {Boolean}
 */
export const isExternal = (path) => {
    return /^(https?:|mailto:|tel:)/.test(path);
};


/**
 * 是否空值
 */
export const isNull = value => {
    if ([null, undefined, '', 'undefined', 'null'].indexOf(value) > -1) {
        return true;
    }
    return false;
};