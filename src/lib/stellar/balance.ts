import * as StellarSdk from "@stellar/stellar-sdk";

export const STROOPS_PER_UNIT = 10_000_000;

/**
 * Fetches token balance for an address from a Soroban token contract (SEP-0041).
 * Uses RPC getContractData with the standard Balance key format.
 *
 * @param rpcUrl - Stellar RPC endpoint
 * @param tokenContract - Token contract address (C...)
 * @param address - Address to query (G... or C...)
 * @returns Balance in human units (e.g. XLM), or 0 if no entry
 */
export async function getTokenBalance(
  rpcUrl: string,
  tokenContract: string,
  address: string
): Promise<number> {
  const rpc = new StellarSdk.rpc.Server(rpcUrl);
  const addressSc = StellarSdk.Address.fromString(address).toScAddress();

  const balanceKey = StellarSdk.xdr.ScVal.scvVec([
    StellarSdk.xdr.ScVal.scvSymbol("Balance"),
    StellarSdk.xdr.ScVal.scvAddress(addressSc),
  ]);

  try {
    const balanceData = await rpc.getContractData(tokenContract, balanceKey);
    const val = balanceData.val.contractData().val();

    if (val.switch().name !== "scvI128") {
      return 0;
    }

    const i128 = val.i128();
    const lo = BigInt(i128.lo().toString());
    const hi = BigInt(i128.hi().toString());
    const balanceStroops = (hi << BigInt(64)) | lo;

    return Number(balanceStroops) / STROOPS_PER_UNIT;
  } catch {
    return 0;
  }
}
