const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');
const glob = require('glob');

const defaultMessages = glob
  .sync('./lang/.messages/**/*.json')
  .map((filename: string) => readFileSync(filename, 'utf8'))
  .map((file: string) => JSON.parse(file))
  .reduce((messages: string[], descriptors: any[]) => {
    descriptors.forEach(({ id, defaultMessage }) => {
      if (messages.hasOwnProperty(id)) {
        throw new Error(`Duplicate message id: ${id}`);
      }
      messages[id] = defaultMessage;
    });
    return messages;
  }, {});

writeFileSync('./lang/en.json', JSON.stringify(defaultMessages, null, 2));
console.log(`> Wrote default messages to: "${resolve('./lang/en.json')}"`);
