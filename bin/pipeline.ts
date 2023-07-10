#!/usr/bin / env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkCodePipelineStack } from '../pipeline/pipelineStack';

const app = new cdk.App();


new CdkCodePipelineStack(app, 'CDKPipelinesStack', {
  stackName: `CDK-CodePipeline-Stack`,
  env: {
    account: '024532196973',
    region: 'ap-northeast-1'
  },
  terminationProtection: false,
})
