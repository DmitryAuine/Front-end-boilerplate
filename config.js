module.exports = {
  build: {
    pages: {
      /*
        {
          a: "./a",
          b: "./b",
          c: ["./c", "./d"]
        },
      */
      index: './src/pages/index',
    },
    css: {
      extract: false,
    },
  },
  devServer: {
    webpackPort: 3010,
    browserSyncPort: 3000,
  },
};
