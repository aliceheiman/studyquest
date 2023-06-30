// CUSTOM COMPONENTS
import { MapAdventure } from "@/components";

function Page() {
    return (
        <main className="adventure">
            <MapAdventure
                accessToken={process.env.MAPBOX_ACCESS_TOKEN}
            />
        </main>
    )
}

export default Page;