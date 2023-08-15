import { SSTConfig } from "sst"
import { Bucket, NextjsSite } from "sst/constructs"
import { Certificate } from "aws-cdk-lib/aws-certificatemanager"

export default {
  config() {
    return {
      name: "blog",
      region: "ap-southeast-1",
    }
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const bucket = new Bucket(stack, "assets")
      const site = new NextjsSite(stack, "site", {
        bind: [bucket],
        warm: 1,
        timeout: 60,
        customDomain: {
          isExternalDomain: true,
          domainName: stack.stage === "prod" ? "blog.toshimichi.net" : "blog-dev.toshimichi.net",
          cdk: {
            certificate: Certificate.fromCertificateArn(
              stack,
              "toshimichi-cert",
              "arn:aws:acm:us-east-1:581663711277:certificate/c39b8026-d3e4-47c9-9d58-3b5bad7a0781"
            ),
          },
        },
      })

      stack.addOutputs({
        SiteUrl: site.url,
      })
    })
  },
} satisfies SSTConfig
