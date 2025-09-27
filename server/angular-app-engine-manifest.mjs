
export default {
  basePath: 'https://ankitfn876.github.io/ADMS',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
