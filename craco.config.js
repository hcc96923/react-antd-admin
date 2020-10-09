const CracoLessPlugin = require('craco-less');
const path = require('path');
const resolve = pathUrl => path.join(__dirname, pathUrl);


module.exports = {
    webpack: {
        alias: {
            '@': resolve('src'),
            '@assets': resolve('src/assets'),
            '@components': resolve('src/components'),
            '@routes': resolve('src/routes'),
            '@store': resolve('src/store'),
            '@style': resolve('src/style'),
            '@utils': resolve('src/utils'),
            '@views': resolve('src/views')
        }
    },
    devServer: {
        port: 3000,
        hot: true,
    },
    babel: {
        plugins: [
            ['import', { libraryName: 'antd', style: true }],
            ['@babel/plugin-proposal-decorators', { legacy: true }]
        ]
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': '#1DA57A' },
                        javascriptEnabled: true,
                    },
                },
            },
        }
    ]
}