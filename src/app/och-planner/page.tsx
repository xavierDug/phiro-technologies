import { Boundaries } from "./_components/boundaries";
import { DemoShowcase } from "./_components/demo-showcase";
import { Faq } from "./_components/faq";
import { HowItWorks } from "./_components/how-it-works";
import { OchFooter } from "./_components/och-footer";
import { OchHeader } from "./_components/och-header";
import { OchHero } from "./_components/och-hero";
import { StartSection } from "./_components/start-section";
import { Tiers } from "./_components/tiers";

export default function OchPlannerPage() {
    return (
        <>
            <OchHeader />
            <main>
                <OchHero />
                <DemoShowcase />
                <Tiers />
                <HowItWorks />
                <Boundaries />
                <Faq />
                <StartSection />
            </main>
            <OchFooter />
        </>
    );
}
