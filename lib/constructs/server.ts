import { Construct } from 'constructs';
import { aws_ec2 as ec2 } from "aws-cdk-lib";

import { Network } from './network';
import { ServerConfig, createServerConfig } from '../config/serverConfig';

export interface ServerProps {
  envName: string
  network: Network
}

export class Server extends Construct {
  constructor(scope: Construct, id: string, props: ServerProps) {
    super(scope, id);

    // Constructの設定値を取得
    const serverConfig: ServerConfig = createServerConfig(props.envName)

    new ec2.Instance(this, "Instance", {
      vpc: props.network.vpc,
      vpcSubnets: props.network.vpc.selectSubnets({
        subnetGroupName: "Public",
      }),
      propagateTagsToVolumeOnCreation: true,
      instanceType: serverConfig.instanceType, // 環境により切替
      machineImage: new ec2.AmazonLinuxImage({ generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2 }),
      securityGroup: props.network.ec2SecurityGroup,
      ssmSessionPermissions: true
    });
  }
}