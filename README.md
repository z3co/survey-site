# Survey-Site

Welcome to **Survey-Site**! This is a web application where users can take various quizzes and surveys.

## Features

- **User Authentication**: Register and login to save your quiz progress and results.
- **Multiple Quizzes**: A variety of quizzes on different topics.
- **Real-Time Results**: Get instant feedback on your quiz answers.

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) (Ensure Docker is installed and running on your machine)

### Running the Application

You can run the application using the released Docker image. The application also requires volumes for `db.json` and `surveyDB.json`, and a `.env` file with a JWT secret.

1. **Pull the Docker image:**

```bash
docker pull ghcr.io/z3co/survey-site:latest
```

2. **Create the `.env` file:**

Create a `.env` file in the root directory and add the following:

```env
JWTSECRET=your_32_byte_secret_key
```

3. **Run the Docker container with volumes:**

```bash
docker run -d -p 3000:3000 --name survey-site \
  -v $(pwd)/db.json:/node/db.json \
  -v $(pwd)/surveyDB.json:/node/surveyDB.json \
  --env-file .env \
  ghcr.io/z3co/survey-site:latest
```

The application should now be running on [http://localhost:3000](http://localhost:3000).

### Using Docker Compose

You can also use Docker Compose to run the application. Copy the `compose.yaml` file from the repository and run the following command:

```bash
docker-compose -f compose.yaml up -d
```

### Configuration

The application requires a `.env` file with the following environment variable:

- `JWTSECRET`: The secret key for JWT authentication (must be 32 bytes)

## Usage

1. **Register**: Create an account to start taking and making quizzes.
2. **Login**: Access your account to answer your and others quizzes.
3. **Take Quizzes**: Choose a quiz from the available list and start answering questions.
4. **View Results**: Get instant feedback on your answers.

## Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**.
2. **Create a new branch**: `git checkout -b feature/your-feature-name`.
3. **Commit your changes**: `git commit -m 'Add some feature'`.
4. **Push to the branch**: `git push origin feature/your-feature-name`.
5. **Create a pull request**.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Thanks to all the contributors who have helped in developing this project.

*Last updated: 2025-01-24 10:28:10 UTC by z3co*
