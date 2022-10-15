// merges the webpack.common.js with either webpack.dev or webpack.prod

const { merge } = require("webpack-merge");
const commonConfig = require('./webpack.common.js');



// this is exported as a function instead of an object so that 
// environmental variables from the package.json file are accessible
// the value of envVars is passed in the start/build scripts
module.exports = (envVars) => {
    const { env } = envVars;
    const envConfig = require(`./webpack.${env}.js`);
    const config = merge(commonConfig, envConfig);
    return config;
}