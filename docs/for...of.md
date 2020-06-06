### for...of
Częstym błędem napotykanym przez początkujących programistów JavaScript jest to, że `for...in` dla tablicy nie przechodzi przez elementy tablicy. Zamiast tego iteruje *klucze* przekazywanego obiektu. Jest to pokazane w poniższym przykładzie. Tutaj możesz się spodziewać `9,2,5` ale dostajesz indeksy `0,1,2`:

```ts
var someArray = [9, 2, 5];
for (var item in someArray) {
    console.log(item); // 0,1,2
}
```

To jeden z powodów tego czemu `for...of` istnieje w TypeScript (i ES6). Poniższe elementy iterują tablicę, poprawnie wypisując już zgodnie z oczekiwaniami:

```ts
var someArray = [9, 2, 5];
for (var item of someArray) {
    console.log(item); // 9,2,5
}
```

Podobnie TypeScript nie ma problemu z przejściem po ciągu znaków po znaku przy użyciu `for...of`:

```ts
var hello = "is it me you're looking for?";
for (var char of hello) {
    console.log(char); // is it me you're looking for?
}
```

#### Generacja JS
Dla celów wcześniejszych niż ES6, TypeScript wygeneruje standardowy `for (var i = 0; i < list.length; i++)` rodzaj pętli. Na przykład oto, co zostanie wygenerowane dla naszego poprzedniego przykładu:
```ts
var someArray = [9, 2, 5];
for (var item of someArray) {
    console.log(item);
}

// becomes //

for (var _i = 0; _i < someArray.length; _i++) {
    var item = someArray[_i];
    console.log(item);
}
```
Możesz zobaczyć, że używając `for...of` sprawia, że *zamiar* jest wyraźniejszy, a także zmniejsza ilość kodu, który musisz napisać (i nazwy zmiennych, które musisz wymyślić).

#### Ograniczenia
Jeśli nie celujesz w ES6 lub wyżej, wygenerowany kod zakłada, że właściwość `length` istnieje na obiekcie i że obiekt może być indeksowany za pomocą liczb, np. `obj [2]`. Jest więc obsługiwany tylko w ciągach `string` i `array` dla tych starszych silników JS.

Jeśli TypeScript może zobaczyć, że nie używasz tablicy ani łańcucha, da ci to wyraźny błąd *”nie jest typem tablicy ani stringiem"*;
```ts
let articleParagraphs = document.querySelectorAll("article > p");
// Error: Nodelist is not an array type or a string type
for (let paragraph of articleParagraphs) {
    paragraph.classList.add("read");
}
```

Użyj `for...of` tylko dla rzeczy, o których *wiesz*, że są tablicą lub łańcuchem znaków. Pamiętaj, że to ograniczenie może zostać usunięte w przyszłej wersji TypeScript.

#### Podsumowanie
Byłbyś zaskoczony, ile razy będziesz powtarzał elementy tablicy. Następnym razem, gdy to zrobisz, skorzystaj z `for...of`. Możesz po prostu uszczęśliwić następną osobę, która będzie przeglądać twój kod.
