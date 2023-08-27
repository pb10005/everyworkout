import { ImageResponse } from "next/server";
import { prisma } from "../../../src/server/db";

export const revalidate = "force-cache";
export const runtime = "nodejs";

export const alt = "画像";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: { id: string } }) {
  const data = await prisma.workout.findUnique({
    include: {
      exercise: {
        select: {
          name: true
        }
      }
    },
    where: { id: params.id }
  });
  return new ImageResponse(
    (
      <div
        style={{
          background: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <p className="text-cyan-600" style={{ fontSize: 64, fontWeight: 700 }}>{data?.exercise.name}</p>
        <div style={{ fontSize: 48, display: "flex", gap: ".5em" }}>
          <span>{data?.weight}kg</span>
          <span>{data?.reps}reps</span>
          <span>{data?.sets}sets</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
