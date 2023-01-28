import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { AppStack } from "../lib/appStack";

export function createTemplate(envType: string): Template {
  const app = new cdk.App();

  const stack = new AppStack(app, "Stack",
    {
      envType: envType
    });

  const template = Template.fromStack(stack);

  return template
}