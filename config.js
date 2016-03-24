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
      /*
        Do not forget to change publicPath if you want to extract the css
      */
      extract: false,
    },
    publicPath: '../dist/',
  },
  devServer: {
    webpackPort: 3010,
    browserSyncPort: 3000,
  },
};
