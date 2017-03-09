## Promise Safety
The following code doesn't error by default: 

```ts
declare let both: Promise<{ type: string, value: string; }>;
declare let valueOnly: Promise<{ value: string }>;
declare let typeOnly: Promise<{ type: string }>;
declare let empty: Promise<{}>;

// Why no error?
both = valueOnly;
both = typeOnly;
both = empty;
```

This is because `Promise<T>` doesn't use the type `T` as a member and only in functions. The function type compatability rules allow the promise's to be compatible in this case. 

### Fix 

You can add the following to increase `Promise` type safety (do it globally): 

```ts
interface Promise<T>{
  _ensureTypeSafety: T;
}
```

And now the following errors: 

```ts
declare let both: Promise<{ type: string, value: string; }>;
declare let valueOnly: Promise<{ value: string }>;
declare let typeOnly: Promise<{ type: string }>;
declare let empty: Promise<{}>;

// Error!
both = valueOnly; // property type is missing
both = typeOnly; // property value is missing
both = empty; // property missing
```
