import { ImageResponse } from 'next/server';

export const size = { width: 1200, height: 600 };
export const alt = 'About Acme';
export const contentType = 'image/png';

export default function og() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 128,
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                EveryWorkout
            </div>
        ),
        {
            width: 1200,
            height: 600,
        },
    );
}