- [TypeScript এর সূচনা](#typescript-এর-সূচনা)
  - [TypeScript ভার্সন](#typescript-ভার্সন)
  - [বইটির Source Code](#বইটির-source-code)

# TypeScript এর সূচনা

TypeScript, JavaScript এ transpile হয়. JavaScript ই প্রকৃত পক্ষে execute হয় (browser অথবা server এ). সুতরাং নিচের বিষয়গুলো প্রয়োজন হবে:

* TypeScript compiler (OSS ওপেন সোর্স সফটওয়্যার পাওয়া যাবে [সোর্স থেকে](https://github.com/Microsoft/TypeScript/) এবং [NPM](https://www.npmjs.com/package/typescript)) থেকে।
* A TypeScript editor (আপনি যেকোনো editor বেবহার করতে পারেন, তবে আমি [vscode](https://code.visualstudio.com/) ব্যাবহার করি. এছাড়া [অনেক IDE ও editor]( https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support) ভালো TypeScript সাপোর্ট দিয়ে থাকে)।


## TypeScript ভার্সন

আমরা TypeScript এর *stable* ব্যাবহার না করে *latest nighty* ভার্সন ব্যাবহার করব। এখানে অনেক latest features আছে যেগুলো *stable* ভার্সন এ এখনো সংযুক্ত হয় নি এবং এই বইটিতে এমন অনেক features এর ব্যাবহার রয়েছে.

আপনি কমান্ড লাইন থেকে নিম্নক্ত ভাবে TypeScript ইন্সটল করতে পারেন:

```
npm install -g typescript@next
```

এখন কমান্ড লাইন এ `tsc` কমান্ড পাওয়া যাবে. সাথে IDE সাপোর্ট ও পাওয়া যাবে।

* এই ফাইলটি এডিট করে *latest TypeScript* ভার্সন সেট করা যাবে. `.vscode/settings.json` ফাইল modify করে নিচের অংস টুকু বসাতে হবে:

```json
{
  "typescript.tsdk": "./node_modules/typescript/lib"
}
```

## বইটির Source Code
এই বইটির source code, এই github repository https://github.com/basarat/typescript-book/tree/master/code পাওয়া যাবে, আপনি এগুলি কপি করে vscode এ ব্যাবহার করতে পারেন. যে code samples গুলোর জন্য additional setup প্রয়োজন (যেমনঃ npm modules), সেগুলোর লিঙ্ক কোড স্নিপ্পেট এর সাথে দেয়া থাকবে। যেমনঃ

`this/will/be/the/link/to/the/code.ts`
```ts
// এই কোড ব্লক সম্পর্কে আলোচনা করা হচ্ছে।
```

যেহেতু setup নিয়ে আলোচনা করা হলো, এখন চলুন আমরা TypeScript এর syntax নিয়ে আলোচনা করি.
