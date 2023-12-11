module.exports = {
  rules: {
    "whitespace-between-Chinese-and-English": {
      create(context) {
        return {
          Literal(node) {
            if (typeof node.value === 'string') {
              const regex = /([\u4e00-\u9fff](?=[a-zA-Z]))|([a-zA-Z](?=[\u4e00-\u9fff]))/g;
              const matches = [];
              let match;
              while ((match = regex.exec(node.value)) !== null) {
                matches.push(match);
              }
              if (matches.length) {
                context.report({
                  node,
                  message: `在中英文之间应插入空格: ${node.value}`,
                  fix: fixer => fixer.replaceText(node, node.raw.replace(regex, '$1$2 '))
                })
              }
            }
          },
        };
      },
    }
  },
};
