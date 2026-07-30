import { getGear } from "../../_actions/getGear";
import { Equipment } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export async function GearCategory() {
    const res = await getGear();
    
    if (!res?.success || !res?.data) {
        return null;
    }

    // Extract unique categories from the gear list
    const categoriesMap = new Map();
    res.data.forEach((gear: Equipment) => {
        if (gear.category) {
            categoriesMap.set(gear.category.id, gear.category);
        }
    });
    
    const categories = Array.from(categoriesMap.values());

    return (
        <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-muted-foreground mr-2">Categories:</span>
            <Link href="/gear">
                <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors">
                    All
                </Badge>
            </Link>
            {categories.map((cat) => (
                <Link key={cat.id} href={`/gear?category=${cat.name}`}>
                    <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors">
                        {cat.name}
                    </Badge>
                </Link>
            ))}
        </div>
    )
}