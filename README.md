# VideoRealtimeController

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Docker commands

### Docker compose

Docker compose allows to deploy "Video Realtime Controller" and "VRC socket server" easily.

If the images are not available, they are built and tagged locally. *(Build "vrc" image can take some time.)*

```bash
docker-compose up -d
```



Force rebuild of images if they already exist :

```bash
docker-compose build

docker-compose up --build
```



### Manual build and run images

#### Video Realtime Controller

```bash
docker build -t berto/vrc:1.0.0 .
```

```bash
dk run --name="VideoRealtimeController" --env VRC_WS_URL="localhost:9000" -d -p 8080:80 berto/vrc:1.0.0
```

#### Video Socket Server
```bash
docker build -t berto/vrc_socket_server:1.0.0 .
```

```bash
dk run --name="VRC-socket-server" -d -p 9000:9000 berto/vrc_socket_server:1.0.0
```

