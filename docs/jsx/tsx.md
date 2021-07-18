# JSX 지원

[![DesignTSX](https://raw.githubusercontent.com/basarat/typescript-book/master/images/designtsx-banner.png)](https://designtsx.com)

타입스크립트는 JSX 변환 및 코드 분석을 지원합니다. 만약 JSX가 익숙하지 않다면 [공식 웹 사이트](https://facebook.github.io/jsx/)에서 발췌한 내용이 있습니다.

> JSX는 정의된 의미가 없는 ECMAScript에 대한 XML과 유사한 구문 확장입니다. JSX는 브라우저나 엔진에서 실행하기 위한 것이 아닙니다. JSX를 ECMAScript 사양에 통합하자는 제안이 아닙니다. 다양한 전처리기에서 이러한 토큰을 표준 ECMAScript로 변환하는 데 사용됩니다.

JSX의 동기는 사용자가 자바스크립트에서 아래와 같은 HTML을 작성하여 수행할 수 있게 합니다.

-   자바스크립트를 확인할 코드와 동일한 코드로 view 타입을 검사합니다
-   view가 작동할 context를 인식하도록 합니다.(예: 기존 MVC에서 _controller-view_ 연결 강화).
-   HTML 유지보수를 위해 자바스크립트 패턴을 재사용하십시요. 새로운 (잘못된 유형의) 대안을 만드는 대신 `Array.prototype.map`, `?:`, `switch`.

이렇게 하면 오류 발생 가능성을 줄이고 사용자 인터페이스의 유지 관리 기능을 높일 수 있습니다. 이 시점에서 JSX의 주요 사용처는 [페이스북에서 만든 ReactJS]입니다.
이것이 우리가 여기서 논의할 JSX의 사용법입니다.
