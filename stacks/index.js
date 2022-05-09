import MyStack from "./StorageStack";
import ApiStack from "./ApiStack";

export default function main(app) {
  const storageStack = new MyStack(app, "storage");

  new ApiStack(app, "api", {
    table: storageStack.table,
  });
}
