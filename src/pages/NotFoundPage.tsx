import { EmptyState } from "@/components/ui/EmptyState";
import { ButtonLink } from "@/components/ui/Button";

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 lg:px-8">
      <EmptyState
        title="Page not found"
        description="The page you're looking for doesn't exist or has moved."
        action={<ButtonLink to="/">Back to Home</ButtonLink>}
      />
    </div>
  );
}
