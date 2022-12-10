import { aws_ec2 as ec2 } from "aws-cdk-lib";

import { Construct } from "constructs";
import { getVpcConstructConfig, VpcConstructConfig } from "../config/vpcConstructConfig";

export interface VpcConstructProps {
  envType: string
}
export class VpcConstruct extends Construct {

  constructor(scope: Construct, id: string, props: VpcConstructProps) {
    super(scope, id)

    // ----------------------- Config ------------------------------
    const vpcConfig: VpcConstructConfig = getVpcConstructConfig(props.envType)


    // ----------------------- VPC ------------------------------
    new ec2.Vpc(scope, 'Vpc', {
      ipAddresses: ec2.IpAddresses.cidr(vpcConfig.cidr), // 環境により切替
      maxAzs: vpcConfig.maxAzs,  // 環境により切替
      natGateways: 0,
      vpcName: `${props.envType}-vpc`
    }
    )


  }
}