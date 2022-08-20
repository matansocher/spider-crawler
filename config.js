
const NODE_ENV = process.env.NODE_ENV || 'dev';
console.log(`NODE_ENV: ${NODE_ENV}`);

module.exports = {
    NODE_ENV,
    MAX_LEVEL_DEEP: 2,
    NUM_OF_CHARS_FOR_SIMILAR_URL: 25,
};
