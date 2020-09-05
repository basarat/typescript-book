## Динамический импорт

**Динамические импорты** - это новая фича и часть **ECMAScript**, которая позволяет пользователям асинхронно запрашивать модуль в любом месте вашей программы.
**TC39** комитет по JavaScript имеет свое собственное предложение, которое находится на стадии 4, и оно называется [import() proposal for JavaScript](https://github.com/tc39/proposal-dynamic-import).

Кроме того, сборщик **webpack** имеет функцию под названием [**Code Splitting**](https://webpack.js.org/guides/code-splitting/), позволяющую разбивать вашу сборку на части, загружающиеся асинхронно позже. Это, например, позволяет при первой загрузке отдать минимальную сборку, а затем асинхронно догрузить дополнительные функции.

Естественно думать (если мы используем webpack в нашем рабочем процессе разработки), что [TypeScript 2.4 динамические импорты](https://github.com/Microsoft/TypeScript/wiki/What%27s-new-in-TypeScript#dynamic-import-expressions) **автоматически создадут** и разделят на части код вашей финальной сборки JS. НО, это не так просто, как кажется, потому что это зависит от конфигурации **tsconfig.json**, с которой мы работаем.

Дело в том, webpack поддерживает два способа для аналогичного разбиения кода: использование **import ()** (предпочтительно, предложение ECMAScript) и **require.ensure ()** (устаревшее, специфичное для webpack). И это означает, что ожидаемый результат от TypeScript - это **оставить оператор import () как есть** вместо того, чтобы транспилировать его во что-то либо еще.

Давайте рассмотрим пример, чтобы выяснить, как настроить webpack + TypeScript 2.4.

В следующем коде я хочу **отложено загрузить библиотеку _moment_**, но меня также интересует разбиение кода, что означает наличие библиотеки moment в отдельной части JS (файл JavaScript), который будет загружен только при необходимости.

```ts
import(/* webpackChunkName: "momentjs" */ "moment")
  .then((moment) => {
      // lazyModule имеет все нужные типы, автозаполнение работает,
      // проверка типов работает, ссылки на код работают \o/
      const time = moment().format();
      console.log("TypeScript >= 2.4.0 Динамический импорт:");
      console.log(time);
  })
  .catch((err) => {
      console.log("Ошибка в загрузке moment", err);
  });
```

Вот tsconfig.json:

```json
{
    "compilerOptions": {
        "target": "es5",                          
        "module": "esnext",                     
        "lib": [
            "dom",
            "es5",
            "scripthost",
            "es2015.promise"
        ],                                        
        "jsx": "react",                           
        "declaration": false,                     
        "sourceMap": true,                        
        "outDir": "./dist/js",                    
        "strict": true,                           
        "moduleResolution": "node",               
        "typeRoots": [
            "./node_modules/@types"
        ],                                        
        "types": [
            "node",
            "react",
            "react-dom"
        ]                                       
    }
}
```


**Важные примечания**:

- Используя **"module": "esnext"** TypeScript создает похожее на import() выражение для использования в разделение кода webpack'ом.
- Для получения дополнительной информации прочитайте эту статью: [Dynamic Import Expressions and webpack 2 Code Splitting integration with TypeScript 2.4](https://blog.josequinto.com/2017/06/29/dynamic-import-expressions-and-webpack-code-splitting-integration-with-typescript-2-4/).


Вы можете увидеть полный пример [здесь][dynamicimportcode].

[dynamicimportcode]:https://cdn.rawgit.com/basarat/typescript-book/705e4496/code/dynamic-import-expressions/dynamicImportExpression.js
