# Bakit TypeScript
May dalawang pangunahing layunin ang TypeScript:
* Magbigay ng *opsyonal na uri ng sistema* para sa JavaScript.
* Magbigay ng mga planadong katangian sa mga hinaharap na edisyon ng JavaScript at sa kasalukuyang mga engine ng JavaScript

Ang hangarin para sa mga layuning ito ay binibigyang-diin sa baba.

## Ang TypeScript na klase ng sistema

Marahil ikaw ay nagtataka "**Bakit magdadagdag ng mga uri sa JavaScript?**"

Ang mga uri ay mayroong napatunayang kakayahan na makaragdag sa kalidad ng code at sa pagkakaintindi. Ang malalaking mga organisasyon (Google, Microsoft, Facebook) ay patuloy na dumarating sa konklusyong ito. Partikular sa:

* Ang mga uri ay nagdadagdag ng iyong liksi habang nagre-refactor. *Mas nakabubuti para sa nagtatala na makahuli ng mga error kaysa makitang bumagsak ang mga bagay-bagay sa runtime*.
* Ang mga uri ay isa sa mga pinakamasuhay na anyo ng dokumentasyon na maaari mong makuha. *Ang lagda sa pag-andar ay isang teorama at ang katawan ng pag-andar ay ang pruweba*.

Gayunpaman ang mga uri ay may paraan ng pagiging makaseremonyal ng hindi kinakailangan. Ang TypeScript ay napaka-partikular sa pagpapanatili sa hadlang sa pagpasok ng mas mababa hangga't maaari. Narito kung paano:

### Ang Iyong JavaScript ay TypeScript
Ang TypeScript ay nagbibigay ng pagtala ng oras na klase ng seguridad para sa iyong JavaScript code. Hindi ito isang surpresa base sa pangalan nito. Ang maganda rito ay ang mga uri ay hindi talagang obligado. Ang iyong JavaScript code `.js` ay maaari mong pangalanan bilang isang `.ts` file at ang TypeScript ay bibigyan ka pa rin ng wastong `.js` na katumbas ng orihinal na JavaScript file. Ang TypeScript ay *intensyonal* at talagang superset ng JavaScript na may opsyonal na pagsuri sa uri.

### Ang Mga Uri ay maaaring may Ipahiwatig
Ang TypeScript ay susubukang magpahiwatig ng maraming uri ng impormasyon hangga't maari para ika'y mabigyan ng uri ng kaligtasan na may minimal na gastos sa pagiging produktibo habang binubuo ang code. Halimbawa, sa susunod na halimbawa, malalaman ng TypeScript na ang foo ay nasa uri ng `number` sa baba at magbibigay ng error sa pangalawang linya tulad ng pinapakita:

```ts
var foo = 123;
foo = '456'; // Error: cannot assign `string` to `number`

// Is foo a number or a string?
```
Ang ganitong uri ng panghihimasok ay binibigyang-diin. Kung ikaw ay gagawa ng bagay na pareho rito sa halimbawa, kung gayon, sa natitirang bahagi ng iyong code, hindi ka sigurado na ang `foo` ay isang `number` o isang `string`.  Ang mga naturang isyu ay kadalasang lumalabas sa mga malalaking base ng multi-file code. Bubusisiin natin ang ganitong uri ng tuntunin sa paghinuha mamaya.

### Ang Mga Uri ay maaaring maging Malinaw
Tulad ng nabanggit dati, ang TypeScript ay magpapahiwatig ng ligtas hangga't sa makakaya nito; gayunman, magagamit mo ang mga anotasyon sa:
1. Tumulong kasama ng tagatala, at ang mas mahalaga, idokumento ang mga bagay-bagay para sa susunod na tagabuo na magbabasa ng iyong code (maaaring ikaw iyon sa hinaharap!).
2. Ipatupad na kung ano ang nakikita ng tagatala, ay gayon din ang iyong iniisip na dapat nitong makita. Ito'y kung ang iyong pagkakaintindi sa code ay tumutugma sa isang algorithmic na pagsusuri ng code (ginawa ng tagatala).

