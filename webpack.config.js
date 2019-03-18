module.exports = { 
    entry : ["./src/index.js"],
    mode: "development",
    output: {
        path: __dirname,
        filename: "public/index.js"
    },
    devtool: "eval",
    module: {
        rules: 
        [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
          }
        ]
      }

}