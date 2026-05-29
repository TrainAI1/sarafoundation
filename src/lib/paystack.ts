// Paystack inline payment helper. The Paystack v2 inline script is loaded in index.html.
// Public key is safe to ship to the browser.
export const PAYSTACK_PUBLIC_KEY = "pk_live_e0aba73a49d9ffd6a3d18f70392f5fff30d41d30";

declare global {
  interface Window {
    PaystackPop?: {
      new (): {
        newTransaction: (opts: PaystackTxnOptions) => void;
        resumeTransaction: (
          accessCode: string,
          handlers?: { onSuccess?: (txn: { reference: string; status: string }) => void; onCancel?: () => void; onError?: (e: unknown) => void; },
        ) => void;
      };
    };
  }
}

export type PaystackTxnOptions = {
  key: string;
  email: string;
  amount: number; // in lowest unit (kobo / cents)
  currency: string;
  reference?: string;
  metadata?: Record<string, unknown>;
  onSuccess?: (txn: { reference: string; status: string }) => void;
  onLoad?: (resp: unknown) => void;
  onCancel?: () => void;
  onError?: (err: unknown) => void;
};

export function payWithPaystack(opts: Omit<PaystackTxnOptions, "key">) {
  if (typeof window === "undefined" || !window.PaystackPop) {
    throw new Error("Paystack failed to load. Please refresh the page.");
  }
  const pop = new window.PaystackPop();
  pop.newTransaction({ key: PAYSTACK_PUBLIC_KEY, ...opts });
}

export function genRef(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export function resumePaystack(
  accessCode: string,
  handlers: { onSuccess?: (txn: { reference: string; status: string }) => void; onCancel?: () => void; onError?: (e: unknown) => void },
) {
  if (typeof window === "undefined" || !window.PaystackPop) {
    throw new Error("Paystack failed to load. Please refresh the page.");
  }
  const pop = new window.PaystackPop();
  pop.resumeTransaction(accessCode, handlers);
}