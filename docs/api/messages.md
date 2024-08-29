# Messages

This document describes the different messages that are sent

## Encoding

All messages are encoded in `json` format

## Types

### HeartBeat

Heartbeat messages are posted to the heartbeat channel periodically.

| Field                      | Datatype | Description                                 |
| -------------------------- | -------- | ------------------------------------------- |
| blocknum                   | `int`    | Current block number                        |
| head_blocknum              | `int`    | Head block number                           |
| last_irreversible_blocknum | `int`    | block number of the last irreversible block |

### Transaction


### ActionTrace

| Field          | Datatype                                | Description                                                       |
| -------------- | --------------------------------------- | ----------------------------------------------------------------- |
| tx_id          | `string`                                | Transaction ID                                                    |
| blocknum       | `int`                                   | Block number where this action trace (and transaction) belongs to |
| blocktimestamp | `time`                                  | Block timestamp                                                   |
| receipt        | [`ActionReceipt`](#actionreceipt)       | Action receipt                                                    |
| receiver       | `string`                                | Receiver account                                                  |
| first_receiver | `bool`                                  | True if receiver is the first account to get notified             |
| contract       | `string`                                | Contract account                                                  |
| action         | `string`                                | What action was executed on the contract                          |
| data           | `any`                                   | Contract specific data (decoded using the contracts abi)          |
| authorization  | [`PermissionLevel[]`](#permissionlevel) | Authorization                                                     |

### ActionReceipt

| Field           | Datatype                                        | Description        |
| --------------- | ----------------------------------------------- | ------------------ |
| receiver        | `string`                                        | Actor account name |
| act_digest      | `string`                                        | Action digest      |
| global_sequence | `int`                                           | Global sequence    |
| recv_sequence   | `int`                                           | Receive sequence   |
| auth_sequence   | [`AccountAuthSequence[]`](#accountauthsequence) | Auth sequence      |
| code_sequence   | `int`                                           | Code sequence      |
| abi_sequence    | `int`                                           | ABI sequence       |

### PermissionLevel

| Field      | Datatype | Description                      |
| ---------- | -------- | -------------------------------- |
| actor      | `string` | Actor account name               |
| permission | `string` | Permission (for example: active) |

### AccountAuthSequence

| Field    | Datatype | Description  |
| -------- | -------- | ------------ |
| account  | `string` | Account name |
| sequence | `int`    | Sequence     |

### RollbackMessage

| Field     | Datatype | Description                          |
| --------- | -------- | ------------------------------------ |
| new_block | `int`    | The current block number             |
| old_block | `int`    | Last block number that was received. |

### TableDelta

| Field          | Datatype                            | Description       |
| -------------- | ----------------------------------- | ----------------- |
| blocknum       | `int`                               | Block number      |
| blocktimestamp | `time`                              | Block timestamp   |
| name           | `string`                            | Table name        |
| rows           | [`TableDeltaRow[]`](#tabledeltarow) | Rows in the delta |


### TableDeltaRow

| Field    | Datatype        | Description                              |
| -------- | ---------------------------------------------------------- | --------------------------------- |
| present  | `bool`                                                     | -                                 |
| data     | [`TableDeltaRowContract`](#tabledeltarowcontract) \| `any` | Decoded data                      |
| raw_data | `base64_string`                                            | Raw data in base64 encoded string |

### TableDeltaRowContract

These messages are only relevant when listening to [Table deltas](redis-channels#table-delta) channel when name is `contract_row`.



| Field       | Datatyp                  | Description                                                |
| ----------- | ------------------------ | ---------------------------------------------------------- |
| table       | `string`                 | table name                                                 |
| scope       | `string`                 | table scope                                                |
| primary_key | `string` \| `int`        | Primary ID for the row.                                    |
| code        | `string`                 | Account name where that has the contract code              |
| payer       | `string`                 | Account name that payed for the ram that this row consumes |
| value       | `map` \| `base64_string` | Actual data in the table                                   |


Thalos can decode contract row data in `vaule` using the contracts abi.
If Thalos could not decode the data then `value` will contain a `base64_string` of the raw value instead.
