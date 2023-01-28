import { createTemplate } from "./createTemplate";


// devのsnapshotテスト
test("snapshot test dev", () => {
  const template = createTemplate('dev')
  expect(template.toJSON()).toMatchSnapshot();
});


// stgのsnapshotテスト
test("snapshot test stg", () => {
  const template = createTemplate('stg')
  expect(template.toJSON()).toMatchSnapshot();
});


// prdのsnapshotテスト
test("snapshot test prd", () => {
  const template = createTemplate('prd')
  expect(template.toJSON()).toMatchSnapshot();
});