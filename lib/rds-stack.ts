import cdk = require('@aws-cdk/core');
import ec2 = require('@aws-cdk/aws-ec2');
import rds = require('@aws-cdk/aws-rds');

// RDSSTackProps interface inherits from cdk.StackProps
interface RDSStackProps extends cdk.StackProps {
  vpc: ec2.IVpc;
}
export class RdsStack extends cdk.Stack {
  private vpc: ec2.IVpc;
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {

    super(scope, id, props);

    // Context settings
    const masterUsername = this.node.tryGetContext("rds.masterUsername");
    const databaseName = this.node.tryGetContext("rds.databaseName");
    const dbInstanceIdentifier = this.node.tryGetContext("rds.dbInstanceIdentifier");
    const availabilityZone = this.node.tryGetContext("rds.availabilityZone");
    const backupRetentionPeriod = this.node.tryGetContext("rds.backupRentionPeriod");
    const storageEncrypted = this.node.tryGetContext("rds.storageEncrypted");
    const autoMinorVersionUpgrade = this.node.tryGetContext("rds.autoMinorVersionUpgrade");
    const monitoringInterval = this.node.tryGetContext("rds.monitoringInterval");

    if (props)
      this.vpc = props.vpc;
    else
      this.vpc = ec2.Vpc.fromLookup(this, "DBTestVPC", {
        vpcName: "DBTestVPCStack/DBTestVPC"
    });

    const instance = new rds.DatabaseInstance(this, "RDSInstance", {
      instanceIdentifier: dbInstanceIdentifier,
      masterUsername: masterUsername,
      databaseName: databaseName,
      availabilityZone: availabilityZone,
      autoMinorVersionUpgrade: autoMinorVersionUpgrade,
      storageEncrypted: storageEncrypted,
      storageType: rds.StorageType.IO1,
      instanceClass: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE2, ec2.InstanceSize.SMALL),
      monitoringInterval: monitoringInterval,
      engine: rds.DatabaseInstanceEngine.MARIADB

    })
  }
}
