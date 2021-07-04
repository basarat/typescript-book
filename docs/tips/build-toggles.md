## 빌드 토글

JavaScript 프로젝트에서는 실행 환경에 따라 달라지는 기능이 많습니다. 이런 일은 웹팩(Webpack)의 환경 변수에 따라 *죽은 코드 삭제하기* 기능을 이용하면 아주 쉽게 처리할 수 있습니다..

프로젝트의 `package.json` `scripts` 부분에 타겟 추가:

```json
"build:test": "webpack -p --config ./src/webpack.config.js",
"build:prod": "webpack -p --define process.env.NODE_ENV='\"production\"' --config ./src/webpack.config.js",
```

당연히 이전에 `npm install webpack --save-dev` 했다고 가정합니다. 이제 `npm run build:test` 식으로 사용할 수 있습니다.

이 변수를 사용하기는 매우 쉽습니다:

```ts
/**
 * `prod` 와 `test` 모두에 속성을 추가해야 된다는 것을 잊지 않기 위해 인터페이스 사용
 */
interface Config {
  someItem: string;
}

/**
 * config 하나만 익스포트함.
 */
export let config: Config;

/**
 * `process.env.NODE_ENV` 정의는 웹팩으로부터 넘어 옴
 *
 * 프로덕션 빌드에서 출력되는 JavaScript 에서는 `else` 블럭 전체가 삭제됨
 */
if (process.env.NODE_ENV === 'production') {
  config = {
    someItem: 'prod'
  }
  console.log('Running in prod');
} else {
  config = {
    someItem: 'test'
  }
  console.log('Running in test');
}
```

> 여기서 `process.env.NODE_ENV` 를 사용한 이유는 `React` 등 많은 JavaScript 라이브러리에서 이 변수를 사용하기 때문입니다.
