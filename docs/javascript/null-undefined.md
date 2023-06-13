<div dir="rtl">

## Null و Undefined

> [در این مورد یه ویدیو روی یوتیوب هست که می‌تونید ببینید](https://www.youtube.com/watch?v=kaUfBNzuUAI)

جاوااسکریپت (و علاوه بر اون تایپ‌اسکریپت) دو تایپ مهم دارند که `null` و `undefined` هستند. این دو تایپ عمدا دوتا معنی متفاوت دارن درحالیکه جلوتر می‌بینیم که رفتار شبیه به هم دارن: 

* چیزی که هنوز به وجود نیومده : `undefined`.
* چیزی که الان دردسترس نیست: `null`.


### چطور چکشون کنیم؟

واقعیت اینه که ما به طور روزمره باید با هردوی این تایپ ها سروکله بزنیم. چیزی که جالبش میکنه اینه که عملگر `==` این دو تایپ رو باهم برابر میدونه اما حاصل مقایسه هرکدوم از این دو تایپ با مقادیر truthy یا falsy مقدار false  چیزی جز false نخواهد بود: 

```ts
// Both null and undefined are only `==` to themselves and each other:
console.log(null == null); // true (of course)
console.log(undefined == undefined); // true (of course)
console.log(null == undefined); // true


// You don't have to worry about falsy values making through this check
console.log(0 == undefined); // false
console.log('' == undefined); // false
console.log(false == undefined); // false
```
بهتره که برای چک کردن `undefined` یا `null‍‍‍` از ‍`== null` استفاده کنیم. معمولا نیازی نیست که بین این دوتا تفاوتی قائل بشیم.

```ts
function foo(arg: string | null | undefined) {
  if (arg != null) {
    // arg must be a string as `!=` rules out both null and undefined. 
  }
}
```

> البته میتونید از `== undefined` هم استفاده کنید, اما `== null` هم مرسوم‌تره و هم کوتاه‌تر.

فقط یه استثنا وجود داره, اونم مقادیر `undefined`ئی که در root level اتفاق میوفته که جلوتر بهش می‌رسیم.

### چطور  undefined ها را در root level چک کنیم؟

به خاطر دارید که گفتیم که بهتره از `== null` استفاده کنید؟ هنوزم هم همین رو میگیم اما باید بادتون باشه که برای مقادیر  root level هیچ وقت از ‍‍‍`== null` استفاده نکنید. در  حالت strict اگر از ‍`foo` استفاده کنید و `foo` مقدار undefined داشته باشه با خطای `ReferenceError` روبه‌رو می‌شید و کل stack از کار میوفته.

> شما باید از حالت strict استفاده کنید ... و در واقع اگر شما از modules استفاده کنید، کامپایلر TS اینکار رو برای شما می‌کنه ... البته الان لازم نیست خیلی نگران باشید جلوتر بیشتر بهش میپردازیم :)

بنابراین برای اینکه یک متغییر رو در *global* چگ کنیم که آیا تعریف شده یا نه بهتره که از `typeof` استفاده کنیم:

```ts
if (typeof someglobal !== 'undefined') {
  // someglobal is now safe to use
  console.log(someglobal);
}
```

### بعضی مواقع نمیتونید مستقیما از `undefined` استفاده کنید.

تایپ‌اسکریپت این موقعیت رو در اختیار شما میزاره که ساختار خودتون رو جدا از مقادیر مثل حالت زیر *مستند* کنید. در مثال زیر خروجی یک فانکشن میتونه عدد یا `undefined` باشه و تایپ اسکریپت براش یه راه حل داره: 

```ts
function foo(){
  // if Something
  return {a:1,b:2};
  // else
  return {a:1,b:undefined};
}
```
راه حل تایپ‌اسکریپت برای این مشکل که یه مقدار ممکنه عدد باشه یا undefined استفاده از `?` هست:
```ts
function foo():{a:number,b?:number}{
  // if Something
  return {a:1,b:2};
  // else
  return {a:1};
}
```

### Node style callbacks
در node و البته ورژن‌های قدیمی تر از جاوااسکریپت که در مرورگر هم اجرا می‌شد برای کارهای async از callback استفاده میکردیم و می‌کنیم. (به طور مثال `(err,somethingElse)=>{ /* something */ }`) در این فانکشن ها پارامتری مثل `err` داشتیم که ممکن بود مقدار داشته باشد و ممکن بود مقداری نداشته باشد و ما معمولا مجبور بودیم که در ابتدای فانکشن بودن و صحت مقدار آن را چک کنیم:

```ts
fs.readFile('someFile', 'utf8', (err,data) => {
  if (err) {
    // do something
  } else {
    // no error
  }
});
```
وقتی که شما در حال ساخت APIهای خودتان هستید مشکلی نیست که از null برای ثبات استفاده کنید. اما بهتر اینه که برای ساخت APIهای از promise استفاده کنید، در این حالت شما دیگه نیازی نیست نگران بودن و نبودن `err` باشید و این نوع مشکلات با `.then` و `.catch` هندل میشن.

### استفاده از `undefined` برای نشان دادن اعتبار استفاده نکنید.
به عنوان یک مثال، فانکشن مضخرف زیر رو در نظر بگیرید:

```ts
function toInt(str: string) {
  return str ? parseInt(str) : undefined;
}
```
که میتونه به مراتب بهتر به شکل زیر نوشته بشه:
```ts
function toInt(str: string): { valid: boolean, int?: number } {
  const int = parseInt(str);
  if (isNaN(int)) {
    return { valid: false };
  }
  else {
    return { valid: true, int };
  }
}
```

### JSON و serialization
یه json استاندارد برای رمزگذاری `null` مشکلی نداره اما زمان رمزگذاری `undefined` به مشکل میخوره. وقتی یه آبجکت که حاوی `null` هست رو تلاش میکنیم encode کنیم attribute حاوی مقدار `null` به همون شکل باقی می‌مونه ولی اگر اون attribute مقدار `undefined` داشته باشه توسط encoder حذف می‌شود.

```ts
JSON.stringify({willStay: null, willBeGone: undefined}); // {"willStay":null}
```
و در نتیجه، یک دیتابیس بر مبنای json میتونه از `null` پشتیبانی کنه ولی نمی تونه ‍‍`undefined` رو ساپورت کنه. با توجه به نکته ای که گفتیم شما میتونید تمام attribute ها با شرایطی که گفتیم رو قبل از رمزگذاری به `null` تبدیل کنید و بعد به remote store ارسال کنید. 
اینکه مقادیر رو به صورت undefined ذخیره کنید از نظر فضای ذخیره‌سازی و نحوه ارسالش ایجاد هزینه می‌کنه. و البته باعث میشه که مقادیر و بود و نبودشون دچار ابهام بشه.

### کلام آخر

تیم تایپ‌اسکریپت از `null` استفاده نمی‌کنند ([TypeScript coding guidelines](https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines#null-and-undefined)).نظر داگلاس کراکفورد  اینه که استفاده از `null` ایده خوبی نیست ([`null` is a bad idea](https://www.youtube.com/watch?v=PSGEjv3Tqo0&feature=youtu.be&t=9m21s)) و ما همواره باید از undefined استفاده کنیم.

با این حال کدبیس‌های مبتنی بر NodeJS از `null` به عنوان آرگومان خطا استفاده میکنند تا نشون بدن که ‍`یه چیزی در حال حاضر در دسترس نیست`. برای خود من خیلی فرقی بین این دوتا نیست و صرفا برای مقایسه از `== null` استفاده می‌کنم.

</div>