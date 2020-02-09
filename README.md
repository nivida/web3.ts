
# web3.ts

## Current State: MVP (MINIMAL VIABLE PRODUCT)

Provides all a developers needs to write a DApp with Ethereum, IPFS, and more.

### Current MVP API:

``` typescript
import {web3, send, receipt, WebsocketProvider, Transaction} from 'web3.ts';

// Call it in your root index.js or pass the config always to the related function
web3.init(
  'myApp',
  {
    ethereum: {
      provider: new WebsocketProvider('ws://localhost:7545'),
      transaction: {
        confirmations: 0
      }
    }
  }
);

async function mineWithTxObj() {
  const tx = await new Transaction({
    from: '0x6d6dC708643A2782bE27191E2ABCae7E1B0cA38B',
    to: '0x6FA59C2C8EAaCC1f8875794f2DAe145Bb32Bd9B1',
    value: 100
  }).send();

  return tx.receipt();
}

async function mine() {
  const txHash = await send({
    from: '0x6d6dC708643A2782bE27191E2ABCae7E1B0cA38B',
    to: '0x6FA59C2C8EAaCC1f8875794f2DAe145Bb32Bd9B1',
    value: 100
  }, {confirmations: 10});

  return receipt(txHash);
}


mine().then(console.log).catch(console.error);

```
