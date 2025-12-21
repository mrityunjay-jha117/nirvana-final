import TypingEffect from "../components/primary_components/primary_components/unique_components/word_typing_animate";
interface HimeSkeletonProps {
  variant?: number; // optional prop, 0 by default
}

export default function HimeSkeleton({ variant = 0 }: HimeSkeletonProps) {
  const colorClass = variant === 1 ? "text-white" : "text-[#111a21]";

  return (
    <div className="flex items-center justify-center min-h-screen">
      
      <div className="flex items-center space-x-1">
        <TypingEffect
          color={colorClass}
          typingSpeed={400}
          wordsize="text-9xl"
          texts={["....."]}
        />
      </div>
    </div>
  );
}
