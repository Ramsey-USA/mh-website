FROM debian:bookworm-slim

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    bash \
    ca-certificates \
    coreutils \
    findutils \
    libavif-bin \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /work

ENTRYPOINT ["bash", "-lc"]
