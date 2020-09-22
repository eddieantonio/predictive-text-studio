declare module "fake-indexeddb" {
  // Note: I copied this type from DexieOptions (see ./node_modules/dexie/dist/dexie.d.ts)
  const fakeIndexedDB: { open: Function }; // eslint-disable-line @typescript-eslint/ban-types
  export = fakeIndexedDB;
}
