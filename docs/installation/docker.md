---

---

# Docker

Do you want to run Thalos in a container? No problem as Thalos provides official docker images
to get you going in no time.

The images can be found [here](https://github.com/eosswedenorg/thalos/pkgs/container/thalos)

Download the latest image:

```shell
$ docker pull ghcr.io/eosswedenorg/thalos:latest
```

Check that it works by spawning the container and display the version:

```sh
$ docker run ghcr.io/eosswedenorg/thalos:latest --version
thalos-server v1.1.1
```

## Using docker compose

Use `docker-compose` to spin up a SHIP node, Redis and Thalos all at once.

```yaml
services:
  thalos:
    image: ghcr.io/eosswedenorg/thalos:latest
    depends_on:
      - redis
      - ship
    # pass arguments to thalos.
    command: [
      "--redis-addr=redis:6379",
      "--url=http://ship:80",
      "--ship-url=http://ship:8080"
    ]
    # or mount a config file
    #volumes:
    #  - ./thalos.yml:/thalos/config.yml

  # Redis service
  redis:
    image: redis:alpine
    # mount a custom redis config if you need.
    #command: /etc/redis/redis.conf
    #volumes:
    #  - ./redis.conf:/etc/redis/redis.conf

  # Ship node. make sure you have your config files in ./nodeos/config
  #
  # more documentation here: https://hub.docker.com/r/wecandev/waxblockchain
  ship:
    image: wecandev/waxblockchain:v4.0.4wax01
    expose:
      - 8888
      - 8080
    volumes:
      - ./nodeos/data:/root/.local/share/eosio/nodeos/data
      - ./nodeos/config:/root/.local/share/eosio/nodeos/config
```

For more information: [docs.docker.com/compose](https://docs.docker.com/compose)
