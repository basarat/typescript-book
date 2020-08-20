## Советы по JQuery

Примечание: для использования этих советов у вас должен быть установлен `jquery.d.ts`.

### Быстро определить новый плагин

Просто создайте `jquery-foo.d.ts` с помощью:

```ts
interface JQuery {
  foo: any;
}
```

И теперь вы можете использовать `$('something').foo({whateverYouWant:'hello jquery plugin'})`
