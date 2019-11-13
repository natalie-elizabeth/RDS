import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');
import Rds = require('../lib/rds-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Rds.RdsStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});