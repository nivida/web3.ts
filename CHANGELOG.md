# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- EXAMPLE

## [2.0.0-alpha]

### Added

- I've added feature XY (#1000)

### Changed

- I've cleaned up XY (#1000)

### Deprecated

- I've deprecated XY (#1000)

### Removed

- I've removed XY (#1000)

### Fixed

- I've fixed XY (#1000)

### Security

- I've improved the security in XY (#1000)

-->

## [2.0.0-alpha]

### Added

- Sending of locally signed transactions as ``BatchRequest`` (#2708)
- Automatic increason of the nonce for locally signed transactions (#2796)

### Changed

- Pull request & issue templates updated
- Supported node versions changed (#2820)

### Fixed

- ``hexToNumberString`` prefix validation (#2184)
- Draft implementation of the EIP-1193 improved (#2856, #2862, #2854)
- Documentation typo (#2806)
- Contract method parameter handling fixed (#2815)
- ``isBigNumber`` export fixed (#2835)
- ``SyncingSubscription`` fixed (#2833)
- ``getBlock`` types fixed (#2819)
- Transaction confirmation workflow fixed for parity (#2847)
- ``WebsocketProvider`` event handling fixed (#2711)
- ``WebsocketProvider`` memory leak fixed (#2851)

## [Unreleased]

## [2.0.0-alpha.1]

### Added

- Length check of the PK added to the ``fromPrivateKey`` method of the ``Account`` model (#2928)
- WebsocketProvider options extended with ``requestOptions`` and ``origins`` (#2938, #2995)
- ``changed`` listener added to Contract event subscriptions (#2960)

### Changed

- fsevents bumbed to v1.2.9 (#2951)
- ``websocket`` dependency changed to github fork (#2995)

### Fixed

- miner.startMining fixed (#2877)
- Subscription type definitions fixed (#2919)
- ``ContractOptions`` type definitions corrected (#2939)
- Scrypt compatibility with older and newer nodejs versions fixed (#2952)
- Encryption of the V3Keystore fixed (#2950)
- Provider timeout fixed and Maps are used now to handle subscriptions (#2955)
- stripHexPrefix fixed (#2989)
- BatchRequest error handling fixed for callbacks (#2993)
- ``reconnected`` event and reconnection timeout option added to WebsocketProvider (#2994)
- ``clearSubscriptions`` fixed (#3007)

## [Unreleased]

## [2.0.0-alpha.2]

### Added

- ``automine`` and ``Instant Seal`` support added (#2940)
- Public API layer added to ``web3-core`` module (#3013)
- getNetworkType method extended with Görli testnet (#3096)

### Changed

- default value of ``transactionConfirmationBlocks`` changed to ``0`` (#3008)
- ``TransactionObserver`` splitted up to ``HttpTransactionObserver`` and ``SocketTransactionObserver`` (#3008)

### Fixed

- Error handling of the HttpProvider fixed (#2887)
- Property handling for the Ens module fixed (#3008)
- ``blockNumber`` check of the received receipt fixed in transaction observers (#3012)
- Cases for zero valued fromBlock, toBlock filters added (#3109)
- Topic property of the LogsOptions type extended with null (#3128)
