import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Network } from './constructs/network';
import { Server } from './constructs/server';


// AppからenvNameを引き継ぎ
interface AppStackProps extends StackProps {
  envName: string
}

export class AppStack extends Stack {
  constructor(scope: Construct, id: string, props: AppStackProps) {
    super(scope, id, props);

    const network = new Network(this, 'Network', {
      envName: props.envName
    })

    new Server(this, 'Server', {
      envName: props.envName,
      network: network
    })
  }
}
