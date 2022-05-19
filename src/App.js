import { useState } from "react";
import { PhotoPicker } from "aws-amplify-react";
import Amplify, { Storage } from "aws-amplify";
import awsExports from "./aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";

Amplify.configure(awsExports);

const AWS = require("aws-sdk");
AWS.config.region = awsExports.aws_cognito_region;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: awsExports.aws_cognito_identity_pool_id,
});

const rekognition = new AWS.Rekognition();

function App() {
  const [imageFile, setImageFile] = useState(null);

  const uploadImage = () => {
    checkIfAcceptableImage(imageFile)
      .then((file) => Storage.put(file.name, file))
      .then(() => alert("Successfully uploaded image to S3!"))
      .catch((error) => alert(error));
  };

  return (
    <div>
      <h2>
        <center>
          <PhotoPicker preview onPick={(image) => setImageFile(image.file)} />
        </center>
        <center>
          <button onClick={uploadImage}>Upload Photo</button>
        </center>
      </h2>
    </div>
  );
}

const checkIfAcceptableImage = async (imageFile) => {
  const buffer = await imageFile.arrayBuffer();
  const params = {
    Image: {
      Bytes: buffer,
    },
  };

  return new Promise((resolve, reject) => {
    rekognition.detectModerationLabels(params, (err, data) => {
      if (err) {
        return reject(new Error(err));
      }
      const modLabels = data.ModerationLabels;
      if (modLabels.length > 0) {
        const errorMsg =
          "This image was not uploaded. There is some inappropriate content in this image according to AWS Rekognition: " +
          JSON.stringify(modLabels);
        return reject(errorMsg);
      } else {
        return resolve(imageFile);
      }
    });
  });
};

export default withAuthenticator(App);
