# TypeScript c Node.js
С самого начала в TypeScript имело первоклассную поддержку для Node.js. Вот как быстро настроить проект Node.js:

> Примечание: многие из этих шагов на самом деле являются стандартными шагами по настройке Node.js

1. Настройте Node.js `package.json`. По-быстрому: `npm init -y`
2. Добавьте TypeScript (`npm install typescript --save-dev`)
3. Добавьте `node.d.ts` (`npm install @types/node --save-dev`)
4. Инициализируйте `tsconfig.json` для параметров TypeScript с помощью нескольких ключевых параметров в вашем файле tsconfig.json (`npx tsc --init --rootDir src --outDir lib --esModuleInterop --resolveJsonModule --lib es6,dom  --module commonjs`)

Это оно! Запустите вашу IDE (например, `code .`) и поиграйтесь. Теперь вы можете использовать все встроенные модули узлов (например, `import * as fs from 'fs';`) со всей надёжностью и эффективностью разработчика в TypeScript!

Весь ваш код TypeScript пойдёт в `src`, а сгенерированный JavaScript - в `lib`.

## Бонус: компиляция на лету + запуск
* Добавьте `ts-node`, который мы будем использовать для компиляции на лету + для запуска в node (`npm install ts-node --save-dev`)
* Добавьте `nodemon`, который будет вызывать `ts-node` при каждом изменении файла (`npm install nodemon --save-dev`)

Теперь просто добавьте `script` к вашему `package.json` беря стартовой точкой вашего приложения, например `index.ts`:

```json
  "scripts": {
    "start": "npm run build:live",
    "build": "tsc -p .",
    "build:live": "nodemon --watch 'src/**/*.ts' --exec 'ts-node' src/index.ts"
  },
```

Теперь вы можете запустить `npm start` и отредактировать `index.ts`:

* nodemon перезапускает свою команду (ts-node)
* ts-node автоматически транспилирует код, подхватив tsconfig.json и установленную версию TypeScript,
* ts-node запускает выводимый JavaScript через Node.js.

А когда вы будете готовы задеплоить свое приложение JavaScript, запустите `npm run build`.


## Бонусный пункт

Такие модули NPM прекрасно работают с browserify (используя tsify) или webpack (используя ts-loader).
