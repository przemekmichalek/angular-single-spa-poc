const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const singleSpaAngularWebpack = require('single-spa-angular/lib/webpack').default;
const path = require('path'); // Add this to resolve paths

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaAngularWebpack(webpackConfigEnv, argv);

  const orgName = "sdepangular";

  // Ensure your project's entry point is correctly set
  const entryPath = path.resolve(__dirname, './src/main.single-spa.ts'); // Adjust if your entry file is located elsewhere

  const mfConfig = {
    output: {
      uniqueName: orgName,
      publicPath: 'http://localhost:4200/', // Consider using "auto" if you're not sure about the public path
    },
    optimization: {
      runtimeChunk: false,
      minimize: false
    },
    resolve: {
      extensions: ['.ts', '.js'], // Add this to resolve TypeScript and JavaScript files
    },
    module: {
      rules: [
        // ... other rules
        {
          test: /\.ts$/,
          use: 'ts-loader', // or the loader you're using for TypeScript
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: orgName,
        filename: "remoteEntry.js",
        exposes: {
          './Component': './src/main.single-spa.ts', // use the absolute path
        },
        // shared: {
        //   "@angular/core": { singleton: true, strictVersion: true, requiredVersion: "^15.1.0" },
        //   "@angular/common": { singleton: true, strictVersion: true, requiredVersion: "^15.1.0" },
        //   "@angular/router": { singleton: true, strictVersion: true, requiredVersion: "^15.1.0" },
        //   "rxjs": { singleton: true, strictVersion: true, requiredVersion: "~7.8.0" },
        //   "single-spa-angular": { singleton: true, strictVersion: true, requiredVersion: "^9.0.1" },
        //   "@angular/animations": { singleton: true, strictVersion: true, requiredVersion: "^15.1.0" },
        //   "@angular/compiler": { singleton: true, strictVersion: true, requiredVersion: "^15.1.0" },
        //   "@angular/forms": { singleton: true, strictVersion: true, requiredVersion: "^15.1.0" },
        //   "@angular/platform-browser": { singleton: true, strictVersion: true, requiredVersion: "^15.1.0" },
        //   "@angular/platform-browser-dynamic": { singleton: true, strictVersion: true, requiredVersion: "^15.1.0" },
        //   "single-spa": { singleton: true, strictVersion: true, requiredVersion: "^5.9.5" },
        //   "tslib": { singleton: true, strictVersion: true, requiredVersion: "^2.3.0" },
        //   // ...other shared dependencies
        // },
      }),
    ],
  };

  // Merge the default configuration with your customizations
  return merge(defaultConfig, mfConfig);
};
