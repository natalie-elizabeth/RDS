import cdk = require("@aws-cdk/core");
import ec2 = require("@aws-cdk/aws-ec2");

export class DBTestVPCStack extends cdk.Stack {

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const vpc = new ec2.Vpc(this, "DBTestVPC", {
      // 10.0.0.0 - 10.0.255.255
      cidr: "10.0.0.0/16",
      maxAzs: 3
    });
  }
}