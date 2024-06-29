const { override } = require("customize-cra");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;

module.exports = override((config) => {
  config.output.publicPath = "auto";
  const deps = require("../package.json").dependencies;
  config.plugins.push(
    new ModuleFederationPlugin({
      name: "microfe2",
      filename: "remoteEntry.js",
      remotes: {
        "microfe1": "microfe1@http://localhost:3000/remoteEntry.js",
      },
      exposes: {
       
      },
      shared: {
        ...deps,
        react: {
          eager: true,
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          eager: true,
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    })
  );

  return config;
});
