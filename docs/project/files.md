## Which files?

Use `include` and `exclude` to specify files / folders / globs. E.g.:


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

### Globs

* For globs : `**/*` (e.g. sample usage `somefolder/**/*`) means all folder and any files (the extensions `.ts`/`.tsx` will be assumed and if `allowJs:true` so will `.js`/`.jsx`)

### `files` option
Alternatively, you can use `files` to be explicit: 

```json
{
    "files":[
        "./some/file.ts"
    ]
}
```

But it is not recommended as you have to keep updating it. Instead use `include` to just add the containing folder. 
