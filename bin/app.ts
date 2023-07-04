#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AppStack } from '../lib/appStack';
import { EnvConfig, getEnvConfig } from './config/envConfig';

const app = new cdk.App();

// contextからデプロイ対象の環境を取得
const envName = app.node.tryGetContext('env');

if (!envName)
  throw new Error(`Please specify environment with context option. ex) cdk deploy -c env=dev`);

// 対応する設定値を取得
const envConfig: EnvConfig = getEnvConfig(envName)

// Stackを作成
new AppStack(app, 'AppStack', {
  stackName: `${envName}-App-Stack`,
  env: envConfig,
  terminationProtection: false,
  envName: envName
})

// タグを付与
cdk.Tags.of(app).add('Environment', envName);