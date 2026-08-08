# KIBUKA Frontend

KIBUKA is the aerospace defense frontend for the Sans Mercantile Constellation.

## Purpose
- Track aerospace assets, launch readiness, airspace alerts, and defense coordination.
- Built for API integration and containerized deployments.

## Local Run
```bash
npm install
npm start
```

## API Integration
- Set the backend base URL with: `REACT_APP_API_BASE_URL=http://localhost:<backend-port>`
- Health endpoint: `${API_BASE_URL}/api/health`
- Assets endpoint: `${API_BASE_URL}/api/assets`

## Containerization
```bash
docker build -t kibuka-frontend .
docker run -p 3005:3000 -e REACT_APP_API_BASE_URL=http://localhost:8000 kibuka-frontend
```

## Notes
- Use environment variables to switch the frontend into local or deployed backend mode.
- The frontend is ready for container deployment.
