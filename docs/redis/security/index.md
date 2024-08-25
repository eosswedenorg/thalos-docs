
# Securing redis

This documentation primarily focuses on setups where Redis is exposed to the internet
or an internal network where there is not a complete control over the clients.
For example, you may want to grant access to your Thalos instance to a friend.
While trusting your friend is reasonable, it is essential to consider potential future scenarios where
trust may no longer exist or their server could be compromised.

If you intend to run Thalos for internal use only, such as having internal applications 
that are relying on a blockchain stream, it is perfectly acceptable to skip these 
steps if you have complete control over all involved servers and do not expose the instance over a public IP.

## Isolating redis

To ensure security, it is highly recommended to run Thalos on a dedicated Redis instance, ideally within a
container or virtual machine.
This isolation helps prevent data leaks in case of misconfigured Redis ACLs or unauthorized access due to 
leaked/guessed admin password.

Additionally, it safeguards against potential misconfigurations, such as other applications mistakenly
writing sensitive data to Redis channels that can be accessed by Thalos clients.

In summary, isolating Thalos in its own Redis instance provides an extra layer of safety.

## Network

The `bind` directive in `redis.conf` is used to tell redis what network interfaces it should bind to.
Make sure to update this with the interfaces you intend to use.

::: danger IMPORTANT
Although it is recommended to limit Redis to the localhost interface for security purposes, with proper
firewall and ACL configurations, it can be safely exposed to additional interfaces. Carefully evaluate the necessity of
external access before making the change in the config file.
:::

```
bind 192.168.1.100 10.0.0.1     # listens on two specific IPv4 addresses
bind 127.0.0.1 ::1              # listens on loopback IPv4 and IPv6
bind * -::*                     # like the default, all available interfaces
```

## Firewall

Make sure you setup your firewall rules correctly. only allowing the ip's you trust to access the redis port.
This is out of scope of this documentation. consult your operating system or router manuals.

## Useful links

* [Official Security Documentation](https://redis.io/docs/management/security)
* [Config File Example](https://redis.io/docs/management/config-file)
