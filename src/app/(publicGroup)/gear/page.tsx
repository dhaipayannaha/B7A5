import { Suspense } from "react"
import { GearList } from "../_components/news/GearList"
import NewsSkeleton from "../_components/news/NewsSkeleton"


const PremiumPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

    return (
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Premium news
                    </h1>
                    <p className="text-sm text-muted-foreground">Unlock exclusive content</p>

                </div>
                {/* <NewsSearchBar /> */}
            </div>

            <Suspense fallback={<NewsSkeleton />}>
                <GearList searchParams={searchParams} />
            </Suspense>
        </div>


    )
}

export default PremiumPage