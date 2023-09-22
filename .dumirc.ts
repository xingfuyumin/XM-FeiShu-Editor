import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'tant-editor',
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/XM-FeiShu-Editor/docs-dist/' : '',
  history: {
    type: 'hash',
  }
});
