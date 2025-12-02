'use client';

import { useEffect, useRef } from 'react';

const Page = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const randomFlakesCount = () => {
        const min = 150;
        const max = 500;
        return Math.floor(Math.random() * (max - min) + min);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        let flakes = Array.from({ length: randomFlakesCount() }).map(() => ({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 3 + 1,
            d: Math.random() + 1,
        }));

        const update = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = 'white';
            ctx.beginPath();

            flakes.forEach((f) => {
                ctx.moveTo(f.x, f.y);
                ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
            });

            ctx.fill();

            flakes.forEach((f) => {
                f.y += Math.pow(f.d, 2) + 1;
                f.x += Math.sin(f.y * 0.01) * 0.5;

                if (f.y > height) {
                    f.y = -10;
                    f.x = Math.random() * width;
                }
            });

            requestAnimationFrame(update);
        };

        update();

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;

            flakes = Array.from({ length: randomFlakesCount() }).map(() => ({
                x: Math.random() * width,
                y: Math.random() * height,
                r: Math.random() * 5 + 1,
                d: Math.random() + 1,
            }));
        };

        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none" />;
};

export default Page;
