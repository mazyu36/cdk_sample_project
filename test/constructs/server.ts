import { createTemplate } from "../createTemplate";

describe("server test prod", () => {

  test("EC2", () => {
    const template = createTemplate('stg')

    template.resourceCountIs('AWS::EC2::Instance', 1)

    template.hasResourceProperties("AWS::EC2::Instance", {
      "InstanceType": "t3.large",
    });
  }
  )

}
)


describe("server test stg", () => {

  test("EC2", () => {
    const template = createTemplate('stg')

    template.resourceCountIs('AWS::EC2::Instance', 1)

    template.hasResourceProperties("AWS::EC2::Instance", {
      "InstanceType": "t3.large",
    });
  }
  )

}
)