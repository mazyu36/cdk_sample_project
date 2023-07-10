import { Construct } from "constructs";
import { aws_ec2 as ec2 } from "aws-cdk-lib";

import { createNetworkConfig, NetworkConfig } from "../config/networkConfig";

export interface NetworkProps {
  envName: string
}


export class Network extends Construct {
  public readonly vpc: ec2.Vpc
  public readonly ec2SecurityGroup: ec2.SecurityGroup

  constructor(scope: Construct, id: string, props: NetworkProps) {
    super(scope, id)

    // Constructの設定値を取得
    const networkConfig: NetworkConfig = createNetworkConfig(props.envName)

    const vpc = new ec2.Vpc(this, 'Vpc', {
      ipAddresses: ec2.IpAddresses.cidr(networkConfig.cidr), // 環境により切替
      maxAzs: networkConfig.maxAzs,  // 環境により切替
      natGateways: 0,
      vpcName: `${props.envName}-vpc`
    }
    )
    this.vpc = vpc


    const sg = new ec2.SecurityGroup(this, 'EC2Sg', {
      vpc: vpc,
      allowAllOutbound: false,
    })
    sg.addEgressRule(ec2.Peer.anyIpv4(), ec2.Port.allTcp())

    this.ec2SecurityGroup = sg
  }
}