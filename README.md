# AWS Rekognition Demo 

This project is a demonstration of how you can easily use AWS Rekogntition for content moderation in your React Web App. In this example, the Web App is granted AWS access through [AWS Amplify](https://aws.amazon.com/amplify/getting-started/). The [AWS Rekogntition](https://aws.amazon.com/rekognition/) service is used through the [aws-sdk node package](https://www.npmjs.com/package/aws-sdk).

## How to run

You'll need an AWS profile and programmatic access to your account from your local machine to run this locally. To set up access to AWS amplify, follow [this](https://docs.amplify.aws/start/q/integration/react/) tutorial, but only add [ Storage ](https://docs.amplify.aws/lib/storage/getting-started/q/platform/js/#configure-your-application).

You will need to run Node 14. Later versions seem to cause problems. Consider managing Node version using [NVM](https://github.com/nvm-sh/nvm).

To start the app, run `npm install` and then `npm run start`.


## How it works

Select an image you want to upload to S3.

![Select image](https://user-images.githubusercontent.com/20680618/112609940-6df60400-8e1c-11eb-9744-a7f4ad40064c.png)

If the image contains any moderation labels, the upload is rejected.

![Upload image](https://user-images.githubusercontent.com/20680618/112609930-6b93aa00-8e1c-11eb-8dc4-f8631d015c6c.png)
