import { CodeLoader } from "@/components/CodeLoader";
import { CodeViewer } from "@/components/CodeViewer";
import { withLocalStorage } from "./lib";

// Пример с объектом
const userPersist = withLocalStorage<{ name: string; age: number }>({
  key: "user",
  version: 1,
  toSnapshot: (state) => ({
    name: state.name.toUpperCase(),
    age: state.age,
  }),
  fromSnapshot: (snapshot) => ({
    name: snapshot.name.toLowerCase(),
    age: snapshot.age,
  }),
  migration: (record, currentVersion) => {
    let data = record.snapshot;

    // v1 -> v2: добавить поле
    if (currentVersion === 1) {
      data = { ...data, age: 33 };
    }

    return data;
  },
});

userPersist.save({ name: "John", age: 25 });
console.log(userPersist.load()); // { name: 'john', age: 25 }

// Пример с миграцией через несколько версий
const settingsPersist = withLocalStorage({
  key: "settings",
  version: 3,
  migration: (record, currentVersion) => {
    let data = record.snapshot;

    // v1 -> v2: добавить поле
    if (currentVersion === 1) {
      data = { ...data, theme: "light" };
    }

    // v2 -> v3: переименовать поле
    if (currentVersion <= 2) {
      data = { ...data, darkMode: data.theme === "dark" };
      delete data.theme;
    }

    return data;
  },
});

settingsPersist.save({ notifications: true, darkMode: false });
console.log(settingsPersist.load());

export const StorageApp = () => {
  return (
    <div>
      <CodeLoader component="storage" />
    </div>
  );
};

function setState<TState>(newState: TState, callback: (state: TState) => void) {
  callback(newState); // Проблема в типе callback!
}
