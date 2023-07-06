import { createTemplate } from "../createTemplate";

describe("network test prod", () => {

  test("VPC", () => {
    const template = createTemplate('prod')

    template.resourceCountIs('AWS::EC2::VPC', 1)

    template.hasResourceProperties("AWS::EC2::VPC", {
      "CidrBlock": "10.2.0.0/16",
      "EnableDnsHostnames": true,
      "EnableDnsSupport": true,
    });
  }
  )

  test("NatGateway", () => {
    const template = createTemplate('prod')

    template.resourceCountIs('AWS::EC2::NatGateway', 0)
  }
  )
}
)


describe("network test stg", () => {

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
    const template = createTemplate('prod')

    template.resourceCountIs('AWS::EC2::NatGateway', 0)
  }
  )
}
)