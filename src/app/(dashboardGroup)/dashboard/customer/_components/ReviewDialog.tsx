"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StarIcon, Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { submitReviewAction } from "../../../_actions/submitReviewAction";

export function ReviewDialog({
    rentalOrderId,
    gearItemId,
}: {
    rentalOrderId: string;
    gearItemId: string;
}) {
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!comment.trim()) {
            toast.error("Please enter a comment for your review.");
            return;
        }

        setLoading(true);
        const result = await submitReviewAction({
            rentalOrderId,
            gearItemId,
            rating,
            comment,
        });
        setLoading(false);

        if (result.success) {
            toast.success(result.message);
            setOpen(false);
            setComment("");
            setRating(5);
        } else {
            toast.error(result.message);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {/* @ts-expect-error asChild type issue with Radix UI and React 19 */}
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1 bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700 h-8 text-xs px-3 rounded-lg">
                    <StarIcon size={12} className="fill-yellow-500 text-yellow-500" />
                    Leave Review
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Leave a Review</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Rating</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className="focus:outline-none focus:ring-2 focus:ring-[#92a417] rounded-md transition-all p-1 hover:scale-110 active:scale-95"
                                >
                                    <StarIcon
                                        size={32}
                                        className={`${
                                            rating >= star
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "fill-slate-100 text-slate-200"
                                        } transition-colors`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Comment</label>
                        <Textarea
                            placeholder="How was your experience with this gear? Highly recommend?"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={4}
                            className="resize-none focus-visible:ring-[#92a417]"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={loading} className="bg-[#92a417] hover:bg-[#829214] text-white">
                        {loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
                        Submit Review
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
