import { SSTConfig } from "sst"
import { Bucket, NextjsSite } from "sst/constructs"

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
      })

      stack.addOutputs({
        SiteUrl: site.url,
      })
    })
  },
} satisfies SSTConfig
