import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getSubscribedChannels, toggleSubscription } from "../api/subscription.api";

const SubscribeButton = ({ channelId }) => {
    const { isLoggedIn, token, loading: authLoading } = useAuth();
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [loading, setLoading] = useState(false);

    // Fetch subscription status on mount or when channelId/token changes
    useEffect(() => {
        if (authLoading) return;
        console.log("SubscribeButton useEffect fired", { isLoggedIn, token, channelId });

        if (!isLoggedIn || !token || !channelId) {
            setIsSubscribed(false);
            return;
        }
        const fetchSubscriptionStatus = async () => {
            setLoading(true);
            try {
                const subscribedChannels = await getSubscribedChannels(token);
                console.log("Subscribed Channels fetched:", subscribedChannels);
                const subscribed = subscribedChannels.some(ch => ch.channel._id === channelId);
                console.log("Is Subscribed:", subscribed);
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
            className={`px-4 py-2 rounded-full font-medium transition focus:outline-none ${isSubscribed
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-red-600 text-white hover:bg-red-700"
                } disabled:opacity-50`}
        >
            {loading ? "Processing..." : isSubscribed ? "Subscribed" : "Subscribe"}
        </button>
    );
};

export default SubscribeButton;
