## История изменений
> Читать markdown файл с прогрессом в проекте легче, чем читать журнал коммитов.

Автоматическая генерация истории изменений из сообщений коммитов - довольно распространенная практика в настоящее время. Существует проект под названием [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog), который генерирует журнал изменений из сообщений коммитов, которые следуют *соглашению*.

### Соглашение об именах коммитов
Наиболее распространенное соглашение - это соглашение *angular*, которое [подробно описано здесь](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines).

### Настройка
* Установите: 

```bash
npm install standard-version -D
```

* Добавьте `script` в ваш `package.json`:

```js
{
  "scripts": {
    "release": "standard-version"
  }
}
```

* Необязательно: чтобы автоматически отправить в удаленный репозиторий новые *git commit и tag* плюс опубликовать в npm, добавьте скрипт `postrelease`:

```js
{
  "scripts": {
    "release": "standard-version",
    "postrelease": "git push --follow-tags origin master && npm publish"
  }
}
```

### Релизы

Просто запустите:

```bash
npm run release
```

На основе имён коммитов `major` | `minor` | `patch` вид релиза определяется автоматически. Чтобы *явно* указать вид, вы можете указать `--release-as`, например:

```bash
npm run release -- --release-as minor
```
