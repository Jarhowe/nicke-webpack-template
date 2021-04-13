/**
 * 是否外部链接
 * @param {string} path
 * @returns {Boolean}
 */
export const isExternal = (path) => {
    return /^(https?:|mailto:|tel:)/.test(path);
};