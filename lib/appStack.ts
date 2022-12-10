import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import { VpcConstruct } from './constructs/vpcConstruct';

// StackPropsを拡張しAppからenvTypeを注入
interface AppStackProps extends StackProps {
  envType: string
}

export class AppStack extends Stack {
  constructor(scope: Construct, id: string, props: AppStackProps) {
    super(scope, id, props);

    // VPCを生成
    new VpcConstruct(this, 'VpcConstruct', {
      envType: props.envType
    })
  }
}
