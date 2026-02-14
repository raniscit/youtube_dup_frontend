import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getSubscribedChannels, toggleSubscription } from "../api/subscription.api";

const SubscribeButton = ({ channelId, onSubscriptionChange }) => {
    const { isLoggedIn, token, loading: authLoading } = useAuth();
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [loading, setLoading] = useState(false);

    // Fetch subscription status on mount or when channelId/token changes
    useEffect(() => {
        if (authLoading) return;

        if (!isLoggedIn || !token || !channelId) {
            setIsSubscribed(false);
            return;
        }
        const fetchSubscriptionStatus = async () => {
            setLoading(true);
            try {
                const subscribedChannels = await getSubscribedChannels(token);
                const subscribed = subscribedChannels.some(
                    ch => String(ch.channel._id) === String(channelId)
                );

                setIsSubscribed(subscribed);
            } catch (error) {
                console.error("Failed to fetch subscription status:", error);
                setIsSubscribed(false);
            } finally {
                setLoading(false);
            }
        };

        fetchSubscriptionStatus();
    }, [channelId, isLoggedIn, token, authLoading]);



    // Handle toggle subscription button click
    const handleToggle = async () => {
        if (!isLoggedIn) {
            alert("Please login to subscribe");
            return;
        }
        if (!channelId) return;

        setLoading(true);
        try {
            const result = await toggleSubscription(channelId, token);
            if (result?.subscribed !== undefined) {
                setIsSubscribed(result.subscribed);
                onSubscriptionChange?.(result.subscribed);
            }

        } catch (error) {
            console.error("Failed to toggle subscription:", error);
            alert("Failed to update subscription. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleToggle}
            disabled={loading}
            className={`
    relative px-6 py-2 mt-5 rounded-full 
    font-semibold text-sm tracking-wide
    transition-all duration-200 ease-in-out
    transform hover:scale-105
    shadow-md
    ${isSubscribed
                    ? "bg-gray-800 text-white hover:bg-gray-700"
                    : "bg-red-600 text-white hover:bg-red-700"
                }
    disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100
  `}
        >
            {loading ? (
                <span className="flex items-center gap-2">
                    <svg
                        className="w-4 h-4 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                        />
                    </svg>
                    Loading
                </span>
            ) : isSubscribed ? (
                "Subscribed"
            ) : (
                "Subscribe"
            )}
        </button>

    );
};

export default SubscribeButton;
