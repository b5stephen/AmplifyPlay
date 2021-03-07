module.exports = {
    configureWebpack: {
        devtool: 'source-map'
      },
      chainWebpack: config => {
        config.module
          .rule('vue')
          .use('vue-loader')
          .tap(options => {
            options.compilerOptions = {
              ...(options.compilerOptions || {}),
              isCustomElement: tag => tag.startsWith('amplify-')
            };
            return options;
          });
      }
  };