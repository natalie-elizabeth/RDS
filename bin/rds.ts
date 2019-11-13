#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { RdsStack } from '../lib/rds-stack';
import { DBTestVPCStack } from '../lib/vpc-stack';

const app = new cdk.App();
const app_env = {
  region: "us-east-1",
  account: "488823795428"
}

new RdsStack(app, 'RdsStack', {
  env: app_env
});

new DBTestVPCStack(app, 'DBTestVPCStack', {
  env: app_env
})