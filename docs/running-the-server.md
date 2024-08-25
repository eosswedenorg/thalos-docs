# Running the server

## Start using scripts

Start the server using the `start.sh` script.

```shell
./start.sh
```

The logs can be found in `logs` directory (unless specified otherwise in the configuration).

Stopping the server again is as simple as running.

```shell
./stop.sh
```

## Starting Manually

If desired, Thalos can also be started manually for quick configuration testing.

```shell
./bin/thalos-server
```

or if you want to specify another config file then the default

```shell
./bin/thalos-server --config /path/to/thalos.yml
```

## With systemd

```shell
sudo systemctl enable thalos-server
sudo systemctl start thalos-server
```

After executing these commands, the server should be up and running.
You can check the logs at `/var/log/thalos.log` (unless specified otherwise in the configuration), or by running `sudo systemctl status thalos-server`.

> TIP: if you want to modify the arguments passed to thalos-server when starting
  via systemd, look in the `/etc/sysconfig/thalos-server` file

## CLI Flags

Here is the output of `thalos-server -h` showing the available cli flags:

```bash
thalos-server v1.1.4

Usage:
  thalos-server [flags]

Flags:
      --abi-cache-api-timeout duration   Duration before the api call times out when the ABI cache requests an abi. (default 1s)
      --blacklist strings                Define a list of 'contract:action' pairs that will be blacklisted (thalos will not process those actions)
      --blacklist-is-whitelist           Thalos will treat the blacklist as a whitelist
      --cache string                     What cache driver to use (default "redis")
      --chain string                     ChainID used in channel namespace, can be any string (default from api)
      --codec string                     Codec used to send messages (default "json")
  -c, --config string                    Config file to read (default "./config.yml")
      --end-block uint32                 Stop streaming when this block is reached (default none)
  -h, --help                             help for thalos-server
      --irreversible-only                Only stream irreversible blocks from ship
  -L, --level string                     Log level to use (default "info")
  -l, --log string                       Path to log file (default: print to stdout/stderr)
      --log-file-timestamp string        Timestamp format to use when rotating log files (default "2006-01-02_150405")
      --log-max-filesize string          Max filesize for logfile to rotate (default "10mb")
      --log-max-time duration            Max time for logfile to rotate (default 24h0m0s)
      --max-msg-in-flight int            Maximum messages that can be sent from SHIP without acknowledgement (default 10)
  -n, --no-state-cache                   Force the application to take start block from config/api
  -p, --pid string                       Where to write process id
      --redis-addr string                host:port to redis server (default "127.0.0.1:6379")
      --redis-db int                     Redis database
      --redis-password string            Redis password
      --redis-prefix string              Redis channel prefix (default "ship")
      --redis-user string                Redis username
      --ship-url string                  Url to ship node (default "ws://127.0.0.1:8080")
      --start-block uint32               Start to stream from this block (default config value, cache, head from api)
      --telegram-channel int             Telegram channel to send notifications to
      --telegram-id string               Id of telegram bot
  -u, --url string                       Url to antelope api
  -v, --version                          version for thalos-server
```


