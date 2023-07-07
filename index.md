---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Thalos"
  #text: ""
  tagline: An application that makes it easy for users to stream blockchain data from an Antelope SHIP node.
  actions:
    - theme: brand
      text: Get started
      link: /docs/installation/
features:
  - title: Integrate blockchain data into your app.
    details: Thalos makes it easy for developers to integrate blockchain into apps.
    icon:
      src: /icons/blocks.svg
      alt: blocks
    link: /docs/
  - title: Redis
    details: With the power of redis pub/sub. Read SHIP messages fast and easy
    icon:
      src: /icons/redis.svg
      alt: redis
    link: https://redis.io
    linkText: Redis official website
  - title: Multilanguage support
    details: >
      Feel free to use your preferred programming language.
      You can either utilize our tailored libraries or directly interact with Thalos using a redis-client to access blockchain data.
    icon:
      src: /icons/monitor.svg
      alt: monitor
    link: /docs/api/clients
    linkText: Client libraries
---
