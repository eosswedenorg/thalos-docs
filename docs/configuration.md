# Configuration

The default configuration file is `./config.yml`.

- For bundled/manual installs this is typically in your install directory.
- For Debian packages this is usually `/etc/thalos/config.yml`.

CLI flags override configuration values when provided.

```yaml
name: "my-thalos-node"
api: "http://127.0.0.1:8888"
message_codec: "json"

ship:
  url: "ws://127.0.0.1:8080"

redis:
  addr: "127.0.0.1:6379"
```

There is also the option to configure Thalos via command line flags.
See [CLI Flags](/docs/running-the-server#cli-flags).

### General

`name` ([`string`](#string)) - Name of the Thalos node.

`api` ([`string`](#string)) - Nodeos API Endpoint.

`message_codec` ([`string`](#string)) default: `json`

What codec Thalos should use when publishing messages to Redis.

### ABI Cache

`abi_cache.api_timeout` ([`duration_string`](#duration-string)) default: `1s`

Timeout used when fetching ABI definitions from the API.

### Ship

`ship.url` ([`string`](#string)) - URL to the nodeos SHIP endpoint.

`ship.chain` ([`string`](#string))

Name of the chain namespace. If not defined, Thalos uses the chain id reported by `api`.
This value (or the chain id) is prepended to channel names to allow multiple Thalos instances
to run against the same Redis database.

`ship.irreversible_only` ([`boolean`](#boolean))

If `true`, the ship node will only send transactions once they are considered irreversible.
If `false` the transactions are posted as soon as possible.

`ship.max_messages_in_flight` ([`integer`](#integer)) default: `10`

Maximum number of SHIP messages in flight before acknowledgement.

`ship.table_deltas` ([`boolean`](#boolean))

If set to `true`, Thalos publishes table delta updates to clients.

`ship.table_delta_whitelist` ([`ContractList`](#contractlist))

Optional whitelist for table deltas (`contract:table`).
Use `*` as wildcard for table names.

`ship.transactions` ([`boolean`](#boolean)) default: `true`

If `false`, Thalos skips transaction trace messages.

`ship.actions` ([`boolean`](#boolean)) default: `true`

If `false`, Thalos skips action trace messages.

`ship.start_block_num` ([`integer`](#integer))

Thalos will start streaming blocks starting from this one.
If undefined, Thalos will use cached state when available, otherwise API head/LIB depending on mode.

`ship.end_block_num` ([`integer`](#integer))

Thalos will stop streaming when this block number is reached.
If undefined, Thalos will keep streaming.

`ship.blacklist` ([`ContractList`](#contractlist))

List of `contract:action` pairs that Thalos will skip.

`ship.blacklist_is_whitelist` ([`boolean`](#boolean))

Thalos will treat `ship.blacklist` as a whitelist.

### Redis

`redis.addr` ([`string`](#string)) - Address (and port) to redis server

`redis.user` ([`string`](#string)) - Username to use when authenticating

`redis.password` ([`string`](#string)) - Password to use when authenticating

`redis.db` ([`integer`](#integer)) - Database index to use

`redis.prefix` ([`string`](#string)) - Key prefix prepended to all Thalos channels to avoid name collisions.

### Cache

These settings control the cache used by Thalos to cache abi definitions and internal state.

`cache.storage` ([`string`](#string) default: `redis`) - Cache storage to use.

Available values: `memory`, `redis`

`cache.options` (`map`) - Options for the cache storage, see section for each cache storage.

#### Memory

No configuration.

#### Redis

`cache.options.stats` ([`boolean`](#boolean) default: `false`) - True if statistics should be collected

`cache.options.size` ([`integer`](#integer) default: `1000`) - How many items to store in process local memory for faster lookup of popular items

`cache.options.ttl` ([`integer`](#integer) default: `10`) - How long (in minutes) each item should be kept in process local memory before being discarded (and has to be fetched from redis again.)

### Logging

This block configures how Thalos logs information.

`log.filename` ([`string`](#string)) - Filename (without extension)

`log.directory` ([`string`](#string)) - Directory where to store log files.

`log.file_timestamp_format` ([`dateformat`](#dateformat)) - Format to rename log files when rotating

`log.maxfilesize` ([`string`](#string)) - Rotate when the file reaches this size (for example `10mb`, `200mb`).

`log.maxtime` ([`duration_string`](#duration-string)) - Rotate when the file is this old.

### Telegram notifications

These settings control the Telegram notification mechanism built into Thalos.
If undefined, Thalos skips Telegram notifications.
If defined, Thalos sends messages when important events happen.

`telegram.id` ([`string`](#string)) - bot id

`telegram.channel` ([`integer`](#integer)) - channel id to use.


## Datatypes

### string

A sequence of characters.

### integer

A valid integer.

### boolean

Boolean value (`true` or `false`)

### dateformat

The dateformat type is a `string` but describes a date format in Go.

Go uses a different approach than many other languages.
Usually you might format a date like `2023-03-22` as `YYYY-MM-DD`.
Go uses a **reference time** when parsing time:

    Mon Jan 2 15:04:05 MST 2006

| Format       | Description                                 | Example          |
| ------------ | ------------------------------------------- | ---------------- |
| **Date**     | -                                           | -                |
| `2006`       | Full year                                   | 2018,1989        |
| `06`         | 2-digit year                                | 18, 89           |
| `Jan`        | Three letter word of month                  | Oct, Jun         |
| `January`    | Full name of month                          | April, September |
| `2`          | Day in month without leading zero           | 1 to 31          |
| `02`,`_2`    | Day in month with leading zero              | 01 to 31         |
| `002`,`__2`  | Day in year                                 | 002              |
| `Mon`        | Three letter word for day in week           | Tue, Fri         |
| `Monday`     | Full name of day in week                    | Friday, Saturday |
| **Time**     | -                                           | -                |
| `15`         | Hour in 24-format                           | 12,23            |
| `3`,`03`     | Hour in 12-format with/without leading zero | 2, 07            |
| `PM`         | AM/PM Mark                                  | AM               |
| `4`,`04`     | Minute with/without leading zero            | 08, 45           |
| `5`,`05`     | Second with/without leading zero            | 01, 59           |
| **Timezone** | -                                           | -                |
| `-0700`      | ±hhmm                                       | -0100            |
| `-07:00`     | ±hh:mm                                      | +04:00           |
| `-07`        | ±hh                                         | +10              |
| `-070000`    | ±hhmmss                                     | +053000          |
| `-07:07:07`  | ±hh:mm:ss                                   | -02:30:12        |
| `MST`        | Named timezone                              | CEST, GMT        |


### duration_string

A duration string is a possibly signed sequence of decimal numbers, each with optional fraction and a unit suffix, such as `300ms`, `-1.5h` or `2h45m`.

Valid time units are `"ns"`, `"us"` (or `"µs"`), `"ms"`, `"s"`, `"m"`, `"h"`.

### ContractList

An array/map of `contract:value` pairs.

Keys (contracts) are of type [`string`](#string) and values are an array of [`string`](#string).

For `ship.blacklist` the values are action names.
For `ship.table_delta_whitelist` the values are table names.

Action array can hold a special string `*` that matches any action.

The special contract `"*"` matches all contracts. 

**example**:

```yaml
mycontract: [ action1, action2 ]
# or
mycontract:
  - action1
  - action2

# To target all actions on a contract:
mycontract: [ "*" ]

# Matches the transfer and refund actions for all contracts
"*": [ transfer, refund ]
```
