#!/usr/bin / env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkCodePipelineStack } from '../pipeline/pipelineStack';
import { EnvConfig, getEnvConfig } from './config/envConfig';

const app = new cdk.App();

const envName = app.node.tryGetContext('env');

if (envName === undefined)
  throw new Error(`Please specify environment with context option. ex) cdk deploy -c env=dev`);

const envConfig: EnvConfig = getEnvConfig(envName)

new CdkCodePipelineStack(app, 'CDKPipelinesStack', {
  stackName: `${envName}-CDK-CodePipeline-Stack`,
  env: envConfig,
  terminationProtection: true,
  envName: envName
})

const envTagName = 'Environment';
cdk.Tags.of(app).add(envTagName, envName);