// utils.js
export const getPicPath = (filename) => {
    return require(`../public/upload/${filename}`);
};