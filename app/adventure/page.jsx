// CUSTOM COMPONENTS
import { MapAdventure } from "@/components";

function Page() {
    return (
        <main className="adventure">
            <MapAdventure
                accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            />
        </main>
    )
}

export default Page;