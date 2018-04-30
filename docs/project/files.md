## Which files?

You can either use `files` to be explicit:

```json
{
    "files":[
        "./some/file.ts"
    ]
}
```

or `include` and `exclude` to specify files / folders / globs. E.g.:


```json
{
    "include":[
        "./folder"
    ],
    "exclude":[
        "./folder/**/*.spec.ts",
        "./folder/someSubFolder"
    ]
}
```

Some notes:

* For globs : `**/*` (e.g. sample usage `somefolder/**/*`) means all folder and any files (the extensions `.ts`/`.tsx` will be assumed and if `allowJs:true` so will `.js`/`.jsx`)
