import { Metadata } from "next";
import { ImageResponse } from "next/server";
import { prisma } from "../../../src/server/db";

export const title = 'EVERYWORKOUT';
export const description = 'ワークアウトの成長を記録する';
export const revalidate = "force-cache";
export const runtime = "nodejs";

export const alt = "画像";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export const metadata: Metadata = {
  metadataBase: new URL('https://everyworkout.vercel.app/'),
  title: 'EVERYWORKOUT',
  description: 'ワークアウトの成長を記録する',
  twitter: {
    card: "summary_large_image",
    title: "EVERYWORKOUT",
    description: "ワークアウト記録",
  },
};

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
          padding: "5px",
          gap: "1em"
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <img src={`${metadata.metadataBase?.hostname ? 'https://' + metadata.metadataBase?.hostname : 'http://localhost:3000'}/logo_h.png`} alt="logo" width={500} height={150} />
        </div>
        <p style={{ fontSize: 96, fontWeight: 900 }}>{data?.exercise.name}</p>
        <div style={{ display: "flex", gap: "4em" }}>
          <div style={
            {
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }
          }>
            <span style={{ fontSize: 48 }}>{data?.weight}</span>
            <span style={{ fontSize: 32 }}>kg</span>
          </div>
          <div style={
            {
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }
          }>
            <span style={{ fontSize: 48 }}>{data?.reps}</span>
            <span style={{ fontSize: 32 }}>reps</span>
          </div>
          <div style={
            {
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }
          }>
            <span style={{ fontSize: 48 }}>{data?.sets}</span>
            <span style={{ fontSize: 32 }}>sets</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
