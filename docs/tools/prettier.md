# Prettier 

Prettier - отличный инструмент от Facebook, который настолько упрощает форматирование кода, что о нем стоит упомянуть. Настроить его для TypeScript с использованием рекомендованной нами настройки проекта (все в папке `src`) очень просто:

## Установка 

* `npm install prettier -D` 
* Добавьте `scripts` в `package.json`: 

```
    "prettier:base": "prettier --parser typescript --single-quote",
    "prettier:check": "npm run prettier:base -- --list-different \"src/**/*.{ts,tsx}\"",
    "prettier:write": "npm run prettier:base -- --write \"src/**/*.{ts,tsx}\""
```

## Использование
На вашем CI-сервере:
* `npm run prettier:check` 

Во время разработки (или используя в хуке перед коммитом):
* `npm run prettier:write`
