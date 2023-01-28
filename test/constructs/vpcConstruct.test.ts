import { Capture, Match, Template } from "aws-cdk-lib/assertions";
import * as cdk from "aws-cdk-lib";
import * as sns from "aws-cdk-lib/aws-sns";
import { createTemplate } from "../createTemplate";

describe("vpcConstruct test prd", () => {

  test("VPC", () => {
    const template = createTemplate('prd')

    template.resourceCountIs('AWS::EC2::VPC', 1)

    template.hasResourceProperties("AWS::EC2::VPC", {
      "CidrBlock": "10.2.0.0/16",
      "EnableDnsHostnames": true,
      "EnableDnsSupport": true,
    });
  }
  )

  test("NatGateway", () => {
    const template = createTemplate('prd')

    template.resourceCountIs('AWS::EC2::NatGateway', 0)
  }
  )
}
)


describe("vpcConstruct test stg", () => {

  test("VPC", () => {
    const template = createTemplate('stg')

    template.resourceCountIs('AWS::EC2::VPC', 1)

    template.hasResourceProperties("AWS::EC2::VPC", {
      "CidrBlock": "10.1.0.0/16",
      "EnableDnsHostnames": true,
      "EnableDnsSupport": true,
    });
  }
  )

  test("NatGateway", () => {
    const template = createTemplate('prd')

    template.resourceCountIs('AWS::EC2::NatGateway', 0)
  }
  )
}
)