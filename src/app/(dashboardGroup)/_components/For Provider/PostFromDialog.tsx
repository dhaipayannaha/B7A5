/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { IPost } from "@/lib/types";
import {
    DollarSignIcon,
    HashIcon,
    ImageIcon,
    LayersIcon,
    Loader2Icon,
    PackageIcon,
    PencilIcon,
    PlusCircleIcon,
    SparklesIcon,
    TagIcon,
    WrenchIcon,
} from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { createPost, updatePost } from "../../_actions/myPostAction";

type PostFormDialogProps = {
    mode: "create" | "edit";
    post?: IPost;
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
                        ? "Post updated successfully"
                        : "Post created successfully")
            );
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setOpen(false);
        } else {
            toast.error(state.message || "Something went wrong");
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
                        <Button className="gap-2 bg-gradient-to-r from-primary to-primary/80 shadow-md hover:shadow-primary/30 hover:shadow-lg transition-all duration-300">
                            <PlusCircleIcon size={16} />
                            Create Post
                        </Button>
                    )
                }
            />

            <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden rounded-2xl border border-border/50 shadow-2xl">
                {/* ── Gradient Header ── */}
                <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent px-6 py-5 border-b border-border/50">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold flex items-center gap-2">
                            {isEdit ? (
                                <>
                                    <div className="p-1.5 rounded-lg bg-primary/10">
                                        <PencilIcon size={16} className="text-primary" />
                                    </div>
                                    Edit Post
                                </>
                            ) : (
                                <>
                                    <div className="p-1.5 rounded-lg bg-primary/10">
                                        <PlusCircleIcon size={16} className="text-primary" />
                                    </div>
                                    Create New Post
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
                                id="title"
                                name="title"
                                defaultValue={post?.title}
                                placeholder="e.g. Sony A7 III Camera"
                                required
                                className="transition-shadow focus:shadow-sm focus:shadow-primary/20"
                            />
                        </FormField>

                        <FormField label="Description / Content" icon={LayersIcon}>
                            <Textarea
                                id="content"
                                name="content"
                                defaultValue={post?.content}
                                required
                                placeholder="Describe your gear in detail — condition, accessories included, usage tips..."
                                className="min-h-24 resize-none transition-shadow focus:shadow-sm focus:shadow-primary/20"
                            />
                        </FormField>

                        {/* ── Gear Details ── */}
                        <SectionHeading>Gear Details</SectionHeading>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField label="Brand" icon={WrenchIcon}>
                                <Input
                                    id="brand"
                                    name="brand"
                                    defaultValue={post?.brand}
                                    placeholder="e.g. Sony, DJI, Canon"
                                    required
                                    className="transition-shadow focus:shadow-sm focus:shadow-primary/20"
                                />
                            </FormField>

                            <FormField label="Model" icon={PackageIcon}>
                                <Input
                                    id="model"
                                    name="model"
                                    defaultValue={post?.model}
                                    placeholder="e.g. A7 III"
                                    required
                                    className="transition-shadow focus:shadow-sm focus:shadow-primary/20"
                                />
                            </FormField>

                            <FormField label="Category" icon={HashIcon}>
                                <Input
                                    id="categoryName"
                                    name="categoryName"
                                    defaultValue={post?.categoryName}
                                    placeholder="e.g. Camera, Drone, Lens"
                                    required
                                    className="transition-shadow focus:shadow-sm focus:shadow-primary/20"
                                />
                            </FormField>

                            <FormField label="Condition">
                                <select
                                    id="condition"
                                    name="condition"
                                    defaultValue={post?.condition ?? ""}
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="" disabled>Select condition</option>
                                    <option value="NEW">🌟 New</option>
                                    <option value="LIKE_NEW">✨ Like New</option>
                                    <option value="GOOD">👍 Good</option>
                                    <option value="FAIR">🔧 Fair</option>
                                    <option value="POOR">⚠️ Poor</option>
                                </select>
                            </FormField>
                        </div>

                        {/* ── Pricing & Stock ── */}
                        <SectionHeading>Pricing &amp; Stock</SectionHeading>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField label="Daily Rate ($)" icon={DollarSignIcon}>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                                        $
                                    </span>
                                    <Input
                                        id="dailyRate"
                                        name="dailyRate"
                                        type="number"
                                        min={0}
                                        step={0.01}
                                        defaultValue={post?.dailyRate}
                                        placeholder="0.00"
                                        required
                                        className="pl-7 transition-shadow focus:shadow-sm focus:shadow-primary/20"
                                    />
                                </div>
                            </FormField>

                            <FormField label="Quantity Available" icon={PackageIcon}>
                                <Input
                                    id="quantity"
                                    name="quantity"
                                    type="number"
                                    min={1}
                                    defaultValue={post?.quantity}
                                    placeholder="e.g. 3"
                                    required
                                    className="transition-shadow focus:shadow-sm focus:shadow-primary/20"
                                />
                            </FormField>
                        </div>

                        {/* ── Visibility ── */}
                        <SectionHeading>Visibility &amp; Media</SectionHeading>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField label="Status">
                                <select
                                    id="status"
                                    name="status"
                                    defaultValue={post?.status ?? "DRAFT"}
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="DRAFT">📝 Draft</option>
                                    <option value="PUBLISHED">🟢 Published</option>
                                    <option value="ARCHIVED">📦 Archived</option>
                                </select>
                            </FormField>

                            <FormField label="Tags (comma separated)" icon={HashIcon}>
                                <Input
                                    id="tags"
                                    name="tags"
                                    defaultValue={post?.tags?.join(", ")}
                                    placeholder="camera, sony, video"
                                    className="transition-shadow focus:shadow-sm focus:shadow-primary/20"
                                />
                            </FormField>
                        </div>

                        <FormField label="Thumbnail URL" icon={ImageIcon}>
                            <Input
                                id="thumbnail"
                                name="thumbnail"
                                type="url"
                                defaultValue={post?.thumbnail ?? ""}
                                placeholder="https://example.com/image.jpg"
                                className="transition-shadow focus:shadow-sm focus:shadow-primary/20"
                            />
                        </FormField>

                        {/* ── Premium toggle ── */}
                        <label className="flex items-center gap-3 cursor-pointer rounded-xl border border-border/60 bg-gradient-to-r from-amber-500/5 to-transparent px-4 py-3 hover:border-amber-500/40 hover:bg-amber-500/5 transition-all duration-200 group">
                            <Checkbox
                                id="isPremium"
                                name="isPremium"
                                defaultChecked={post?.isPremium}
                                className="data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                            />
                            <div>
                                <div className="flex items-center gap-1.5 text-sm font-semibold group-hover:text-amber-600 transition-colors">
                                    <SparklesIcon size={14} className="text-amber-500" />
                                    Mark as Premium Content
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    Premium listings get featured placement and higher visibility
                                </p>
                            </div>
                        </label>
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
                            className="gap-2 min-w-32 bg-gradient-to-r from-primary to-primary/80 shadow hover:shadow-primary/30 hover:shadow-md transition-all duration-300"
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
                                    Create Post
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}