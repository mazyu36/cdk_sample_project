import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { AppStack } from "../lib/appStack";

export function createTemplate(envName: string): Template {
  const app = new cdk.App();

  const stack = new AppStack(app, "Stack",
    {
      envName: envName
    });

  const template = Template.fromStack(stack);

  return template
}