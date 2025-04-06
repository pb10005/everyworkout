"use client";

import { useEffect, useState } from "react";

export const useNotification = () => {
    const [permission, setPermission] = useState<string>();

    const notify = (message: string) => {
        if (!("Notification" in window)) {
            // ブラウザーが通知に対応しているか調べる
            alert("このブラウザーはデスクトップ通知に対応していません。");
        } else if (Notification.permission === "granted") {
            // 通知権限が既に付与されているかどうかを調べる。
            // そうであれば、通知を作成
            const notification = new Notification(message);
            // …
        } else if (Notification.permission !== "denied") {
            // ユーザーにその権限を要求する必要がある
            Notification.requestPermission().then((permission) => {
                // ユーザーが許可したら、通知を作成
                if (permission === "granted") {
                    const notification = new Notification(message);
                }
            }).catch(() => {
                alert("エラーが発生しました");
            });
        } else {
            // ユーザーが拒否している場合、何もしない
        }
    }

    const requestPermission = async (forceRequest?: boolean) => {
        if (!("Notification" in window)) {
            alert("このブラウザーはデスクトップ通知に対応していません。");
        } else if (Notification.permission === "default") {
            await Notification.requestPermission();
        } else if (forceRequest) {
            await Notification.requestPermission();
        }
    };

    useEffect(() => {
        setPermission(Notification.permission);
        navigator.permissions
            .query({ name: "notifications" })
            .then((permissionStatus) => {
                permissionStatus.onchange = () => {
                    setPermission(Notification.permission);
                };
            })
            .catch(() => {
                alert("エラーが発生しました");
            });
    });

    return {
        permission,
        requestPermission,
        notify
    };
};
