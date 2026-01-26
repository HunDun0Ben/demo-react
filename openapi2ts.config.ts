function genDefaultFunctionName(path: string) {
  // 首字母转大写
  function toUpperFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  return path
    .split('/')
    .map((str) => {
      /**
       * 兼容错误命名如 /user/:id/:name
       * 因为是typeName，所以直接进行转换
       * */
      let s = str;
      if (s.includes('-')) {
        s = s.replace(/(-\w)+/g, (_match: string, p1) =>
          p1?.slice(1).toUpperCase(),
        );
      }

      if (s.match(/^{.+}$/gim)) {
        return `By${toUpperFirstLetter(s.slice(1, s.length - 1))}`;
      }
      return toUpperFirstLetter(s);
    })
    .join('');
}

export default {
  requestLibPath: "import { request } from '@umijs/max'",
  schemaPath: 'http://localhost:8080/swagger/doc.json',
  serversPath: './src/services',
  projectName: 'demo',
  apiPrefix: '"/api"',
  mock: false,
  namespace: 'API',
  splitDeclare: true,
  hook: {
    customFunctionName(data: { path: any }) {
      const path = data.path;
      const name = genDefaultFunctionName(path);
      console.log('name: ' + name);
      return name;
    },
  },
};
