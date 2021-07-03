## 스테이트풀(Stateful) 함수
다른 프로그래밍 언어에 흔한 기능 중 하나는 `static` 키워드를 사용하여 함수 내 변수의 *생명* (*스코프* 아님)을 함수 호출 이후로 연장시키는 기능입니다. 여기 이런 일을 하는 `C` 예제가 있습니다:

```c
void called() {
    static count = 0;
    count++;
    printf("Called : %d", count);
}

int main () {
    called(); // Called : 1
    called(); // Called : 2
    return 0;
}
```

JavaScript (또는 TypeScript) 에는 함수 정적 변수가 없기 때문에 로컬 변수를 감싸는 여러가지 추상화를 이용하여 같은 일을 수행합니다. 예를 들어 `class` 를 사용하면:

```ts
const {called} = new class {
    count = 0;
    called = () => {
        this.count++;
        console.log(`Called : ${this.count}`);
    }
};

called(); // Called : 1
called(); // Called : 2
```

> C++ 개발자들도 그들이 `functor` (`()` 연산자를 오버라이딩한 클래스)라 부르는 패턴으로 동일한 일을 합니다.
