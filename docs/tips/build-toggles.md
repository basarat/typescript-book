## Переключатели сборки

Обычно проекты JavaScript переключаются в зависимости от того, где они выполняются. Вы можете легко сделать это с помощью webpack, поскольку он поддерживает *удаление бесполезного кода* на основе переменных среды.

Добавьте различные сценарии в свои `scripts` в `package.json`:

```json
"build:test": "webpack -p --config ./src/webpack.config.js",
"build:prod": "webpack -p --define process.env.NODE_ENV='\"production\"' --config ./src/webpack.config.js",
```

Конечно, я предполагаю, что у вас установлен `npm install webpack --save-dev`. Теперь вы можете запустить `npm run build:test` и т.д.

Использовать эту переменную тоже очень просто:

```ts
/**
 * Этот интерфейс гарантирует, что мы не пропустим добавление свойства в `prod` и `test` сборках.
 */
interface Config {
  someItem: string;
}

/**
 * Экспортируем только config.
 */
export let config: Config;

/**
 * `process.env.NODE_ENV` значение будет запущено из webpack
 *
 * Весь блок `else` будет удален в сгенерированном JavaScript.
 *  для продакшн сборки
 */
if (process.env.NODE_ENV === 'production') {
  config = {
    someItem: 'prod'
  }
  console.log('Запуск для продакшн сборки');
} else {
  config = {
    someItem: 'test'
  }
  console.log('Запуск для тестовой сборки');
}
```

> Мы используем `process.env.NODE_ENV` только потому, что это договорённость во многих библиотеках JavaScript, например `React`.
