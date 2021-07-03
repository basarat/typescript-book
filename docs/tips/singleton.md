# 싱글톤(Singleton) 패턴

일반적인 싱글톤 패턴은 사실은 모든 코드는 `class` 내에 존재해야 한다는 사실을 회피하기 위한 것들일 뿐입니다.

```ts
class Singleton {
    private static instance: Singleton;
    private constructor() {
        // 생성자 작업
    }
    static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
            // ... 기타 1회성 초기화 작업 ...
        }
        return Singleton.instance;
    }
    someMethod() { }
}

let something = new Singleton() // 오류: 'Singleton' 생성자는 private 임.

let instance = Singleton.getInstance() // 인스턴스를 받아서 작업 수행...
```

하지만 지연된 초기화가 필요하지 않다면 그냥 `namespace` 를 사용하면 됩니다: 

```ts
namespace Singleton {
    // ... 기타 1회성 초기화 작업 ...
    export function someMethod() { }
}
// 사용
Singleton.someMethod();
```

> 경고 : 싱글톤은 [전역 변수](http://stackoverflow.com/a/142450/390330)를 부르는 다른 이름일 뿐입니다

대부분의 프로젝트에서는 `namespace` 조차도 *모듈* 로 대체될 수 있습니다.

```ts
// someFile.ts
// ... 기타 1회성 초기화 작업 ...
export function someMethod() { }

// 사용
import {someMethod} from "./someFile";
```


