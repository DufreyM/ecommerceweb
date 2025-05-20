"use client";
import { useRouter } from "next/navigation";

export default function SimilarCards({ similarCards }) {
  const router = useRouter();

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">Cartas similares</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {similarCards.map((simCard) => (
          <div
            key={simCard.id}
            onClick={() => router.push(`/card/${simCard.id}`)}
            className="cursor-pointer bg-white rounded-xl shadow hover:scale-105 transition p-2"
          >
            <img
              src={simCard.images.small}
              alt={simCard.name}
              className="w-full h-48 object-contain"
            />
            <div className="text-center font-medium mt-2">{simCard.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
