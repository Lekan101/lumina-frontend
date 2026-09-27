"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function BackendUnavailable({ onRetry }: { onRetry?: () => void }) {
  const router = useRouter();
  const [retrying, setRetrying] = useState(false);

  function retry() {
    setRetrying(true);
    if (onRetry) onRetry();
    else router.refresh();
    window.setTimeout(() => setRetrying(false), 800);
  }

  return (
    <div
      role="alert"
      className="p-8 rounded-xl border border-[var(--color-error-border)] bg-[var(--color-error-surface)] text-center"
    >
      <p className="text-[var(--color-error-surface-text)] font-semibold mb-2">
        Lumina data is temporarily unavailable
      </p>
      <p className="text-[var(--color-text-secondary)] text-sm max-w-lg mx-auto mb-4">
        We couldn&apos;t reach the indexer. Check your connection or try again in a
        moment; your request has not been lost.
      </p>
      <Button
        variant="secondary"
        size="sm"
        loading={retrying}
        loadingText="Retrying…"
        onClick={retry}
      >
        Retry
      </Button>
    </div>
  );
}
