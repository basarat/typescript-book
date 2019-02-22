# Ваш JavaScript - это TypeScript

Существовало (и будет существовать) множество соперников среди компиляторов *Какого-то синтаксиса* в *JavaScript*. TypeScript отличается от них тем, что *Ваш JavaScript - это TypeScript*.
There were (and will continue to be) a lot of competitors in *Some syntax* to *JavaScript* compilers. TypeScript отличает is different from them in that *Your JavaScript is TypeScript*. Вот диаграмма:

![JavaScript is TypeScript](https://raw.githubusercontent.com/basarat/typescript-book/master/images/venn.png)

Тем не менее, это означает, что *вам нужно изучить JavaScript* (хорошие новости в том, что *вам **всего лишь** нужно изучить JavaScript*). TypeScript лишь станадартизирует все способы создания *хорошей документации* на JavaScript.

* Простое предоставление нового синтаксиса не помогает исправлять баги (если смотреть на CoffeeScript).
* Создание нового языка слишком отдаляет вас от сред выполнения, сообществ (если смотреть на Dart)

TypeScript - это просто JavaScript с документацией.

## Делая JavaScript лучше

TypeScript будет стараться защитить вас от кусков JavaScript, которые никогда не работали (чтобы вам не нужно было запоминать их):
TypeScript will try to protect you from portions of JavaScript that never worked (so you don't need to remember this stuff):

```ts
[] + []; // JavaScript вываст вам "" (немного смысла в этом есть), TypeScript выдаст ошибку

//
// другие нелепые штуки в JavaScript
// - не выдавать ошибку выполнения (усложняя дебаггинг)
// - но TypeScript выдаст ошибку при компиляции (делая дебаггинг ненужным)
//
{} + []; // JS : 0, TS Error
[] + {}; // JS : "[object Object]", TS Error
{} + {}; // JS : NaN or [object Object][object Object] зависит от браузера, TS Error
"hello" - 1; // JS : NaN, TS Error

function add(a,b) {
  return
    a + b; // JS : undefined, TS Error 'unreachable code detected'
}
```

По существу TypeScript "сдувает пыль" с JavaScript. Просто решает задачу лучше, чем другие линтеры, у которых нет *информации о типе*.

## Вам всё еще нужно изучать JavaScript

Это значит, что TypeScript очень прагматичен относительно того, что *вы пишете JavaScript*, потому что в JavaScript есть некоторые вещи, которые вам всё еще нужно знать, чтобы вас не застали врасплох. Давайте обсудим их далее.

> Примечание: TypeScript - это надмножество JavaScript. Просто документация, которая на самом деле используется компилятором / IDE ;)
