# Securing Redis

This guide focuses on Redis deployments where other systems or users can connect
to the same Redis server as Thalos.

## Baseline recommendations

1. Do not expose Redis directly to the public internet.
2. Restrict network access (bind + firewall/security groups).
3. Use ACL users with least privilege (see [ACL](/docs/redis/security/acl)).
4. Use TLS when traffic crosses untrusted networks.

## Isolating Redis

Running Thalos on a dedicated Redis instance (or dedicated DB/service) reduces
blast radius if credentials leak or ACL rules are misconfigured.

It also lowers the risk of other applications accidentally publishing sensitive
data to channels your subscribers can read.

## Network and protected mode

Use `bind` in `redis.conf` to restrict interfaces:

```conf
bind 127.0.0.1 ::1              # loopback only
bind 192.168.1.100 10.0.0.1     # specific interfaces
```

::: warning
`protected-mode` is a safety fallback, not a full security model.
For production, still enforce strict network controls and ACLs.
:::

## Firewall

Allow Redis port access only from trusted hosts/subnets.
Firewall setup is environment-specific, so refer to your platform docs.

## TLS

Redis supports native TLS (Redis 6+).
When using TLS-only deployments, disable plaintext (`port 0`) and use `tls-port`.

## Useful links

- [Redis security overview](https://redis.io/docs/latest/operate/oss_and_stack/management/security/)
- [Redis ACL documentation](https://redis.io/docs/latest/operate/oss_and_stack/management/security/acl/)
- [Redis TLS documentation](https://redis.io/docs/latest/operate/oss_and_stack/management/security/encryption/)
