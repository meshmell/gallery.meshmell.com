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
2. Change the name of `.emv.sample` in the root directory to `.env`
3. Run `docker compose -f docker-compose.dev.emulators.yaml up gcs-emulator` at root directory in the Terminal to start the GCS emulator with Docker.
4. Register with [Firebase](https://firebase.google.com/) and obtain your own certificate information. Then, create a Realtime Database. (*1)
5. Start a Local Server with `npm run dev` at `http://localhost:3000/`

*1 We are currently experiencing issues with the local Firebase emulator inside Docker, and we are actively working to resolve this problem. For more details, please see [this issue](https://github.com/meshmell/meshmell.com/issues/1). Your assistance in this matter would be greatly appreciated. In the meantime, please use the Firebase Realtime Database by creating your own app specifically for this project, upload the [/firebase_dev/realtime_database/emulators-app.json](https://github.com/meshmell/meshmell.com/blob/main/firebase_dev/realtime_database/emulators-app.json) file, and fill in each required values below at the `.env` file.

- `FIREBASE_ADMIN_PROJECT_ID` to project id
- `FIREBASE_ADMIN_CLIENT_EMAIL` to client email
- `FIREBASE_ADMIN_DATABASE_URL` to database URL
- `NEXT_PUBLIC_FIREBASE_API_KEY` to API key
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` to auth domain
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID` to project id 
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` storage bucket
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` to messaging sender ID
- `NEXT_PUBLIC_FIREBASE_APP_ID` to app ID

We apologize for the inconvenience this may cause. 

## Construction

### 1. Firebase's Realtime DataBase
We are utilizing Firebase Realtime Database to store the following information:
- Category
- Models
- Models download count with timestamp
- Creators
- Sponsors
- Actions

<!-- For development purposes, we use the Firebase Emulator for Realtime Database, which runs in Docker. The setup is as follows: Realtime Database is accessible at `localhost:9000`, and the UI is available at `localhost:4000`.

After executing the command `docker compose -f docker-compose.dev.emulators.yaml up firebase-emulator`, you can access the Firebase emulator UI by navigating to localhost:4000. Here, you'll find seed (dummy) data located in `/firebase_dev/emulators-app.json`. -->

### 2. Google Cloud Storage (GCS)
We utilize Google Cloud Storage (GCS) for:
1. Downloading 3D model data via client web app.
2. Delivering images and displaying 3D models within the web application.

For development purposes, we are employing a GCS Emulator that runs on Docker and accessible at `localhost:4443`. We use Fake GCS to store the 3D data of the models.

### 3. Client App running on Google Cloud Run

For the client web application, the source code can be found in this repository.

For development purposes, the application runs on your local machine (accessible at localhost:3000). You can start the development mode by executing `npm run dev`.

## Tips

- ### `NEXT_PUBLIC_ENV_STATUS` Environment Variable
We have defined three settings for the `NEXT_PUBLIC_ENV_STATUS` environment variable to accommodate different stages of development and deployment:

1. `production`: This setting is for the production environment, utilizing Firebase and Google Cloud Storage (GCS) cloud services.
2. `development`: This setting is for the local development environment, using both Firebase and GCS cloud services and their emulators. Configuration of each cloud service is required individually.

- ### Running the Web (Next.js) App in Docker

If you wish to run the Next.js web app inside a Docker container, use the command `docker compose -f docker-compose.dev.web.yaml up`.

<!-- - ### You can develop and test only use local environment! -->

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