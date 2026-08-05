import Image from "next/image";

/**
 * OCH Planner mark: the jug icon + wordmark. Header and footer both render
 * this one component, so the lockup only needs editing in one place.
 */
export function OchLogo({ className }: { className?: string }) {
    return (
        <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
            <Image
                src="/Logo-OCH-transparent-1-200x111.png"
                alt=""
                width={100}
                height={111}
                priority
                className="h-9 w-auto shrink-0"
            />
        </span>
    );
}
