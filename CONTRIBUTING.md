# Співпраця

Ця книга розроблена з використанням [GitBook](https://github.com/GitbookIO/gitbook). Складається з Markdown файлів (Я використовую [atom](http://atom.io)).

Як налаштувати оточення розробника (Dev Environment):

```
npm install gitbook-cli -g
gitbook install
gitbook serve .
```
> Зверніть увагу: serve використовує порт `35729` (для онлайн перезавантаженя) та `4000` для роботи http://localhost:4000.

Також можна просто редагувати `.md` файли в [`/docs`](https://github.com/basarat/typescript-book/docs) використовуючи github і створити Pull Request (PR).

# Код
Увесь код для книги знаходиться в папці `/code`. Проткстовано за допомогою `atom-typescript`.

### Додаткові рекомендації з Gitbook
* Послилання краще пряцюють, якщо вони відносні (наприклад, `./foo.md`) для *поточного* файлу.
* Для посилань всередині певного файлу (посилання у стилі `#foo-bar`) краще кліенути на заголовку у github, щоб зрозуміти, що очікує gitbook.

### Документація компілятора TypeScript
Дякую команді TypeScript за надання документації https://github.com/Microsoft/TypeScript/wiki/Architectural-Overview, що використовується для написання compiler story.