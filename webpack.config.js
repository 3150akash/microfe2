const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const path = require("path");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "Akzsh",
    projectName: "MicroFe2",
    webpackConfigEnv,
    argv,
  });

  // Extract dependencies from package.json
  const deps = require("./package.json").dependencies;

  return merge(defaultConfig, {
    output: {
      publicPath: "auto", // Recommended for Module Federation
    },
    externals: {}, // Remove externals for Module Federation
    plugins: [
      new ModuleFederationPlugin({
        name: "microfe2", // Unique name for this microfrontend
        filename: "remoteEntry.js",
        remotes: {
          "microfe1": "microfe1@http://localhost:8081/remoteEntry.js",
        },
        exposes: {
        },
        shared: {
          ...deps,
          react: {
            eager: true,
            singleton: true, // Ensure single instance of React across microfrontends
            requiredVersion: deps.react,
            strictVersion: true, // Enforce exact React version match
          },
          "react-dom": {
            eager: true,
            singleton: true,
            requiredVersion: deps["react-dom"],
            strictVersion: true,
          },
          "single-spa-react": {
            eager: true,
            singleton: true,
            requiredVersion: deps["single-spa-react"],
          },
        },
      }),
    ],
  });
};
