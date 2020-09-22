declare module "fake-indexeddb/lib/FDBKeyRange" {
  // Note: I copied this type from DexieOptions (see ./node_modules/dexie/dist/dexie.d.ts)
  const FDBKeyRange: { bound: Function; lowerBound: Function; upperBound: Function; };
  export = FDBKeyRange;
}
