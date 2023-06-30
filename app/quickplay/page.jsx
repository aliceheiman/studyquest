// CUSTOM COMPONENTS
import { QuickPlay } from "@/components";

function Page() {
    return (
        <main className="">
            <QuickPlay
                accessToken={process.env.MAPBOX_ACCESS_TOKEN}
            />
        </main>
    )
}

export default Page;