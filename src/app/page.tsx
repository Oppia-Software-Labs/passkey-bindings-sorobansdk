"use client";

import { WalletConnection } from "@/components/WalletConnection";
import { TransferForm } from "@/components/TransferForm";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex w-full flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50">
              Passkey Smart Wallet
            </h1>
            <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Create or connect a passkey-secured smart wallet on Stellar.
              Sign with Face ID, Touch ID, or your device security.
            </p>
          </div>

          <WalletConnection />
          <TransferForm />
        </div>
      </main>
    </div>
  );
}