Ang TypeScript ay gumagamit ng postfix na uri ng anotasyon na kilala sa ibang *opsyonal* na lenguahe ng anotasyon (e.g. ActioScript and F#).

```ts
var foo: number = 123;
```
Kaya kung ikaw ay gagawa ng anumang kamalian ang tagatala ay magpapakita ng error, hal.:

```ts
var foo: number = '123'; // Error: cannot assign a `string` to a `number`
```

Ating talakayin ang lahat ng detalye ng lahat ng mga syntax ng anotasyon na sinusuportahan ng TypeScript sa mga susunod na kabanata.

### Ang Mga Uri ay Estruktural
Sa ibang mga lenguahe (partikular sa mga uring nominal) ang resulta ng statik na pag-type ay hindi kinakailangang paraan dahil kahit na *alam mo* na ang code ay gagana ng maayos ang mga semantiko ng lenguahe ay pipilitin ka na kopyahin ang mga bagay-bagay sa palibot. Ito ang dahil kung kaya't ang mga bagay tulad ng [automapper for C#](http://automapper.org/) ay *mahalaga* para sa C#. Sa TypeScript, dahil gusto naming maging madali ito para sa mga tagabuo ng JavaScript at may minimal na pag-iisip ng labis, ang mga uri ay *estruktural*. Ibig sabihin nito ang *duck typing* ay isang pangunahing uri ng pagbuo ng lenguahe. Tingnan ang susunod na halimbawa. Ang punsyon na `iTakePoint2D` ay tatanggap ng kahit ano na naglalaman ng lahat ng (`x` and `y`) na inaasahan nito:

```ts
interface Point2D {
    x: number;
    y: number;
}
interface Point3D {
    x: number;
    y: number;
    z: number;
}
var point2D: Point2D = { x: 0, y: 10 }
var point3D: Point3D = { x: 0, y: 10, z: 20 }
function iTakePoint2D(point: Point2D) { /* do something */ }

iTakePoint2D(point2D); // exact match okay
iTakePoint2D(point3D); // extra information okay
iTakePoint2D({ x: 0 }); // Error: missing information `y`
```

### Ang mga Type error ay hindi pinipigilan ang paglabas ng JavaScript
Para padaliin ang paglipat mo ng iyong JavaScript code sa TypeScript, kahit na may mga error sa pagtitipon, bilang default ang TypeScript *ay maglalabas ng wastong JavaScript* sa lubos na makakaya nito, hal.

```ts
var foo = 123;
foo = '456'; // Error: cannot assign a `string` to a `number`
```

ay maglalabas ng sumusunod na js:

```ts
var foo = 123;
foo = '456';
```

Para dahan-dahan mong ma-upgrade ang iyong JavaScript code sa TypeScript. Ito ay ibang-iba sa kung paano magtrabaho ang mga tagatala ng ibang lenguahe at isa pang dagdag na rason para lumipat na sa TypeScript.

### Ang Mga Uri ay may kakayahang Pumaligid
Isa sa mga pangunahing layunin ng TypeScript ay gawing posible para sa iyo na ligtas at madaling magamit ang kasalukuyang umiiral na librerya ng JavaScript sa TypeScript. Ginagawa ito ng TypeScript sa pamamaraan ng *deklarasyon*. Binibigyan ka ng TypeScript ng reglador na ritmiko sa kung gaano karami or kakaunting pagsisikap ang gugustuhin mong ibigay sa iyong mga deklarasyon, kung mas mataas ang pagsisikap mo, mas mataas ang seguridad sa uri + kaalaman sa code na makukuha mo. Tandaan na ang mga depinisyon para sa karamihan ng mga tanyag na libreryo ng JavaScript ay naitala na para sa iyo ng [DefinitelyTyped community](https://github.com/borisyankov/DefinitelyTyped) kaya para sa karamihan ng mga layunin, maaring:

1. Ang depinisyon ng file ay umiiral na.
2. O kahit man lamang ikaw ay may mahabang listahan ng mga nasuri ng mabuti na deklarasyon ng TypeScript template na makikita na

Isang simpleng halimbawa kung papaano ka makapagsulat ng sarili mong file ng deklarasyon: isipin ang isang maliit na halimbawa ng [jquery](https://jquery.com/). Bilang default (tulad ng inaasahan sa isang mabuting JS code) ang TypeScript ay inaasahan kang ideklara (tulad ng gamitin ang `var` sa kung saan) bago ka gumamit ng variable
```ts
$('.awesome').show(); // Error: cannot find name `$`
```
Bilang mabilis na pag-aayos *masasabihan mo ang TypeScript* na talagang mayroong bagay na tinatawag na `$`:
```ts
declare var $: any;
$('.awesome').show(); // Okay!
```
Kung gusto mo, maaari kang magbuo sa pangunahing kahulugang ito at magbigay ng karagdagang impormasyon para tumulong na maprotektahan ka sa mga error:
```ts
declare var $: {
    (selector:string): any;
};
$('.awesome').show(); // Okay!
$(123).show(); // Error: selector needs to be a string
```

Ating talakayin ang mga detalye ng paglikha ng mga depinisyon ng TypeScript para sa umiiral na na JavaScript ng mas detalyado maya-maya kung mas marami ka ng nalalaman tungkol sa TypeScript (hal. mga bagay tulad ng `interface` at `any`).

## Ang Panghinaharap na JavaScript => Ngayon
Ang TypeScript ay nagbibigay ng iba't ibang katangian na planado sa ES6 para sa kasalukuyang mga JavaScript na engine (na nagsusuporta lamang ng ES5 atbp.). Ang mga bumubuo sa TypeScript ay patuloy na nagdadagdag ng mga katangiang ito at ang listahang ito ay lalago lamang sa paglipas ng panahon at atin itong tatalakayin sa sarili nitong bahagi. 
TypeScript provides a number of features that are planned in ES6 for current JavaScript engines (that only support ES5 etc). The typescript team is actively adding these features and this list is only going to get bigger over time and we will cover this in its own section. Ngunit para lamang may ispesimen, narito ang halimbawa ng isang klase:

```ts
class Point {
    constructor(public x: number, public y: number) {
    }
    add(point: Point) {
        return new Point(this.x + point.x, this.y + point.y);
    }
}

var p1 = new Point(0, 10);
var p2 = new Point(10, 20);
var p3 = p1.add(p2); // { x: 10, y: 30 }
```

and the lovely fat arrow function:

```ts
var inc = x => x+1;
```

### Buod
Sa seksyong ito, aming naibahagi sa inyo ang pagganyak at mga layunin sa disenyo ng TypeScript. At dahil naibahagi na ito, maaari na nating suungin ang mas maliliit na detalye ng TypeScript.

[](Ang mga interfaces ay natapos ng bukas)
[](I-type ang panuntunan ng mga imperensiya)
[](Takpan ang lahat ng mga anotasyon)
[](Takpan ang lahat ng mga umaaligid : wala ring nagpapatupad ng runtime)
[](.ts vs. .d.ts)
