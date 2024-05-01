# Meshmell Website Source

Welcome to the source code repository for [Meshmell.com](https://meshmell.com), an engaging and dynamic public project. We are open to contributions and excited to collaborate with the community!

## Technology Stack

・Typescript
・Node.js
・React
・Next.js
・Three.js
・React Three Fiber
・Firebase Realtime Database
・Google Cloud Run
・Google Cloud Build
・Google Cloud Storage
・Docker

## Participating

Interested in contributing? Fantastic! Here’s how you can get started:

1. Clone this Repository
2. Change the name of `.env.sample` in the root directory to `.env`
3. Start a Local Server with `npm run dev` at `http://localhost:3000/`

## Construction

### 1. Firebase's Realtime DataBase
We are utilizing Firebase Realtime Database to store the following information:
- Category
- 3D Models
- 3D Models download count with timestamp
- 3D Models Creators
- Sponsors of this project
- Actions of 3D Models

#### Use your own firebase cloud service
If you want to use Firebase Realtime Database by creating your own app specifically for this project
1. Create a Firebase account and start a new project at [Firebase](https://firebase.google.com/)
2. Create Realtime Database in the project
3. Upload the [/firebase_dev/realtime_database/emulators-app.json](https://github.com/meshmell/meshmell.com/blob/main/firebase_dev/realtime_database/emulators-app.json) file to the Realtime Database.
4. Add new "app" in the "Project Settings" display. Select "Web" and obtain the configuration information. You will use these details in step 5.
5. Add or override each required values below at the `.env` file:

- `FIREBASE_ADMIN_PROJECT_ID`: Firebase project ID for admin use.
- `FIREBASE_ADMIN_CLIENT_EMAIL`: Client email associated with your Firebase admin SDK.
- `FIREBASE_ADMIN_DATABASE_URL`: URL to your Firebase database.
- `NEXT_PUBLIC_FIREBASE_API_KEY`: Public API key that your client applications will use to interact with Firebase services.
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`: Authentication domain for your Firebase project, used in Firebase Auth.
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`: Project ID for your Firebase setup, used publicly.
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`: URL to your Firebase storage bucket.
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`: sender ID used for Firebase messaging services.
- `NEXT_PUBLIC_FIREBASE_APP_ID`: app ID for your Firebase application.

#### Use firebase emulator in docker (*1)
For development purposes, we use the Firebase Emulator for Realtime Database, which runs in Docker. The setup is as follows: Realtime Database is accessible at `localhost:9000`, and the UI is available at `localhost:4000`.

1. inside `.env` file, change the environmental variable status
```
NEXT_PUBLIC_USE_FIREBASE_EMULATOR="true"
```
2. Run `docker compose -f docker-compose.dev.emulators.yaml up firebase-emulator` at root directory in the Terminal to start the Firebase emulator with Docker.

Now you can access the Firebase emulator UI by navigating to localhost:4000. Here, you'll find seed (dummy) data located in `/firebase_dev/emulators-app.json`

*1 We are currently experiencing issues with the local Firebase emulator inside Docker, and we are actively working to resolve this problem. For more details, please see [this issue](https://github.com/meshmell/meshmell.com/issues/1). Your assistance in this matter would be greatly appreciated.


### 2. Google Cloud Storage (GCS)
We utilize Google Cloud Storage (GCS) for:
- Downloading 3D model data via client web app.
- Delivering images and displaying 3D models within the web application.

#### Use your own GCS cloud service
If you want to use cloud GCS services for your own 

1. Create a Google Cloud account and set up GCS at https://cloud.google.com/storage.
2. Upload the content inside [/gcs_dev/test_bucket](https://github.com/meshmell/meshmell.com/tree/main/gcs_dev/test_bucket) directory to the GCS bucket.

3. Add or override each required values below at the `.env` file:
- `GCS_BUCKET_NAME`: Name of your GCS bucket.
- `GCS_TYPE`: Type of client authentication, typically service_account.
- `GCS_CLIENT_ID`: Client ID for your GCS service account.
- `GCS_PROJECT_ID`: GCS project ID.
- `GCS_CLIENT_EMAIL`: Client email associated with your GCS service account.
- `GCS_PRIVATE_KEY`: Private key for your GCS service account, often in JSON format.

#### Use GCS emulator in docker
For development purposes, we are employing a GCS Emulator that runs on Docker

1. inside `.env` file, change the environmental variable status
```
NEXT_PUBLIC_USE_GCS_EMULATOR="true"
```
2. Run `docker compose -f docker-compose.dev.emulators.yaml up gcs-emulator` at root directory in the Terminal to start the GCS emulator with Docker.

Now you can access to GCS emulator running in docker at `localhost:4443`. We use Fake GCS to store the 3D data of the models.

### 3. Client App running on Google Cloud Run

For the client web application, the source code can be found in this repository.

For development purposes, the application runs on your local machine (accessible at localhost:3000). You can start the development mode by executing `npm run dev`.

#### use Docker for the Web (Next.js) App 

If you wish to run the Next.js web app inside a Docker container, command `docker compose -f docker-compose.dev.web.yaml up` in the root directory.

## Tips

### `NEXT_PUBLIC_ENV_STATUS` Environment Variable
We have defined three settings for the `NEXT_PUBLIC_ENV_STATUS` environment variable to accommodate different stages of development and deployment:

- `production`: This setting is for the production environment, utilizing Firebase and Google Cloud Storage (GCS) cloud services.
- `development`: This setting is for the local development environment, using both Firebase and GCS cloud services and their emulators. Configuration of each cloud service is required individually.

### Shortcut command for run both Emulators (firebase and GCS)
You can run `docker compose -f docker-compose.dev.emulators.yaml up` to up both GCS and Firebase app container.

## Contributing

If you're interested in assisting with the development of this site, consider using the `develop` branch!

## Get Help, Contact

Feel free to open an issue or contact us at [email us](info.meshmell.com)

## Sponsors

We would be delighted to receive your support, and we will include your name on the Sponsor display modal. Please go to The menu then click "For Sponsors"

## Special Thanks
The 3D models used on this website are available under the CC0 License. We have sourced them from the following websites:
- [Polyhaven](https://polyhaven.com/)
- [Quaternius](https://quaternius.com/)