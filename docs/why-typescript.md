<div dir="auto">

# چرا تایپ اسکریپت؟
تایپ اسکریپت دو هدف اصلی رو دنبال می‌کند:
* ارائه‌ی *optional type system* برای جاوا اسکریپت.
* ارائه فیچرهایی که برای ورژن های آینده جاوااسکریپت قرار هست که ارائه بشه اما روی engine فعلی 

اما انگیزه پشت این دوهدف رو باید مورد بررسی قرار بدیم.

## The TypeScript type system

ممکن است برای شما این سوال پیش بیاید که "**چرا باید به جاوااسکریپت تایپ اضافه کرد؟**"

ثابت شده است که تایپ‌ها باعث افزایش کیفیت کد و خوانایی آن میشوند. تیم های بزرگ (مثل گوگل و مایکروسافت و فیس‌بوک) به طور مداوم به این نتیجه رسیده‌اند. مخصوصا:

* تایپ‌ها چابکی شما در هنگام ریفکتور را افزایش می‌دهند
*بهتر است که کامپایلر خطاها را تشخیص دهد (error catching)  تا اینکه در زمان اجرا (runtime)  چیزهایی خراب باشند (به نوعی باگ داشته باشند)*
* تایپ‌ها یکی از بهترین فرم‌ها برای مستند کردن آن چیزی است که شما در اختیار دارید.
 *اسم تابع مثل عنوان یک قضیه است و بدنه آن اثبات آن قضیه*

با این حال، اقزودن تایپ به کد جاوااسکریپت همیشه یک کار اضافه به نظر می‌آید. تایپ اسکریپت به صورت به خصوصی تلاش دارد که این کار اضاقه با کمترین مشکل انجام شود. اما چطور:

### کد جاوااسکریپت شما همین الان تایپ‌اسکریپت هم هست

تایپ‌اسکریپت صرفا در زمان اجرا یک  type safety به کد شما اضافه میکند. برای داشتن این type safety check شما کافیست که پسوند ‍`.js` در انتهای فایل خود را به `.ts` تغییر دهید و کامپایلر تایپ‌اسکریپت کماکان یک فایل `.js` معتبر که معادل فایل اصلی شما است، به شما تحویل می‌دهد. فراموش نکنیم که تایپ‌اسکریپت یک superset روی جاوااسکریپت است که یک optional type checking در اختیار شما می‌گذارد نه هیچ چیز دیگری.


### تایپ‌ها می‌توانند به صورت ضمنی تعریف شوند
تایپ‌اسکریپت همواره تلاش میکند تا جایی که میتواند اطلاعات مربوط به تایپ را استخراج کند تا به کمک آن بتواند type safety را با کمترین هزینه یا تاثیر بر بهره‌وری در زمان توسعه نرم‌افزار ارائه دهد. به طور مثال، در مثال زیر تایپ‌اسکریپت می‌داند که متغییر foo از نوع `number`  خواهد بود و برای خط دوم همان‌طور که می‌بینید خطا نشان خواهد داد:


```ts
var foo = 123;
foo = '456'; // Error: cannot assign `string` to `number`

// Is foo a number or a string?
```
اگر شما کارهایی از این دست که در مثال بالا نشان داده شد را انجام بدهید در بقیه کدها نمیتوانید مطمئن باشید که `foo` یک `number` است یا یک `string`. این‌گونه مشکلات معمولا در کدهایی رخ می‌دهد که از چندین فایل تشکیل شده‌اند. ما بعدا قوانین مربوط به استخراج تایپ(type inference) را به طور کامل مورد بررسی قرار می‌دهیم.

### تایپ‌ها می‌توانند به طور غیرضمنی تعریف شوند
همانطور که اشاره کردیم، تایپ اسکریپت به اندازه‌ای که type safety به خوبی کار کند، میتواند تایپ‌ها را به صورت خودکار تشخیص بدهد. با این‌حال شما می‌توانید از annotations استفاده کنید تا:

1. در کنار اینکه به کامپایلر کمک می‌کنید که تایپ ها را بهتر تشخیص بدهد، کدهای خود را برای دوولوپر بعدی (که ممکن است خود شما باشید) مستند می‌کنید.

