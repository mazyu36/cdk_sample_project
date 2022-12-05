import { Construct } from 'constructs';
import { aws_ec2 as ec2 } from "aws-cdk-lib";

import { Network } from './network';
import { ServerConfig, createServerConfig } from '../config/serverConfig';
import { NagSuppressions } from "cdk-nag";

export interface ServerProps {
  envName: string
  network: Network
}

export class Server extends Construct {
  constructor(scope: Construct, id: string, props: ServerProps) {
    super(scope, id);

    // Constructの設定値を取得
    const serverConfig: ServerConfig = createServerConfig(props.envName)

    const instance = new ec2.Instance(this, "Instance", {
      vpc: props.network.vpc,
      vpcSubnets: props.network.vpc.selectSubnets({
        subnetGroupName: "Public",
      }),
      propagateTagsToVolumeOnCreation: true,
      instanceType: serverConfig.instanceType, // 環境により切替
      machineImage: new ec2.AmazonLinuxImage({ generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2 }),
      ssmSessionPermissions: true
    });


    // cdk-nagの抑止
    NagSuppressions.addResourceSuppressions(instance,
      [
        { id: "AwsSolutions-IAM4", reason: "サンプルのためマネージドポリシーを使用" },
        { id: "AwsSolutions-EC26", reason: "サンプルのためEBS暗号化は未設定" },
        { id: "AwsSolutions-EC28", reason: "サンプルのため詳細モニタリングはオフ" },
        { id: "AwsSolutions-EC29", reason: "サンプルのため削除保護は無効" },
      ]
    )

    NagSuppressions.addResourceSuppressions(instance.role,
      [
        { id: "AwsSolutions-IAM4", reason: "サンプルのためマネージドポリシーを使用" },
      ]
    )
  }
}