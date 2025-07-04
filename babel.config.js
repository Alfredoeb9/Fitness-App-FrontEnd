module.exports = (/** @type {{ cache: (arg0: boolean) => void; }} */ api) => {
    api.cache(false)
    const presets = [
      ['@babel/preset-env', {
        corejs: { version: 3 },
        useBuiltIns: 'usage',
        targets: {
          edge: '17',
          firefox: '60',
          chrome: '67',
          safari: '11.1',
        },
      }],
      ['@babel/preset-react', { 
        runtime: 'automatic' 
      }],
      ['@babel/preset-typescript', {
        isTSX: true,
        allExtensions: true,
      }],
    ]
    const plugins = [
      ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
      ['@babel/plugin-transform-runtime'],
    ]
    return {
      presets,
      plugins,
    }
}