## Which files?

파일 / 폴더를 지정하려면 `include`와 `exclude`를 사용하십시요.

```json
{
    "include": ["./folder"],
    "exclude": ["./folder/**/*.spec.ts", "./folder/someSubFolder"]
}
```

### Globs

-   전체를 선택하려면 `**/*`을 사용해야 합니다. (예: `somefolder/**/*`) 이것의 의미는 모든 폴더 그리고 모든 파일을 의미합니다. (확장자 `.ts`/`.tsx`와 그리고 `allowJs:true`인 경우 `.js`/`.jsx`가 됩니다.)

### `files` option

다른 방법으로, 당신은 명시적으로 `files`를 사용할 수 있습니다:

```json
{
    "files": ["./some/file.ts"]
}
```

하지만 계속 업데이트 해야하므로 권장하지 않습니다. 대신에 `include`에 폴더를 추가해서 사용할 수 있습니다.
