* [Getting Started with TypeScript](#getting-started-with-typescript)
* [TypeScript Version](#typescript-version)

# Rozpocznij z TypeScript

TypeScript kompiluje się do JavaScript. JavaScript jest tym, co faktycznie zamierzasz wykonać (w przeglądarce lub na serwerze). Będziesz więc potrzebować:

* Kompilatora TypeScript (dostepne OSS [w źródle](https://github.com/Microsoft/TypeScript/) oraz na [NPM](https://www.npmjs.com/package/typescript))
* Edytora TypeScript (możesz użyć notatnika, jeśli chcesz, ale ja używam [VSCode 🌹](https://code.visualstudio.com/) z tym [rozszerzeniem które napisałem](https://marketplace.visualstudio.com/items?itemName=basarat.god). Obsługuje to także [wiele innych IDEs](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support).


## Wersja TypeScript

Zamiast używać *stabilnego* kompilatora TypeScript, w tej książce zaprezentujemy wiele nowych rzeczy, które mogą nie być jeszcze powiązane z numerem wersji. Ogólnie polecam ludziom korzystanie z wersji nocnej (nightly), ponieważ **pakiet testowy kompilatora wykrywa tylko więcej błędów w miarę upływu czasu**.

Możesz zainstalować go w wierszu poleceń w ten sposób:

```
npm install -g typescript@next
```

I teraz linia poleceń `tsc` będzie najnowsza i największa. Obsługują to także różne środowiska IDE, np.

* Możesz poprosić VSCode o użycie tej wersji, tworząc `.vscode/settings.json` o następującej treści:

```json
{
  "typescript.tsdk": "./node_modules/typescript/lib"
}
```

## Uzyskiwanie kodu źródłowego
Źródło tej książki jest dostępne w repozytorium książek GitHub https://github.com/basarat/typescript-book/tree/master/code
Większość próbek kodu można skopiować do VSCode i można z nimi kodzić bez zmian. W przypadku próbek kodu, które wymagają dodatkowej konfiguracji (np. modułów npm), połączymy cię z próbką kodu przed przedstawieniem kodu, na przykład

`this/will/be/the/link/to/the/code.ts`
```ts
// This will be the code under discussion
```

Z konfiguracją deweloperską, przejdźmy do składni TypeScript.
