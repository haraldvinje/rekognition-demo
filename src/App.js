import { useState } from "react";
import { PhotoPicker } from "aws-amplify-react";
import Amplify, { Storage } from "aws-amplify";
import awsExports from "./aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";

Amplify.configure(awsExports);
const bucket_name = awsExports.aws_user_files_s3_bucket;

const AWS = require("aws-sdk");
AWS.config.region = awsExports.aws_cognito_region;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: awsExports.aws_cognito_identity_pool_id,
});

const rekognition = new AWS.Rekognition();

function App() {
  const [imageFile, setImageFile] = useState(null);

  const uploadImage = async () => {
    Storage.put(imageFile.name, imageFile)
      .then((result) => {
        checkImage(imageFile.name);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h2>
        <center>
          <PhotoPicker preview onPick={(image) => setImageFile(image.file)} />
        </center>
        <center>
          <button onClick={uploadImage}>Upload file</button>
        </center>
      </h2>
    </div>
  );
}

let checkImage = (filename) => {
  var params = {
    Image: {
      S3Object: {
        Bucket: bucket_name,
        Name: `public/${filename}`,
      },
    },
  };

  return new Promise((resolve, reject) => {
    rekognition.detectModerationLabels(params, (err, data) => {
      if (err) {
        return reject(new Error(err));
      }
      let modLabels = data.ModerationLabels;
      if (modLabels.length >= 0) {
        console.log("Inappropriate content");
        alert("There is some inappropriate content in this image");
      }
    });
  });
};

export default withAuthenticator(App);
