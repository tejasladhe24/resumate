# Backend App

Express + Socket.IO backend that powers realtime meeting rooms using mediasoup SFU.

## Responsibilities

- `/api` routes (including `/api/health`)
- JWT-gated Socket.IO connections
- mediasoup room lifecycle (routers, transports, producers, consumers)
- per-participant recording and upload to object storage

## SFU Signaling Events

Client -> server:

- `join-room` `{ roomId, userId }`
- `leave-room`
- `sfu:getRouterRtpCapabilities`
- `sfu:createWebRtcTransport` `{ direction }`
- `sfu:connectTransport` `{ transportId, dtlsParameters }`
- `sfu:produce` `{ transportId, kind, rtpParameters }`
- `sfu:consume` `{ transportId, producerId, rtpCapabilities }`
- `sfu:getProducers`

Server -> client:

- `all-users`, `user-joined`, `user-left`, `duplicate-instance`
- `sfu:newProducer`, `sfu:producerClosed`

## Recording

- Records each participant stream individually.
- Output key format:
  - `/<meetId>/<userId>_<joiningTime>_<leavingTime>.mp4`
- Upload path uses multipart streaming while recording (no local media file).

## Environment Variables

Validated in `src/env.ts`:

- `NODE_ENV` (default `development`)
- `SELF_URL`, `APP_UI_URL`
- `PORT` (default `8000`), `HOST` (default `0.0.0.0`)
- `MEDIASOUP_LISTEN_IP` (default `0.0.0.0`)
- `MEDIASOUP_ANNOUNCED_IP` (optional; inferred from `SELF_URL` when absent)
- `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `S3_ENDPOINT`, `S3_BUCKET`
- `FFMPEG_PATH` (default `ffmpeg`)
- `RECORDINGS_TMP_DIR` (default OS temp dir)
- `RECORDINGS_BUCKET` (default `meet`)
- `RECORDINGS_MULTIPART_CHUNK_SIZE_BYTES` (default `5242880`)
- `RECORDINGS_PRESIGNED_PART_TTL_SECONDS` (default `900`)

## Scripts

```bash
pnpm --filter backend dev
pnpm --filter backend build
pnpm --filter backend start
```
