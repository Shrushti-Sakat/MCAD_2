"use client";

import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

type PurchaseIntent = {
  label: string;
};

type AuthModalContextValue = {
  isOpen: boolean;
  pendingLabel: string | null;
  purchaseMessage: string | null;
  openAuthModal: (intent?: PurchaseIntent) => void;
  closeAuthModal: () => void;
  clearPurchaseMessage: () => void;
  completePendingPurchase: () => void;
  /**
   * Set a callback that will be invoked once the user completes auth.
   * Used by buy buttons to navigate to checkout after login/signup.
   */
  setOnAuthComplete: (cb: (() => void) | null) => void;
};

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function AuthModalProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const [purchaseIntent, setPurchaseIntent] = useState<PurchaseIntent | null>(null);
  const [purchaseMessage, setPurchaseMessage] = useState<string | null>(null);
  const onAuthCompleteRef = useRef<(() => void) | null>(null);

  function openAuthModal(intent?: PurchaseIntent) {
    if (intent) {
      setPurchaseIntent(intent);
      setPurchaseMessage(null);
    }

    setIsOpen(true);
  }

  function closeAuthModal() {
    setIsOpen(false);
  }

  function completePendingPurchase() {
    if (purchaseIntent) {
      setPurchaseMessage(`You're signed in. ${purchaseIntent.label} is ready for checkout.`);
      setPurchaseIntent(null);
    }

    setIsOpen(false);

    // Invoke the pending navigation callback if one was set
    if (onAuthCompleteRef.current) {
      const cb = onAuthCompleteRef.current;
      onAuthCompleteRef.current = null;
      // Give the modal a moment to close before navigating
      setTimeout(cb, 150);
    }
  }

  const setOnAuthComplete = useCallback((cb: (() => void) | null) => {
    onAuthCompleteRef.current = cb;
  }, []);

  return (
    <AuthModalContext.Provider
      value={{
        isOpen,
        pendingLabel: purchaseIntent?.label ?? null,
        purchaseMessage,
        openAuthModal,
        closeAuthModal,
        clearPurchaseMessage: () => setPurchaseMessage(null),
        completePendingPurchase,
        setOnAuthComplete,
      }}
    >
      {children}
      {purchaseMessage ? (
        <div className="pointer-events-none fixed bottom-5 right-5 z-50 max-w-sm rounded-[1.75rem] border border-brand/20 bg-white/95 p-4 shadow-soft">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
              M
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground">Purchase flow ready</p>
              <p className="mt-1 text-sm leading-6 text-muted">{purchaseMessage}</p>
            </div>
            <button
              className="pointer-events-auto rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted transition hover:text-foreground"
              onClick={() => setPurchaseMessage(null)}
              type="button"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);

  if (!context) {
    throw new Error("useAuthModal must be used within AuthModalProvider");
  }

  return context;
}
