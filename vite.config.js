import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
// 打包分析插件
import { visualizer } from 'rollup-plugin-visualizer';
// 配置外部依赖使用cdn https://github.com/mmf-fe/vite-plugin-cdn-import/blob/HEAD/README.zh-CN.md
import cdn from 'vite-plugin-cdn-import';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      visualizer({
        open: false, // 注意这里要设置为true，否则无效，如果存在本地服务端口，将在打包后自动展示
        gzipSize: true,
        filename: 'Rollup-Visualizer.html', //分析图生成的文件名
        brotliSize: true,
      }),
      // cdn({
      //   modules: [
      //     {
      //       name: 'lodash',
      //       var: '_',
      //       path: `https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js`,
      //     }
      //   ],
      //   enableInDevMode: false, // 是否在开发模式中启用
      // })
    ],
    base: env.VITE_APP_ENV === 'production' ? '/' : '/ws-worker',
    server: {
      open: true,
      host: '0.0.0.0',
    },
    build: {
      outDir: env.VITE_APP_ENV === 'development' ? 'dist-dev' : env.VITE_APP_ENV === 'beta' ? 'dist-beta' : 'dist',
      // outDir: 'dist-dev',
      rollupOptions: {
        output: {
          // 在这里修改静态资源路径
          entryFileNames: 'js/[name]-[hash].js', // 入口文件
          chunkFileNames: 'js/[name]-[hash].js',
          // assetFileNames: 'static/assets/[ext]/[name]-[hash].[ext]',
          assetFileNames(assetInfo) {
            // 对打包资源进行细分
            // console.log(assetInfo);
            if (assetInfo.name.endsWith('.css')) {
              return 'css/[name]-[hash].css';
            }
            if (assetInfo.name.endsWith('.worker.js')) {
              return assetInfo.name;
            }
            const imgExts = [
              '.png',
              '.jpg',
              '.jpeg',
              '.gif',
              '.svg',
              '.ico',
              '.webp',
            ];
            if (imgExts.some((ext) => assetInfo.name.endsWith(ext))) {
              return 'img/[name]-[hash].[ext]';
            }
            return 'assets/[name]-[hash].[ext]';
          },
          // 将使用到的包单独打包
          manualChunks: {
            vendor: ['lodash', '@vueuse/core'],
            // 'lodash': ['lodash'],
            // 'vueuse': ['@vueuse/core'],
          },
          // 最小拆分打包
          // manualChunks(id) {
          //   if (id.includes('node_modules')) {
          //     return id.toString().split('node_modules/')[1].split('/')[0].toString();
          //   }
          //   return
          // }
        },
      },
      // 打包环境移除console.log，debugger
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
  };
});
