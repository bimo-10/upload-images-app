import MainHomeSection from "@/components/layouts/MainHomeSection";
import NavbarSection from "@/components/layouts/NavbarSection";

export default function Home() {
  return (
    <main className="flex flex-col justify-between">
      <NavbarSection />
      <MainHomeSection />
    </main>
  );
}
