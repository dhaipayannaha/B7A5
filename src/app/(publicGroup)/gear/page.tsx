import { Suspense } from "react"
import { GearList } from "../_components/Gear/GearList"
import NewsSkeleton from "../_components/Gear/NewsSkeleton"
import { GearSearchBar } from "../_components/Gear/GearSearchBar"
import { GearCategory } from "../_components/Gear/gearCategory"


const PremiumPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

    return (
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Gear items for rent
                        </h1>
                        <p className="text-sm text-muted-foreground">Find the best gear items for rent</p>

                    </div>
                    <GearSearchBar />
                </div>
                <GearCategory />
            </div>

            <Suspense fallback={<NewsSkeleton />}>
                <GearList searchParams={searchParams} />
            </Suspense>
        </div>


    )
}

export default PremiumPage