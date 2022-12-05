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


// prodのsnapshotテスト
test("snapshot test prod", () => {
  const template = createTemplate('prod')
  expect(template.toJSON()).toMatchSnapshot();
});