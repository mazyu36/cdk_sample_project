import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { AppStack } from "../lib/appStack";


// devのsnapshotテスト
test("snapshot test dev", () => {
  const app = new cdk.App();

  const stack = new AppStack(app, "Stack",
    {
      envType: 'dev'
    });

  const template = Template.fromStack(stack).toJSON();
  expect(template).toMatchSnapshot();
});


// stgのsnapshotテスト
test("snapshot test stg", () => {
  const app = new cdk.App();

  const stack = new AppStack(app, "Stack",
    {
      envType: 'stg'
    });

  const template = Template.fromStack(stack).toJSON();
  expect(template).toMatchSnapshot();
});


// prdのsnapshotテスト
test("snapshot test prd", () => {
  const app = new cdk.App();

  const stack = new AppStack(app, "Stack",
    {
      envType: 'prd'
    });

  const template = Template.fromStack(stack).toJSON();
  expect(template).toMatchSnapshot();
});