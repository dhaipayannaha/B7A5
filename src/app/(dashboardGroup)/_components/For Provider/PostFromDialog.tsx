/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Equipment } from "@/lib/types";
import {
    DollarSignIcon,
    HashIcon,
    ImageIcon,
    LayersIcon,
    Loader2Icon,
    PackageIcon,
    PencilIcon,
    PlusCircleIcon,
    TagIcon,
    WrenchIcon,
} from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { createPost, updatePost } from "../../_actions/myPostAction";

type PostFormDialogProps = {
    mode: "create" | "edit";
    post?: Equipment;
};

function FormField({
    label,
    icon: Icon,
    children,
}: {
    label: string;
    icon?: React.ElementType;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-1.5">
            <Label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {Icon && <Icon size={12} />}
                {label}
            </Label>
            {children}
        </div>
    );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-2 pt-1">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
                {children}
            </span>
            <div className="flex-1 border-t border-primary/20" />
        </div>
    );
}

export function PostFormDialog({ mode, post }: PostFormDialogProps) {
    const [open, setOpen] = useState(false);

    const action =
        mode === "edit" && post
            ? updatePost.bind(null, post.id)
            : createPost;

    const [state, formAction, pending] = useActionState(action, null) as any;

    useEffect(() => {
        if (!state) return;
        if (state.success) {
            toast.success(
                state.message ||
                    (mode === "edit"
                        ? "Gear updated successfully"
                        : "Gear listed successfully!"),
                { position: "top-right" }
            );
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setOpen(false);
        } else {
            toast.error(state.message || "Something went wrong", { position: "top-right" });
        }
    }, [state, mode]);

    const isEdit = mode === "edit";

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={
                    isEdit ? (
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-1.5 border-primary/30 hover:border-primary hover:bg-primary/5 transition-all duration-200"
                        >
                            <PencilIcon size={13} />
                            Edit
                        </Button>
                    ) : (
                        <Button className="gap-2 bg-[#92a417] hover:bg-[#829214] text-white shadow-md shadow-[#92a417]/20 transition-all duration-300">
                            <PlusCircleIcon size={16} />
                            Add Gear
                        </Button>
                    )
                }
            />

            <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden rounded-2xl border border-border/50 shadow-2xl">
                {/* ── Gradient Header ── */}
                <div className="bg-gradient-to-r from-[#92a417]/10 via-[#92a417]/5 to-transparent px-6 py-5 border-b border-border/50">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold flex items-center gap-2">
                            {isEdit ? (
                                <>
                                    <div className="p-1.5 rounded-lg bg-[#92a417]/10">
                                        <PencilIcon size={16} className="text-[#92a417]" />
                                    </div>
                                    Edit Gear Listing
                                </>
                            ) : (
                                <>
                                    <div className="p-1.5 rounded-lg bg-[#92a417]/10">
                                        <PlusCircleIcon size={16} className="text-[#92a417]" />
                                    </div>
                                    List New Gear
                                </>
                            )}
                        </DialogTitle>
                        <p className="text-xs text-muted-foreground mt-0.5 pl-9">
                            {isEdit
                                ? "Update your gear listing details below"
                                : "Fill in the details to list your gear for rent"}
                        </p>
                    </DialogHeader>
                </div>

                {/* ── Scrollable Form Body ── */}
                <form action={formAction}>
                    <div className="overflow-y-auto max-h-[65vh] px-6 py-5 space-y-5">
                        
                        {/* ── Basic Info ── */}
                        <SectionHeading>Basic Information</SectionHeading>

                        <FormField label="Title" icon={TagIcon}>
                            <Input
                                name="title"
                                defaultValue={post?.title}
                                placeholder="e.g. Sony A7 III Camera"
                                required
                            />
                        </FormField>

                        <FormField label="Description" icon={LayersIcon}>
                            <Textarea
                                name="description"
                                defaultValue={post?.description}
                                required
                                placeholder="Describe your gear in detail — condition, accessories included, usage tips..."
                                className="min-h-24 resize-none"
                            />
                        </FormField>

                        {/* ── Gear Details ── */}
                        <SectionHeading>Gear Details</SectionHeading>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField label="Brand" icon={WrenchIcon}>
                                <Input
                                    name="brand"
                                    defaultValue={post?.brand}
                                    placeholder="e.g. Sony, DJI, Canon"
                                    required
                                />
                            </FormField>

                            <FormField label="Model" icon={PackageIcon}>
                                <Input
                                    name="model"
                                    defaultValue={post?.model}
                                    placeholder="e.g. A7 III"
                                    required
                                />
                            </FormField>

                            <FormField label="Category" icon={HashIcon}>
                                <select
                                    name="categoryName"
                                    defaultValue={post?.category?.name ?? ""}
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
                                    required
                                >
                                    <option value="" disabled>Select a category</option>
                                    <option value="Cycling">🚴 Cycling</option>
                                    <option value="Camping">⛺ Camping</option>
                                    <option value="Fitness">💪 Fitness</option>
                                    <option value="Water Sports">🏄 Water Sports</option>
                                    <option value="Hiking">🥾 Hiking</option>
                                    <option value="Winter Sports">⛷️ Winter Sports</option>
                                    <option value="Team Sports">⚽ Team Sports</option>
                                    <option value="Photography & Film">📷 Photography &amp; Film</option>
                                </select>
                            </FormField>

                            <FormField label="Condition">
                                <select
                                    name="condition"
                                    defaultValue={post?.condition ?? ""}
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
                                    required
                                >
                                    <option value="" disabled>Select condition</option>
                                    <option value="NEW">🌟 New</option>
                                    <option value="EXCELLENT">✨ Excellent</option>
                                    <option value="GOOD">👍 Good</option>
                                    <option value="FAIR">🔧 Fair</option>
                                </select>
                            </FormField>
                        </div>

                        {/* ── Pricing & Stock ── */}
                        <SectionHeading>Pricing &amp; Stock</SectionHeading>

                        <div className="grid grid-cols-3 gap-4">
                            <FormField label="Daily Rate (৳)" icon={DollarSignIcon}>
                                <Input
                                    name="dailyRate"
                                    type="number"
                                    min={0}
                                    step={0.01}
                                    defaultValue={post?.dailyRate}
                                    placeholder="0.00"
                                    required
                                />
                            </FormField>

                            <FormField label="Total Quantity" icon={PackageIcon}>
                                <Input
                                    name="quantity"
                                    type="number"
                                    min={1}
                                    defaultValue={post?.quantity}
                                    placeholder="e.g. 10"
                                    required
                                />
                            </FormField>

                            <FormField label="Available Qty" icon={PackageIcon}>
                                <Input
                                    name="availableQuantity"
                                    type="number"
                                    min={0}
                                    defaultValue={post?.availableQuantity}
                                    placeholder="e.g. 10"
                                    required
                                />
                            </FormField>
                        </div>

                        {/* ── Visibility & Images ── */}
                        <SectionHeading>Visibility &amp; Images</SectionHeading>

                        <FormField label="Status">
                            <select
                                name="status"
                                defaultValue={post?.status ?? "AVAILABLE"}
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
                            >
                                <option value="AVAILABLE">🟢 Available</option>
                                <option value="UNAVAILABLE">🔴 Unavailable</option>
                                <option value="MAINTENANCE">🔧 Maintenance</option>
                            </select>
                        </FormField>

                        <FormField label="Image URLs (one per line)" icon={ImageIcon}>
                            <Textarea
                                name="images"
                                defaultValue={post?.images?.join("\n")}
                                placeholder={"https://example.com/image1.jpg\nhttps://example.com/image2.jpg"}
                                className="min-h-20 resize-none font-mono text-xs"
                            />
                        </FormField>
                    </div>

                    {/* ── Footer ── */}
                    <DialogFooter className="px-6 py-4 border-t border-border/50 bg-muted/30">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="hover:bg-destructive/5 hover:border-destructive/30 hover:text-destructive transition-all duration-200"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={pending}
                            className="gap-2 min-w-32 bg-[#92a417] hover:bg-[#829214] text-white shadow hover:shadow-md transition-all duration-300"
                        >
                            {pending ? (
                                <>
                                    <Loader2Icon size={14} className="animate-spin" />
                                    Saving…
                                </>
                            ) : isEdit ? (
                                <>
                                    <PencilIcon size={14} />
                                    Save Changes
                                </>
                            ) : (
                                <>
                                    <PlusCircleIcon size={14} />
                                    List Gear
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}