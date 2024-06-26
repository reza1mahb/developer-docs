---
title: "Use Hardware Ledger"
---

# Use Hardware Ledger via the Aptos CLI

Using a hardware wallet like Ledger is the most secure way to sign transactions on `mainnet` as your private key never leaves your device.

:::caution
The `Ledger Nano S` has limited memory and may not be able to sign many transactions on Aptos. If you are trying to sign a transaction that is too big for your device to handle, you will get the error `Wrong raw transaction length`.
:::

## Initial Setup

You will need to do a few steps of configuration for the Aptos CLI and your Ledger device to sign transactions.

1. Ensure you have the Aptos CLI installed. You can install the Aptos CLI by following [these steps](../../install-cli/index.md) if you have not done so already.
2. Ensure you have done the basic setup for your Ledger device.
   1. You can find those steps on [Ledger’s website](https://www.ledger.com/). For example, here are the set up instructions for the [Ledger Nano X](https://support.ledger.com/hc/en-us/articles/360018784134-Set-up-your-Ledger-Nano-X?docs=true).
3. Plug your Ledger device into your computer.
4. Install the Aptos App on your Ledger device by following [this guide](https://support.ledger.com/hc/en-us/articles/7326502672285-Aptos-APT?docs=true).
5. Unlock your Ledger device and open the Aptos app.

   :::info
   Whenever you want to sign using your Ledger you will need to plug it in, unlock it, and open the Aptos app before running any CLI commands.
   :::

6. Create a new Ledger profile in the Aptos CLI and choose which key to use by running:

   ```bash
   aptos init --profile <your-profile> --ledger
   ```

   Then follow the terminal prompts like so:

   ```
   Configuring for profile <your-profile>
   Choose network from [devnet, testnet, mainnet, local, custom | defaults to devnet]

   No network given, using devnet...
   Please choose an index from the following 5 ledger accounts, or choose an arbitrary index that you want to use:
   [0] Derivation path: m/44'/637'/0'/0'/0' (Address: 59836ba1dd0c845713bdab34346688d6f1dba290dbf677929f2fc20593ba0cfb)
   [1] Derivation path: m/44'/637'/1'/0'/0' (Address: 21563230cf6d69ee72a51d21920430d844ee48235e708edbafbc69708075a86e)
   [2] Derivation path: m/44'/637'/2'/0'/0' (Address: 667446181b3b980ef29f5145a7a2cc34d433fc3ee8c97fc044fd978435f2cb8d)
   [3] Derivation path: m/44'/637'/3'/0'/0' (Address: 2dcf037a9f31d93e202c074229a1b69ea8ee4d2f2d63323476001c65b0ec4f31)
   [4] Derivation path: m/44'/637'/4'/0'/0' (Address: 23c579a9bdde1a59f1c9d36d8d379aeefe7a5997b5b58bd5a5b0c12a4f170431)

   0
   Account 59836ba1dd0c845713bdab34346688d6f1dba290dbf677929f2fc20593ba0cfb has been already found on-chain

   ---
   Aptos CLI is now set up for account 59836ba1dd0c845713bdab34346688d6f1dba290dbf677929f2fc20593ba0cfb as profile <your-profile>!  Run `aptos --help` for more information about commands
   {
     "Result": "Success"
   }
   ```

   In the example, they chose to use the first ledger account by entering `0` after the `aptos init` command. You may choose whichever account you want.

   **Common errors:**

   1. If you see the error `Device Not Found`, make sure to unlock your Ledger then try this step again.
   2. If you see the error `Aptos ledger app is not opened`, make sure to open the Aptos app on your Ledger, then try this step again.

7. Finally, you will need to enable blind signing on your Ledger device by following [these steps](https://medium.com/@DavidLehman24/how-to-enable-disable-blind-signing-on-ledger-wallet-99113a85cdad).
   1. Blind signing allows you to confirm a smart contract interaction you cannot verify through a human-readable language.
   2. This is needed to execute transactions without limitation as some payloads are too big to display.

## Signing Using Ledger

After doing the initial setup, you can sign transactions by following these steps:

1. Plug in your ledger.
2. Unlock it.
3. Open the Aptos app.
4. Run the Aptos CLI command which requires a signature.

:::tip
This process works for any command that requires a signature, whether that’s to transfer coins, publish a Move contract, interact with a contract, etc.
:::

For example, if you wanted to publish a Move package like the `[hello_blockchain](https://github.com/aptos-labs/aptos-core/tree/main/aptos-move/move-examples/hello_blockchain)` demo contract you could follow the above steps then run:

```bash
aptos move publish --profile <your-ledger-profile-name> --named-addresses hello_blockchain=<your-ledger-profile-name>
```

You should see a response like:

```bash
Compiling, may take a little while to download git dependencies...
INCLUDING DEPENDENCY AptosFramework
INCLUDING DEPENDENCY AptosStdlib
INCLUDING DEPENDENCY MoveStdlib
BUILDING Examples
package size 1755 bytes
Do you want to submit a transaction for a range of [139600 - 209400] Octas at a gas unit price of 100 Octas? [yes/no] >

yes

{
  "Result": {
    "transaction_hash": "0xd5a12594f85284cfd5518d547d084030b178ee926fa3d8cbf699cc0596eff538",
    "gas_used": 1396,
    "gas_unit_price": 100,
    "sender": "59836ba1dd0c845713bdab34346688d6f1dba290dbf677929f2fc20593ba0cfb",
    "sequence_number": 0,
    "success": true,
    "timestamp_us": 1689887104333038,
    "version": 126445,
    "vm_status": "Executed successfully"
  }
}

```

After you have approved publishing this package you will be prompted to sign the transaction on your Ledger device. Once signed, the package will be published to the network!

One error you might run into is `Error: Wrong raw transaction length`. This means that the transaction or package size was too big for your device to sign. Currently the Aptos Ledger app can only support transactions that are smaller than 20kb. The `Ledger Nano S` device has less memory than that, which is why it is more likely to produce this error.
