#!/usr/bin/env node
import 'source-map-support/register';
import { AppStack } from '../lib/appStack';
import * as cdk from 'aws-cdk-lib';
import { EnvConfig, createEnvConfig } from './config/envConfig';
import { Aspects } from 'aws-cdk-lib';
import { AwsSolutionsChecks } from 'cdk-nag';

const app = new cdk.App();

// contextからデプロイ対象の環境を取得
const envName = app.node.tryGetContext('env');

// 対応する設定値を取得
const envConfig: EnvConfig = createEnvConfig(envName)

const appStack = new AppStack(app, `${envName}AppStack`, {
  stackName: `${envName}AppStack`,
  env: envConfig,
  terminationProtection: false,
  envName: envName
})

// タグを付与
cdk.Tags.of(appStack).add('Environment', envName);

// cdk-nag の有効化
Aspects.of(app).add(new AwsSolutionsChecks({ verbose: true }));