2. annotation را اعمال می‌کنید تا کامپایلر همان‌چیزی را ببیند که شما فکر میکنید باید ببیند. این یعنی درک شما از کد با تحلیل الگوریتمی کد (انجام شده توسط کامپایلر) مطابقت دارد.

تایپ اسکریپت همانند دیگر زبانهایی که تعریف تایپ *optional* دارند(مثل actionScript و F#) از مدل postfix یا پسوندی استفاده می‌کند. یعنی بعد از تعریف متغییر تایپ آن را مشخص میکند.

```ts
var foo: number = 123; // foo value must be a number
```
حال اگر شما تغییر اشتباهی در مقدار متغییر انجام بدهید کامپایلر خطا گزراش خواهد کرد

```ts
var foo: number = '123'; // Error: cannot assign a `string` to a `number`
```
در فصل‌های بعدی در مورد تمام annotation هایی که تایپ‌اسکریپت پشتیبانی میکند با جزئیات صحبت خواهیم کرد

### Types are structural
In some languages (specifically nominally typed ones) static typing results in unnecessary ceremony because even though *you know* that the code will work fine the language semantics force you to copy stuff around. This is why stuff like [automapper for C#](http://automapper.org/) is *vital* for C#. In TypeScript because we really want it to be easy for JavaScript developers with a minimum cognitive overload, types are *structural*. This means that *duck typing* is a first class language construct. Consider the following example. The function `iTakePoint2D` will accept anything that contains all the things (`x` and `y`) it expects:

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

### Type errors do not prevent JavaScript emit
To make it easy for you to migrate your JavaScript code to TypeScript, even if there are compilation errors, by default TypeScript *will emit valid JavaScript* the best that it can. e.g.

```ts
var foo = 123;
foo = '456'; // Error: cannot assign a `string` to a `number`
```

will emit the following js:

```ts
var foo = 123;
foo = '456';
```

So you can incrementally upgrade your JavaScript code to TypeScript. This is very different from how many other language compilers work and yet another reason to move to TypeScript.

### Types can be ambient
A major design goal of TypeScript was to make it possible for you to safely and easily use existing JavaScript libraries in TypeScript. TypeScript does this by means of *declaration*. TypeScript provides you with a sliding scale of how much or how little effort you want to put in your declarations, the more effort you put the more type safety + code intelligence you get. Note that definitions for most of the popular JavaScript libraries have already been written for you by the [DefinitelyTyped community](https://github.com/borisyankov/DefinitelyTyped) so for most purposes either:

1. The definition file already exists.
1. Or at the very least, you have a vast list of well reviewed TypeScript declaration templates already available

As a quick example of how you would author your own declaration file, consider a trivial example of [jquery](https://jquery.com/). By default (as is to be expected of good JS code) TypeScript expects you to declare (i.e. use `var` somewhere) before you use a variable
```ts
$('.awesome').show(); // Error: cannot find name `$`
```
As a quick fix *you can tell TypeScript* that there is indeed something called `$`:
```ts
declare var $: any;
$('.awesome').show(); // Okay!
```
If you want you can build on this basic definition and provide more information to help protect you from errors:
```ts
declare var $: {
    (selector:string): any;
};
$('.awesome').show(); // Okay!
$(123).show(); // Error: selector needs to be a string
```

We will discuss the details of creating TypeScript definitions for existing JavaScript in detail later once you know more about TypeScript (e.g. stuff like `interface` and the `any`).

## Future JavaScript => Now
TypeScript provides a number of features that are planned in ES6 for current JavaScript engines (that only support ES5 etc). The TypeScript team is actively adding these features and this list is only going to get bigger over time and we will cover this in its own section. But just as a specimen here is an example of a class:

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

### Summary
In this section we have provided you with the motivation and design goals of TypeScript. With this out of the way we can dig into the nitty gritty details of TypeScript.

[](Interfaces are open ended)
[](Type Inference rules)
[](Cover all the annotations)
[](Cover all ambients : also that there are no runtime enforcement)
[](.ts vs. .d.ts)





</div>