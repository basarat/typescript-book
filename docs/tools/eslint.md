# ESLint

ESLint существовал для линтинга JavaScript, но теперь он также становится де-факто линтером для [TypeScript](https://github.com/Microsoft/TypeScript/issues/29288), благодаря [сотрудничеству](https://eslint.org/blog/2019/01/future-typescript-eslint) между двумя командами.

## Установка

Чтобы настроить ESLint для TypeScript, вам потребуются следующие пакеты:

```sh
npm i eslint eslint-plugin-react @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

> ПОДСКАЗКА: eslint называет пакеты, содержащие правила для линтера - "plugin"

* eslint : Ядро eslint 
* eslint-plugin-react : Для правил react, предоставленных eslint. [Список поддерживаемых правил](https://github.com/yannickcr/eslint-plugin-react#list-of-supported-rules)
* @typescript-eslint/parse : Чтобы позволить eslint понять ts / tsx файлы 
* @typescript-eslint/eslint-plugin : Для правил TypeScript. [Список поддерживаемых правил](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules)

> Как видите, есть два пакета eslint (для использования с js или ts) и два пакета @typescript-eslint (для использования с ts). Так что издержки для TypeScript не так уж *велики*.

## Конфиг
Создайте `.eslintrc.js`:

```js
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules:  {
    // Перезаписать правила, указанные в расширенных конфигах, например:
    // "@typescript-eslint/explicit-function-return-type": "off",
  }
}
```

## Запуск

В вашем `package.json` добавьте в `scripts`:

```json
{
  "scripts": {
    "lint": "eslint \"src/**\""
  }
}
```

Теперь вы можете выполнить `npm run lint` для проверки.

## Настройка VSCode

* Установите расширение https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
* Добавьте в `settings.json`:
```js
"eslint.validate":  [
  "javascript",
  "javascriptreact",
  {"language":  "typescript",  "autoFix":  true  },
  {"language":  "typescriptreact",  "autoFix":  true  }
],
```