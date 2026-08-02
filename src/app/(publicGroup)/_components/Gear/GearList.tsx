import { getGear } from '../../_actions/getGear';
import { GearCard } from './GearCard';

export async function GearList({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const query = await searchParams;

    const result = await getGear({ query });

    if (!result.success || !result.data?.length) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-4xl mb-4">📦</p>
                <p className="text-lg font-semibold text-slate-600">No gear found</p>
                <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters.</p>
            </div>
        )
    }

    return (
        <div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {result.data.map((post: any) => (
                    <GearCard key={post.id}
                        post={post}
                    />
                ))}
            </div>
        </div>
    )
}