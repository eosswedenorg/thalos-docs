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

Or, if you want to specify a different config file than the default:

```shell
./bin/thalos-server --config /path/to/thalos.yml
```

## With systemd

```shell
sudo systemctl enable thalos-server
sudo systemctl start thalos-server
```

After executing these commands, the server should be up and running.
You can inspect logs with `sudo journalctl -u thalos-server -f`,
or check the directory configured in `log.directory` (commonly `/var/log/thalos` on Debian packages).

> TIP: if you want to modify the arguments passed to thalos-server when starting
  via systemd, look in the `/etc/sysconfig/thalos-server` file

## CLI Flags

Run `thalos-server -h` to see the current flag list for your installed version.

The current source supports these flags:

### Core

- `-c, --config string` - Config file to read (default `./config.yml`)
- `-u, --url string` - Antelope API URL
- `--codec string` - Message codec (default `json`)
- `-L, --level string` - Log level (default `info`)
- `-p, --pid string` - Write process id to file
- `-n, --no-state-cache` - Ignore cached state and use config/API start logic
- `-h, --help` - Show help
- `-v, --version` - Show version

### Redis / Cache / Notifications

- `--redis-addr string` - Redis `host:port` (default `127.0.0.1:6379`)
- `--redis-user string` - Redis username
- `--redis-password string` - Redis password
- `--redis-db int` - Redis database index
- `--redis-prefix string` - Redis channel prefix (default `ship`)
- `--cache string` - Cache driver (default `redis`)
- `--abi-cache-api-timeout duration` - ABI fetch timeout (default `1s`)
- `--telegram-id string` - Telegram bot id
- `--telegram-channel int` - Telegram channel id

### SHIP / Stream control

- `--ship-url string` - SHIP websocket URL (default `ws://127.0.0.1:8080`)
- `--start-block uint32` - Start stream from this block
- `--end-block uint32` - Stop stream at this block
- `--irreversible-only` - Stream irreversible blocks only
- `--max-msg-in-flight int` - Max outstanding SHIP messages (default `10`)
- `--chain string` - Chain namespace value (defaults to chain id from API)

### Filtering / Published message types

- `--blacklist strings` - Blacklist `contract:action` pairs
- `--blacklist-is-whitelist` - Treat blacklist as whitelist
- `--table-deltas` - Enable table delta processing (default `true`)
- `--table-delta-whitelist strings` - Whitelist table deltas as `contract:table` pairs (supports `*` wildcard)
- `--transactions` - Enable transaction trace messages (default `true`)
- `--actions` - Enable action trace messages (default `true`)

### Log rotation (when `--log` is used)

- `-l, --log string` - Log file path (default: stdout/stderr)
- `--log-max-filesize string` - Rotate file at size (default `10mb`)
- `--log-max-time duration` - Rotate file at age (default `24h`)
- `--log-file-timestamp string` - Rotation filename timestamp format (default `2006-01-02_150405`)

> Note: setting `--start-block` automatically enables `--no-state-cache`.
