import { App, Stack, CfnParameter } from '@aws-cdk/core';
import { DatabaseInstance, DatabaseInstanceEngine } from '@aws-cdk/aws-rds';
import { Vpc, SubnetType } from '@aws-cdk/aws-ec2';


const app = new App();

const stack = new Stack(app, 'sample-rds', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
});

const dbPort = new CfnParameter(stack, 'DBPort', {
  type: 'Number',
  default: 5432
})

const vpc = Vpc.fromLookup(stack, 'Vpc', {
  isDefault: true
})

const postgresDb = new DatabaseInstance(stack, 'PostgresDb', {
  port: dbPort.valueAsNumber,
  vpc,
  engine: DatabaseInstanceEngine.POSTGRES,
  vpcSubnets: {
    subnetType: SubnetType.PUBLIC
  }
})
