# Messages

This document describes the message payloads published by Thalos.

## Encoding

Thalos supports two codecs (configured via `message_codec` / `--codec`):

- `json` (default)
- `msgpack`

When using JSON:

- `[]byte` fields are base64-encoded strings
- timestamps are UTC and serialized by the JSON codec

## Message types

### HeartBeat

Published on `heartbeat` channel periodically.

| Field                      | Type     | Description                                 |
| -------------------------- | -------- | ------------------------------------------- |
| `blocknum`                 | `uint32` | Current block number                        |
| `head_blocknum`            | `uint32` | Current chain head block number             |
| `last_irreversible_blocknum` | `uint32` | Last irreversible block number              |

### TransactionTrace

Published on `transactions` channel (unless disabled).

| Field            | Type                              | Description |
| ---------------- | --------------------------------- | ----------- |
| `id`             | `string`                          | Transaction id |
| `blocknum`       | `uint32`                          | Block number |
| `blocktimestamp` | `time`                            | Block timestamp |
| `status`         | `string`                          | Transaction status |
| `cpu_usage_us`   | `uint32`                          | CPU usage (microseconds) |
| `net_usage_words` | `uint32`                         | NET usage words |
| `elapsed`        | `int64`                           | Execution time |
| `net_usage`      | `uint64`                          | NET usage |
| `scheduled`      | `bool`                            | Scheduled transaction flag |
| `action_traces`  | [`ActionTrace[]`](#actiontrace)   | Action traces for this transaction |
| `except`         | `string`                          | Exception text (if any) |
| `error`          | `uint64`                          | Error code |

### ActionTrace

Published on `actions` channels (unless disabled), and also nested in `TransactionTrace.action_traces`.

| Field            | Type                                       | Description |
| ---------------- | ------------------------------------------ | ----------- |
| `tx_id`          | `string`                                   | Parent transaction id |
| `blocknum`       | `uint32`                                   | Block number |
| `blocktimestamp` | `time`                                     | Block timestamp |
| `receipt`        | [`ActionReceipt`](#actionreceipt) / `null` | Action receipt |
| `name`           | `string`                                   | Action name |
| `contract`       | `string`                                   | Contract account |
| `receiver`       | `string`                                   | Receiver account |
| `first_receiver` | `bool`                                     | True if receiver is first receiver |
| `data`           | `any`                                      | ABI-decoded action data when available |
| `authorization`  | [`PermissionLevel[]`](#permissionlevel)    | Authorization list |
| `except`         | `string`                                   | Exception text (if any) |
| `error`          | `uint64`                                   | Error code |
| `return`         | `bytes`                                    | Return value bytes |

> Note: the field is `name` (not `action`).

### ActionReceipt

| Field             | Type                                              | Description |
| ----------------- | ------------------------------------------------- | ----------- |
| `receiver`        | `string`                                          | Receiver account |
| `act_digest`      | `string`                                          | Action digest |
| `global_sequence` | `uint64`                                          | Global sequence |
| `recv_sequence`   | `uint64`                                          | Receiver sequence |
| `auth_sequence`   | [`AccountAuthSequence[]`](#accountauthsequence)   | Auth sequence list |
| `code_sequence`   | `uint32`                                          | Code sequence |
| `abi_sequence`    | `uint32`                                          | ABI sequence |

### PermissionLevel

| Field        | Type     | Description |
| ------------ | -------- | ----------- |
| `actor`      | `string` | Actor account |
| `permission` | `string` | Permission name |

### AccountAuthSequence

| Field      | Type     | Description |
| ---------- | -------- | ----------- |
| `account`  | `string` | Account name |
| `sequence` | `uint64` | Sequence |

### RollbackMessage

Published on `rollback` channel on microfork rollback detection.

| Field       | Type     | Description |
| ----------- | -------- | ----------- |
| `old_block` | `uint32` | Previous current block |
| `new_block` | `uint32` | New current block |

### TableDelta

Published on `tabledeltas` channels (unless disabled).

| Field            | Type                                | Description |
| ---------------- | ----------------------------------- | ----------- |
| `blocknum`       | `uint32`                            | Block number |
| `blocktimestamp` | `time`                              | Block timestamp |
| `name`           | `string`                            | SHIP delta name |
| `rows`           | [`TableDeltaRow[]`](#tabledeltarow) | Rows in the delta |

### TableDeltaRow

| Field      | Type      | Description |
| ---------- | --------- | ----------- |
| `present`  | `bool`    | Row present/removed flag |
| `data`     | `object`  | Parsed row data when available |
| `raw_data` | `bytes`   | Raw row bytes |

### TableDeltaRowContract (`name = contract_row`)

For `contract_row` deltas, `data` typically contains:

| Field         | Type                     | Description |
| ------------- | ------------------------ | ----------- |
| `table`       | `string`                 | Table name |
| `scope`       | `string`                 | Table scope |
| `primary_key` | `string \| int`          | Primary key |
| `code`        | `string`                 | Contract account |
| `payer`       | `string`                 | RAM payer |
| `value`       | `object \| base64_string` | Decoded row value when ABI is available; otherwise raw bytes |

If ABI decode fails, Thalos keeps raw data and may leave decoded fields partial.
